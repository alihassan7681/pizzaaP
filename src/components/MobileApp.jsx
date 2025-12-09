import React from 'react';
import { FaPizzaSlice, FaGooglePlay, FaAppStore } from 'react-icons/fa';

function MobileApp() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pizza-yellow/20 to-pizza-red/20 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Our <span className="text-pizza-yellow">Mobile App</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Order your favorite pizza on the go! Download our app for exclusive offers, 
                faster ordering, and tracking your delivery in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all">
                  <FaGooglePlay />
                  <span>Google Play</span>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all">
                  <FaAppStore />
                  <span>App Store</span>
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-pizza-yellow to-pizza-red rounded-3xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
                  <FaPizzaSlice className="text-white text-8xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;