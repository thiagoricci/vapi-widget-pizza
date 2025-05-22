import React from 'react';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// Removed Button import as it's no longer used for PizzaBuilder
// import { Button } from '../components/ui/button'; 
// Removed PizzaBuilder import
// import PizzaBuilder from './PizzaBuilder';

interface PizzaSize {
  name: string;
  size: string;
  price: number;
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image?: string;
  allergens?: string[];
  quantity?: string;
}

interface ToppingCategory {
  name: string;
  items: string[];
}

const pizzaSizes: PizzaSize[] = [
  { name: 'Small', size: '10"', price: 10.00 },
  { name: 'Medium', size: '12"', price: 15.00 },
  { name: 'Large', size: '16"', price: 20.00 }
];

const toppingCategories: ToppingCategory[] = [
  {
    name: 'Meats',
    items: ['Pepperoni', 'Sausage', 'Ham', 'Bacon', 'Chicken', 'Ground Beef', 'Anchovies']
  },
  {
    name: 'Veggies',
    items: ['Mushrooms', 'Onions', 'Green Peppers', 'Black Olives', 'Tomatoes', 'Spinach', 'Jalapeños', 'Pineapple', 'Artichoke Hearts']
  },
  {
    name: 'Cheeses', // This category is for available toppings, distinct from the "Cheese" choice for the base pizza
    items: ['Extra Cheese', 'Feta', 'Cheddar', 'Provolone', 'Mozzarella']
  }
];

const specialtyPizzas: MenuItem[] = [
  {
    name: 'Margherita',
    description: 'Fresh mozzarella, tomato sauce, and fresh basil.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  },
  {
    name: 'Pepperoni',
    description: 'Classic pepperoni with mozzarella on tomato sauce.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  },
  {
    name: 'Supreme',
    description: 'Pepperoni, sausage, mushrooms, bell peppers, onions, and olives.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  },
  {
    name: 'Vegetarian',
    description: 'Mushrooms, onions, bell peppers, spinach, olives, and tomatoes.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  },
  {
    name: 'Hawaiian',
    description: 'Ham and pineapple over tomato sauce with mozzarella.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  },
  {
    name: 'Meat Lovers',
    description: 'Pepperoni, sausage, ham, and bacon.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  },
  {
    name: 'BBQ Chicken',
    description: 'Grilled chicken, BBQ sauce, red onions, and mozzarella.',
    price: 0, 
    image: '/lovable-uploads/7268f413-dd42-4280-a886-97fdeeb2ae74.png'
  }
];

const sides: MenuItem[] = [
  {
    name: 'Garlic Knots',
    description: 'Fresh baked and brushed with garlic butter and herbs.',
    price: 5.00,
    quantity: '6 pcs',
    allergens: ['Gluten', 'Dairy']
  },
  {
    name: 'Chicken Wings',
    description: 'Choose from Buffalo, BBQ, or Plain with blue cheese dressing.',
    price: 7.00,
    quantity: '6 pcs'
  },
  {
    name: 'House Salad',
    description: 'Fresh greens, tomatoes, cucumbers, onions with your choice of dressing.',
    price: 6.00,
    allergens: ['Dairy-free option']
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan cheese, croutons with Caesar dressing.',
    price: 6.00,
    allergens: ['Gluten', 'Dairy']
  }
];

const beverages: MenuItem[] = [
  {
    name: 'Soda (Can)',
    description: 'Coke, Diet Coke, Sprite, Dr. Pepper',
    price: 2.00
  },
  {
    name: 'Soda (2-liter)',
    description: 'Coke, Diet Coke, Sprite, Dr. Pepper',
    price: 3.50
  },
  {
    name: 'Bottled Water',
    description: 'Pure spring water',
    price: 1.50
  }
];

const desserts: MenuItem[] = [
  {
    name: 'Chocolate Chip Cookies',
    description: 'Freshly baked daily.',
    price: 4.00,
    quantity: '3 pcs',
    allergens: ['Gluten', 'Dairy', 'Eggs']
  }
];

const MenuSection = () => {
  // Removed useState for pizzaBuilderOpen
  // const [pizzaBuilderOpen, setPizzaBuilderOpen] = useState(false);

  return (
    <section id="menu" className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-pizza-red mb-8 text-center">Our Menu</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Ready to order? Click the voice widget on the bottom right!
        </p>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {/* General Info */}
          <Card className="shadow-md border-pizza-red border-t-4">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-2xl text-pizza-red">General Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">Hours:</h4>
                  <p>We're open Monday through Thursday from 11 AM to 10 PM, Friday and Saturday from 11 AM to midnight, and Sunday from noon to 9 PM.</p>
                </div>
                <div>
                  <h4 className="font-bold">Location:</h4>
                  <p>We're located at 123 Main Street AIcity Vapiland, next to Vapi Challenge, with parking available in front and in the rear lot.</p>
                </div>
                <div>
                  <h4 className="font-bold">Menu Summary:</h4>
                  <p>We offer specialty pizzas, custom pizzas, garlic knots, wings, salads, soft drinks, and desserts.</p>
                </div>
                <div>
                  <h4 className="font-bold">Wait Time:</h4>
                  <p>Pickup orders are ready in about 15-20 minutes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pizza Sizes */}
          <div>
            <h3 className="text-2xl font-bold text-pizza-red mb-4">Pizza Sizes & Pricing</h3>
            <Table className="border-2 border-gray-200">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold">Size</TableHead>
                  <TableHead className="font-bold">Diameter</TableHead>
                  <TableHead className="font-bold text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pizzaSizes.map((size, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{size.name}</TableCell>
                    <TableCell>{size.size}</TableCell>
                    <TableCell className="text-right">${size.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Specialty Pizzas */}
          <div>
            <h3 className="text-2xl font-bold text-pizza-red mb-4">Specialty Pizzas</h3>
            <p className="mb-4 text-gray-600 italic">All specialty pizzas are available in Small ($10), Medium ($15), and Large ($20)</p>
            
            <Table className="border-2 border-gray-200">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold">Pizza</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialtyPizzas.map((pizza, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{pizza.name}</TableCell>
                    <TableCell>{pizza.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Build Your Own - Updated Layout */}
          <div>
            <h3 className="text-2xl font-bold text-pizza-red mb-4">Build Your Own Pizza</h3>
            
            <div className="space-y-3 mb-6">
              <p><span className="font-semibold">Crust:</span> Thick or thin crust</p>
              <p><span className="font-semibold">Size:</span> Small (10"), Medium (12"), Large (16")</p>
              <p><span className="font-semibold">Sauce:</span> Traditional tomato, white garlic, BBQ, or buffalo sauce</p>
              <p><span className="font-semibold">Cheese:</span> Mozzarella, Extra Cheese, Feta, Cheddar, or Provolone</p>
              <p><span className="font-semibold">Toppings:</span> You can choose up to 4 included toppings; additional toppings are $1.50 each</p>
            </div>

            <h4 className="text-xl font-bold text-pizza-red mt-6 mb-3">Available Toppings:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {toppingCategories.map((category, index) => (
                <Card key={index} className="border shadow-sm">
                  <CardHeader className="bg-gray-50 py-3">
                    <CardTitle className="text-xl text-pizza-red">{category.name}</CardTitle> {/* Changed to text-xl and added text-pizza-red */}
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 space-y-1">
                      {category.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 bg-gray-100 p-4 border-l-4 border-pizza-red rounded">
              <h4 className="text-xl font-bold text-pizza-red">Gluten-Free Option</h4> {/* Added text-xl and text-pizza-red */}
              <p>Gluten-free crust available in small size only for an additional $2.00.</p>
            </div>
          </div>
          
          {/* Sides, Beverages, Desserts */}
          <div>
            <h3 className="text-2xl font-bold text-pizza-red mb-4">Sides, Beverages & Desserts</h3>
            
            <h4 className="text-xl font-bold text-pizza-red mb-2">Sides</h4> {/* Added text-pizza-red */}
            <Table className="border-2 border-gray-200 mb-6">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold">Item</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sides.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.name}
                      {item.quantity && <span className="text-sm text-gray-500 block">{item.quantity}</span>}
                    </TableCell>
                    <TableCell>
                      {item.description}
                      <div className="mt-1">
                        {item.allergens?.map((allergen, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1 text-xs bg-gray-100">{allergen}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <h4 className="text-xl font-bold text-pizza-red mb-2">Beverages</h4> {/* Added text-pizza-red */}
            <Table className="border-2 border-gray-200 mb-6">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold">Item</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beverages.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <h4 className="text-xl font-bold text-pizza-red mb-2">Desserts</h4> {/* Added text-pizza-red */}
            <Table className="border-2 border-gray-200">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold">Item</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {desserts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.name}
                      {item.quantity && <span className="text-sm text-gray-500 block">{item.quantity}</span>}
                    </TableCell>
                    <TableCell>
                      {item.description}
                      <div className="mt-1">
                        {item.allergens?.map((allergen, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1 text-xs bg-gray-100">{allergen}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Allergen Information */}
          <Card className="shadow-md border-yellow-400 border-t-4">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl">Allergen Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>Cheese is 100% dairy</li>
                <li>All food is made in the same kitchen; veggies and meat are prepped separately</li>
                <li>Please inform staff of any allergies when ordering</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Pizza Builder Modal Removed */}
      {/* 
      <PizzaBuilder 
        isOpen={pizzaBuilderOpen} 
        onClose={() => setPizzaBuilderOpen(false)}
      /> 
      */}
    </section>
  );
};

export default MenuSection;
