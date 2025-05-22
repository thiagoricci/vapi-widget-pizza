
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { CheckIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';

interface PizzaBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

type CrustType = 'thick' | 'thin';
type SizeType = 'small' | 'medium' | 'large';
type SauceType = 'tomato' | 'garlic' | 'bbq' | 'buffalo';
type CheeseType = 'mozzarella' | 'four-cheese' | 'light' | 'extra';

interface CustomPizza {
  crust: CrustType;
  size: SizeType;
  sauce: SauceType;
  cheese: CheeseType;
  toppings: string[];
  extraToppings: string[];
}

const PRICE_MAP = {
  size: {
    small: 10.00,
    medium: 15.00,
    large: 20.00,
  },
  extraToppings: 1.50,
};

const TOPPINGS = [
  'Pepperoni', 'Sausage', 'Ham', 'Bacon', 'Chicken', 
  'Mushrooms', 'Onions', 'Bell Peppers', 'Olives', 
  'Pineapple', 'Jalapeños', 'Spinach'
];

const PizzaBuilder: React.FC<PizzaBuilderProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [pizza, setPizza] = useState<CustomPizza>({
    crust: 'thick',
    size: 'medium',
    sauce: 'tomato',
    cheese: 'mozzarella',
    toppings: [],
    extraToppings: [],
  });
  
  const totalToppings = pizza.toppings.length;
  const maxIncludedToppings = 4;
  const extraToppingsCount = Math.max(0, totalToppings - maxIncludedToppings);
  
  const calculatePrice = () => {
    let price = PRICE_MAP.size[pizza.size];
    price += pizza.extraToppings.length * PRICE_MAP.extraToppings;
    return price.toFixed(2);
  };
  
  const handleNext = () => {
    // Validate specific steps
    if (step === 5 && pizza.toppings.length === 0) {
      toast({
        title: "No toppings selected",
        description: "Please select at least one topping",
        variant: "destructive",
      });
      return;
    }
    
    setStep(prev => Math.min(prev + 1, 6));
  };
  
  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleAddTopping = (topping: string) => {
    if (pizza.toppings.includes(topping)) {
      setPizza(prev => ({
        ...prev,
        toppings: prev.toppings.filter(t => t !== topping),
      }));
    } else {
      setPizza(prev => ({
        ...prev,
        toppings: [...prev.toppings, topping],
      }));
    }
  };
  
  const handleAddExtraTopping = (topping: string) => {
    if (pizza.extraToppings.includes(topping)) {
      setPizza(prev => ({
        ...prev,
        extraToppings: prev.extraToppings.filter(t => t !== topping),
      }));
    } else {
      setPizza(prev => ({
        ...prev,
        extraToppings: [...prev.extraToppings, topping],
      }));
    }
  };
  
  const handleComplete = () => {
    toast({
      title: "Pizza Added",
      description: `Your custom pizza has been added to your order! Total: $${calculatePrice()}`,
    });
    onClose();
  };
  
  // List of unused toppings for extra toppings step
  const unusedToppings = TOPPINGS.filter(t => !pizza.toppings.includes(t));
  
  // Calculate if a topping would be extra based on current selections
  const isExtraTopping = (topping: string) => {
    const currentIndex = pizza.toppings.indexOf(topping);
    if (currentIndex === -1) return false;
    return currentIndex >= maxIncludedToppings;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Build Your Own Pizza</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Step 1: Crust Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Crust</h3>
              <p className="text-sm text-muted-foreground mb-4">Would you like thick or thin crust?</p>
              
              <RadioGroup 
                value={pizza.crust} 
                onValueChange={(value) => setPizza({...pizza, crust: value as CrustType})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thick" id="thick" />
                  <Label htmlFor="thick">Thick Crust</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thin" id="thin" />
                  <Label htmlFor="thin">Thin Crust</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          {/* Step 2: Size Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Size</h3>
              <p className="text-sm text-muted-foreground mb-4">Small, Medium or Large?</p>
              
              <RadioGroup 
                value={pizza.size} 
                onValueChange={(value) => setPizza({...pizza, size: value as SizeType})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small (10") - $10.00</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (12") - $15.00</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large (16") - $20.00</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          {/* Step 3: Sauce Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Sauce</h3>
              <p className="text-sm text-muted-foreground mb-4">Choose from traditional tomato, white garlic, BBQ, or buffalo sauce.</p>
              
              <RadioGroup 
                value={pizza.sauce} 
                onValueChange={(value) => setPizza({...pizza, sauce: value as SauceType})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tomato" id="tomato" />
                  <Label htmlFor="tomato">Traditional Tomato</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="garlic" id="garlic" />
                  <Label htmlFor="garlic">White Garlic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bbq" id="bbq" />
                  <Label htmlFor="bbq">BBQ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buffalo" id="buffalo" />
                  <Label htmlFor="buffalo">Buffalo</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          {/* Step 4: Cheese Selection */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Cheese</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Would you like mozzarella, our four-cheese blend, light cheese, or extra cheese?
              </p>
              
              <RadioGroup 
                value={pizza.cheese} 
                onValueChange={(value) => setPizza({...pizza, cheese: value as CheeseType})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mozzarella" id="mozzarella" />
                  <Label htmlFor="mozzarella">Mozzarella</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="four-cheese" id="four-cheese" />
                  <Label htmlFor="four-cheese">Four-Cheese Blend</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light Cheese</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extra" id="extra" />
                  <Label htmlFor="extra">Extra Cheese</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          {/* Step 5: Toppings Selection */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Toppings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can choose up to 4 included toppings. Additional toppings are $1.50 each.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {TOPPINGS.map((topping) => (
                  <div key={topping} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`topping-${topping}`} 
                      checked={pizza.toppings.includes(topping)}
                      onCheckedChange={() => handleAddTopping(topping)}
                    />
                    <Label htmlFor={`topping-${topping}`} className="flex items-center">
                      {topping}
                      {isExtraTopping(topping) && 
                        <span className="ml-1 text-xs text-red-500">+$1.50</span>
                      }
                    </Label>
                  </div>
                ))}
              </div>
              
              {totalToppings > maxIncludedToppings && (
                <p className="text-sm text-red-500 mt-2">
                  You've selected {extraToppingsCount} extra topping(s) at $1.50 each.
                </p>
              )}
            </div>
          )}
          
          {/* Step 6: Review and Complete */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Review Your Pizza</h3>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Crust:</span> {pizza.crust === 'thick' ? 'Thick' : 'Thin'} Crust</p>
                <p><span className="font-medium">Size:</span> {pizza.size.charAt(0).toUpperCase() + pizza.size.slice(1)}</p>
                <p><span className="font-medium">Sauce:</span> {
                  pizza.sauce === 'tomato' ? 'Traditional Tomato' :
                  pizza.sauce === 'garlic' ? 'White Garlic' :
                  pizza.sauce === 'bbq' ? 'BBQ' : 'Buffalo'
                }</p>
                <p><span className="font-medium">Cheese:</span> {
                  pizza.cheese === 'mozzarella' ? 'Mozzarella' :
                  pizza.cheese === 'four-cheese' ? 'Four-Cheese Blend' :
                  pizza.cheese === 'light' ? 'Light Cheese' : 'Extra Cheese'
                }</p>
                <p><span className="font-medium">Toppings:</span> {
                  pizza.toppings.length > 0 
                    ? pizza.toppings.join(', ') 
                    : 'No toppings selected'
                }</p>
                <p className="text-lg font-bold mt-4">
                  Total Price: ${calculatePrice()}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <div className="flex w-full justify-between">
            {step > 1 ? (
              <Button onClick={handlePrevious} variant="outline">
                <ChevronLeftIcon className="h-4 w-4 mr-2" />
                Previous
              </Button>
            ) : (
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
            )}
            
            {step < 6 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRightIcon className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Add to Order
                <CheckIcon className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PizzaBuilder;
