import React, { useState, useEffect, FC, useRef } from 'react'; // Added useRef
import Vapi from '@vapi-ai/web';
import './VoiceWidget.css'; 
import { FiHeadphones as OriginalFiHeadphones, FiX as OriginalFiX, FiMic as OriginalFiMic, FiPhoneOff as OriginalFiPhoneOff } from 'react-icons/fi';

// Define a simple type for the Vapi instance
type VapiInstance = any;

// Wrapper components for icons
interface IconProps { size: number; } 

const FiHeadphones: FC<IconProps> = ({ size }) => { const Icon = OriginalFiHeadphones as any; return <Icon size={size} />; };
const FiX: FC<IconProps> = ({ size }) => { const Icon = OriginalFiX as any; return <Icon size={size} />; };
const FiMic: FC<IconProps> = ({ size }) => { const Icon = OriginalFiMic as any; return <Icon size={size} />; };
const FiPhoneOff: FC<IconProps> = ({ size }) => { const Icon = OriginalFiPhoneOff as any; return <Icon size={size} />; };

const VoiceWidget: FC = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [vapi, setVapi] = useState<VapiInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<string>('Idle');

  interface DisplayOrderDetails {
    description: string;
    total: number | string;
  }
  const [displayOrder, setDisplayOrder] = useState<DisplayOrderDetails | null>(null);

  interface ChatMessage {
    id: string;
    speaker: 'User' | 'Assistant' | 'System';
    text: string;
  }
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const widgetContentRef = useRef<HTMLDivElement>(null); // Renamed ref for clarity

  useEffect(() => {
    if (!import.meta.env.VITE_VAPI_PUBLIC_KEY) {
      setError('Missing Vapi Public Key. Please set VITE_VAPI_PUBLIC_KEY in your .env file for the vapi-pizza project.');
      setCallStatus('Error: Missing API Key');
    }
  }, []);

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
    if (isCallActive && isWidgetOpen) { 
      endCall();
    }
    setError(null); 
  };

  // Auto-scroll chat log
  useEffect(() => {
    if (widgetContentRef.current) {
      widgetContentRef.current.scrollTop = widgetContentRef.current.scrollHeight;
    }
  }, [chatLog]);

  const startCall = async () => {
    setError(null);
    setCallStatus('Connecting...');
    setChatLog([]); 

    try {
      if (!import.meta.env.VITE_VAPI_PUBLIC_KEY) {
        throw new Error('Missing Vapi Public Key');
      }

      const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY as string) as VapiInstance;

      vapiInstance.on('call-start', () => {
        setIsCallActive(true);
        setCallStatus('Call Active - Listening...');
        setError(null);
      });

      vapiInstance.on('call-end', () => {
        setIsCallActive(false);
        setVapi(null);
        setCallStatus('Call Ended');
        setDisplayOrder(null); // Clear order details when call ends
        setChatLog([]); // Clear chat log on call-end
      });
      
      vapiInstance.on('speech-start', () => {
        setCallStatus('Assistant Speaking...');
      });
      vapiInstance.on('speech-end', () => {
        setCallStatus('Listening...');
      });
      vapiInstance.on('message', (message: any) => {
        if (message.type === 'transcript' && message.transcriptType === 'final' && message.role === 'user') {
          setChatLog(prevLog => [...prevLog, { id: Date.now() + '-user', speaker: 'User', text: message.transcript }]);
        }
        // This is a simplified version. You might need to parse assistant messages differently.
        if (message.type === 'transcript' && message.transcriptType === 'final' && message.role === 'assistant') {
           setChatLog(prevLog => [...prevLog, { id: Date.now() + '-assistant', speaker: 'Assistant', text: message.transcript }]);
        }

        if (message.type === 'function-call' && message.functionCall?.name === 'display_order') {
          const params = message.functionCall.parameters;
          if (params && typeof params.description === 'string' && params.total !== undefined) {
            setDisplayOrder({
              description: params.description,
              total: params.total
            });
            setCallStatus("Order Details Received"); 
          }
        }
      });

      vapiInstance.on('error', (err: Error) => {
        console.error('Vapi error:', err);
        setError(err.message);
        setCallStatus(`Error: ${err.message.substring(0, 30)}...`);
        setIsCallActive(false);
        setVapi(null);
      });

      if (import.meta.env.VITE_VAPI_ASSISTANT_ID) {
        await vapiInstance.start(import.meta.env.VITE_VAPI_ASSISTANT_ID as string);
      } else {
        // Default assistant configuration if no ID is provided
        await vapiInstance.start({
            transcriber: { provider: 'deepgram', model: 'nova-2', language: 'en-US' } as any,
            model: {
                provider: "openai",
                model: "gpt-3.5-turbo",
                messages: [{"role": "system", "content": "You are a helpful pizza ordering assistant for MaMaMia Pizza."}]
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer"
            },
            firstMessage: "Hi, I'm the MaMaMia Pizza voice assistant! How can I help you with your order today?"
        });
      }
      setVapi(vapiInstance);
    } catch (err) { 
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error starting call:', err);
      setError(errorMessage);
      setCallStatus(`Failed: ${errorMessage.substring(0,30)}...`);
      setIsCallActive(false);
      setVapi(null);
    }
  };

  const endCall = async () => {
    setCallStatus('Ending Call...');
    if (vapi) {
      try {
        await vapi.stop();
      } catch (err) { 
        console.error('Error ending call:', err);
        setError(err instanceof Error ? err.message : 'Error stopping call');
        setIsCallActive(false);
        setVapi(null);
        setCallStatus('Idle');
        setDisplayOrder(null);
        setChatLog([]); // Also clear chat log here for robustness
      }
    } else { 
      setIsCallActive(false);
      setCallStatus('Idle');
      setDisplayOrder(null);
      setChatLog([]); // And here
    }
  };

  return (
    <div> {/* Changed from App to a generic div, or could use React.Fragment */}
      {!isWidgetOpen ? (
        <button onClick={toggleWidget} className="fab-launcher">
          <FiHeadphones size={24} />
        </button>
      ) : (
        <div className="chat-widget-container">
          <div className="widget-header">
            <span>Voice Assistant</span>
            <button onClick={toggleWidget} className="widget-close-button">
              <FiX size={20} />
            </button>
          </div>
          <div className="widget-content" ref={widgetContentRef}> {/* Moved ref here */}
            <div className="chat-log-area"> {/* Removed ref from here */}
              {chatLog.map((msg) => (
                <div key={msg.id} className={`chat-message ${msg.speaker.toLowerCase()}`}>
                  <span className="message-speaker">{msg.speaker}: </span>
                  <span className="message-text">{msg.text}</span>
                </div>
              ))}
            </div>
            {error && !displayOrder && (
              <p className="error-message widget-error">
                {error}
              </p>
            )}
            {displayOrder && (
              <div className="order-details">
                <h4>Your Order:</h4>
                <p className="order-description">{displayOrder.description}</p>
                <p className="order-total">
                  Total: ${typeof displayOrder.total === 'number' ? displayOrder.total.toFixed(2) : displayOrder.total}
                </p>
              </div>
            )}
          </div>
          <div className="widget-footer">
            {!isCallActive ? (
              <button 
                onClick={startCall}
                disabled={!!error && error.includes('Missing Vapi Public Key')}
                className="widget-button start-call-button"
              >
                <FiMic size={18} /> Start Call
              </button>
            ) : (
              <button onClick={endCall} className="widget-button end-call-button active"> 
                <FiPhoneOff size={18} /> End Call
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceWidget;
