import React from 'react';
import { FaTruck } from 'react-icons/fa';
import { GiCheeseWedge, GiHotSpices } from 'react-icons/gi';

function Features({ mousePosition }) {
  return (
    <div className="py-20 bg-gradient-to-br from-pizza-yellow/10 via-pizza-black to-pizza-red/10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Pizza Planet?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We deliver more than just pizza - we deliver happiness, quality, and unforgettable experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div 
            className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-3xl p-8 text-center hover:border-pizza-yellow transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            style={{
              transform: `translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`
            }}
          >
            <div className="w-20 h-20 bg-pizza-yellow rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-180 transition-transform duration-500">
              <GiCheeseWedge className="text-pizza-black text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-pizza-yellow mb-4">Fresh Ingredients</h3>
            <p className="text-gray-400 text-lg">
              We use only the freshest ingredients sourced from local farms and premium Italian imports.
            </p>
          </div>
          
          <div 
            className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-3xl p-8 text-center hover:border-pizza-yellow transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            style={{
              transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`
            }}
          >
            <div className="w-20 h-20 bg-pizza-yellow rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-180 transition-transform duration-500">
              <FaTruck className="text-pizza-black text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-pizza-yellow mb-4">Fast Delivery</h3>
            <p className="text-gray-400 text-lg">
              30-minute delivery guarantee or your pizza is free! Hot and fresh, every time.
            </p>
          </div>
          
          <div 
            className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-3xl p-8 text-center hover:border-pizza-yellow transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            style={{
              transform: `translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`
            }}
          >
            <div className="w-20 h-20 bg-pizza-yellow rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-180 transition-transform duration-500">
              <GiHotSpices className="text-pizza-black text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-pizza-yellow mb-4">Authentic Taste</h3>
            <p className="text-gray-400 text-lg">
              Traditional recipes passed down through generations of Italian chefs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;