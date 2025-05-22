import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-90 border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-pizza-gold mb-4">MaMaMia Pizza</h3>
          <p className="text-gray-400">Handcrafted pizzas made with the finest ingredients.</p>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 MaMaMia Pizza. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-pizza-gold text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-pizza-gold text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
