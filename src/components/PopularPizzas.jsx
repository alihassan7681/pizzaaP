import React, { useState } from 'react';
import { Star, Flame } from 'lucide-react';

function PopularPizzas() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const popularPizzas = [
    { 
      id: 1, 
      name: "Margherita", 
      description: "Classic tomato sauce, fresh mozzarella, basil leaves, and extra virgin olive oil", 
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      rating: 4.8,
      popular: true
    },
    { 
      id: 2, 
      name: "Pepperoni", 
      description: "Tomato sauce, premium mozzarella, and spicy pepperoni slices with oregano", 
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      rating: 4.9,
      popular: true
    },
    { 
      id: 3, 
      name: "BBQ Chicken", 
      description: "Smoky BBQ sauce, grilled chicken, red onions, cilantro, and cheese blend", 
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      rating: 4.7,
      popular: false
    },
    { 
      id: 4, 
      name: "Veggie Supreme", 
      description: "Bell peppers, mushrooms, olives, onions, tomatoes with extra cheese", 
      image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
      rating: 4.6,
      popular: false
    },
    { 
      id: 5, 
      name: "Meat Lovers", 
      description: "Pepperoni, sausage, bacon, ham, and ground beef with mozzarella", 
      image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop",
      rating: 4.9,
      popular: true
    },
    { 
      id: 6, 
      name: "Hawaiian", 
      description: "Canadian bacon, sweet pineapple chunks, mozzarella, and tomato sauce", 
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
      rating: 4.5,
      popular: false
    },
    { 
      id: 7, 
      name: "Quattro Formaggi", 
      description: "Four premium cheeses: mozzarella, parmesan, gorgonzola, and fontina", 
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      rating: 4.8,
      popular: false
    },
    { 
      id: 8, 
      name: "Spicy Devil", 
      description: "Hot sauce, jalapeños, pepperoni, red chili flakes, and pepper jack cheese", 
      image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop",
      rating: 4.7,
      popular: true
    },
  ];

  return (
    <div className="py-20 relative bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              🔥 Hot & Fresh
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Our <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Popular</span> Pizzas
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our customer favorites, crafted with premium ingredients and baked to perfection in our stone oven.
          </p>
        </div>
        
        {/* Pizza Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {popularPizzas.map((pizza, index) => (
            <div 
              key={pizza.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(pizza.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Popular Badge */}
              {pizza.popular && (
                <div className="absolute -top-3 -right-3 z-20 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl animate-bounce">
                  <Flame className="w-3 h-3" />
                  Popular
                </div>
              )}

              {/* Card */}
              <div 
                className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 border-opacity-20 rounded-3xl overflow-hidden h-full transition-all duration-500 cursor-pointer"
                style={{
                  transform: hoveredCard === pizza.id 
                    ? 'translateY(-10px) rotateX(5deg) scale(1.02)' 
                    : 'translateY(0) rotateX(0deg) scale(1)',
                  boxShadow: hoveredCard === pizza.id 
                    ? '0 20px 60px rgba(234, 179, 8, 0.3)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.5)',
                  borderColor: hoveredCard === pizza.id ? 'rgb(234, 179, 8)' : 'rgba(234, 179, 8, 0.2)',
                  perspective: '1000px'
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                />

                {/* Pizza Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      transform: hoveredCard === pizza.id 
                        ? 'scale(1.15) rotate(2deg)' 
                        : 'scale(1) rotate(0deg)',
                      filter: hoveredCard === pizza.id ? 'brightness(1.1)' : 'brightness(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(pizza.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                      />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">({pizza.rating})</span>
                  </div>

                  {/* Pizza Info */}
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3 text-center group-hover:text-yellow-300 transition-colors">
                    {pizza.name}
                  </h3>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">
                    {pizza.description}
                  </p>
                </div>

                {/* Hover Shine Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                    transform: hoveredCard === pizza.id ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 1s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group relative bg-transparent border-2 border-yellow-500 text-yellow-400 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <span className="relative z-10">View All Pizzas</span>
            <div className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default PopularPizzas;