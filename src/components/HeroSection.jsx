import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Pizza, ChefHat, Clock, Star } from 'lucide-react';

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pizzaRotation, setPizzaRotation] = useState(0);
  const heroRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        targetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        targetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setMousePosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    const rotationInterval = setInterval(() => {
      setPizzaRotation(prev => (prev + 2) % 360);
    }, 30);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(rotationInterval);
    };
  }, []);

  const pizzaEmojis = ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'];

  const features = [
    { icon: ChefHat, text: 'Expert Chefs', colorClass: 'text-yellow-400' },
    { icon: Clock, text: '30 Min Delivery', colorClass: 'text-yellow-300' },
    { icon: Star, text: '5-Star Rated', colorClass: 'text-yellow-500' }
  ];

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-black"
    >
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20 will-change-transform"
          style={{
            top: '10%',
            left: '10%',
            transform: `translate3d(${mousePosition.x * 50}px, ${mousePosition.y * 50}px, 0)`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-15 will-change-transform"
          style={{
            top: '50%',
            right: '10%',
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0)`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-10 will-change-transform"
          style={{
            bottom: '10%',
            left: '50%',
            transform: `translate3d(${mousePosition.x * 40}px, ${mousePosition.y * 40}px, 0)`
          }}
        />
      </div>

      {/* 3D Floating Pizza Elements */}
      {pizzaEmojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute text-6xl opacity-20 pointer-events-none will-change-transform"
          style={{
            top: `${15 + index * 15}%`,
            left: `${10 + (index % 3) * 30}%`,
            transform: `
              rotate(${pizzaRotation + index * 60}deg)
              translate3d(${mousePosition.x * (20 + index * 5)}px, ${mousePosition.y * (20 + index * 5)}px, 0)
              scale(${1 + Math.sin(pizzaRotation * 0.02 + index) * 0.15})
            `
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-5xl mx-auto">
          {/* Decorative Pizza Icon */}
          <div className="mb-8 flex justify-center">
            <div 
              className="relative will-change-transform"
              style={{
                transform: `rotate(${pizzaRotation}deg)`
              }}
            >
              <Pizza className="w-24 h-24 text-yellow-400 drop-shadow-2xl" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            <span className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Delicious Pizza
            </span>
            <br />
            <span className="inline-block text-white drop-shadow-2xl">
              Delivered Fast
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Experience the taste of authentic Italian pizza made with fresh ingredients, 
            baked to perfection, and delivered right to your doorstep in minutes.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-yellow-500 border-opacity-20 transform hover:scale-105 hover:border-opacity-50 transition-all duration-300 shadow-2xl"
              >
                <feature.icon className={`w-12 h-12 mx-auto mb-3 ${feature.colorClass}`} />
                <p className="text-white font-semibold text-lg">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a 
              href="/order"
              className="group relative inline-flex bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-12 py-6 rounded-full text-2xl font-bold overflow-hidden transform hover:scale-105 hover:shadow-yellow-500 hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white opacity-0 group-hover:opacity-30 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
              <div className="relative flex items-center justify-center space-x-4">
                <ShoppingCart className="w-8 h-8" />
                <span>Order Now</span>
              </div>
            </a>
          </div>

          {/* Special Offer Badge */}
          <div className="mt-12 inline-block">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
              🎉 20% OFF on First Order!
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-500 to-transparent opacity-10" />
    </div>
  );
}

export default HeroSection;