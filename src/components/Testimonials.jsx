import React from 'react';
import { FaStar } from 'react-icons/fa';

function Testimonials() {
  const testimonials = [
    { id: 1, name: "John D.", comment: "Best pizza in town! Delivery was super fast.", rating: 5 },
    { id: 2, name: "Sarah M.", comment: "The crust is perfectly crispy. Will order again!", rating: 5 },
    { id: 3, name: "Mike R.", comment: "Great variety and amazing taste. Highly recommended!", rating: 4 },
  ];

  return (
    <div className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-pizza-yellow">Customers</span> Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our pizzas and exceptional service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-gradient-to-br from-pizza-black to-gray-900 border border-pizza-yellow/20 rounded-3xl p-8 hover:border-pizza-yellow transition-all duration-500 hover:scale-105 group"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-pizza-yellow/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                  <div className="flex text-pizza-yellow">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-600"} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-lg italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;