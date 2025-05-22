
import React from 'react';
import { Button } from '../components/ui/button';

const Hero = () => {
  return (
    <div className="relative py-12 flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          zIndex: -2 
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70" style={{ zIndex: -1 }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight">
            <span className="text-pizza-gold">Authentic</span> Italian Pizzas 
            <br />Fresh and <span className="text-pizza-red">Delicious</span>
          </h1>
          
          <p className="text-lg text-gray-200 mb-6">
            Made with love, served with pride.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
