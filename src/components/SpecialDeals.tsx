
import React from 'react';
import { Button } from '../components/ui/button';
import { CircleDollarSign } from 'lucide-react';

interface Deal {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  days?: string;
}

const deals: Deal[] = [
  {
    title: "Two-for-Tuesday",
    description: "Two medium one-topping pizzas for one great price!",
    price: 25.00,
    originalPrice: 30.00,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    days: "Tuesday Only"
  },
  {
    title: "Family Special",
    description: "One large two-topping pizza, garlic knots, and a 2-liter soda",
    price: 28.99,
    originalPrice: 33.50,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Lunch Special",
    description: "Personal pizza with one topping and a can of soda",
    price: 8.99,
    originalPrice: 12.00,
    image: "https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    days: "Mon-Fri, 11am-3pm"
  }
];

const SpecialDeals = () => {
  return (
    <section id="deals" className="py-16 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
        zIndex: -1 
      }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title">Special Deals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <div key={index} className="pizza-card overflow-hidden">
              <div className="h-44 relative overflow-hidden rounded-t-lg">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {deal.days && (
                  <div className="absolute top-0 right-0 bg-pizza-red text-white py-1 px-3 text-sm font-bold">
                    {deal.days}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-pizza-gold mb-2">{deal.title}</h3>
                <p className="text-gray-300 mb-4">{deal.description}</p>
                
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</div>
                    <div className="text-2xl font-bold text-white">${deal.price.toFixed(2)}</div>
                  </div>
                  <div className="bg-green-800 bg-opacity-30 text-green-500 py-1 px-2 rounded flex items-center">
                    <CircleDollarSign size={16} className="mr-1" />
                    <span className="text-sm font-bold">Save ${(deal.originalPrice - deal.price).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full pizza-button">
                  Order This Deal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;
