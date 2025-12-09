import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPizzaSlice, FaShoppingCart, FaUser, FaList, FaHistory, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ user, onLogout, mobileMenuOpen, setMobileMenuOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-pizza-black/95 backdrop-blur-sm border-b border-pizza-yellow/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pizza-yellow rounded-full flex items-center justify-center">
                <FaPizzaSlice className="text-pizza-black text-xl md:text-2xl" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pizza-yellow">Pizza Planet</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/order" className="text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:scale-105">
              Order Now
            </Link>
            <Link to="/menu" className="text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:scale-105">
              Menu
            </Link>
            <Link to="/cart" className="text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium flex items-center hover:scale-105">
              <FaShoppingCart className="mr-2" />
              Cart
            </Link>
            {user ? (
              <>
                <Link to="/my-orders" className="text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium flex items-center hover:scale-105">
                  <FaHistory className="mr-2" />
                  My Orders
                </Link>
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 bg-pizza-yellow rounded-full flex items-center justify-center transition-transform hover:scale-110 duration-300">
                      <span className="text-pizza-black font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 hover:text-pizza-yellow transition-colors font-medium">
                      {user.name}
                    </span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-pizza-black border border-pizza-yellow/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow transition-all">
                      <FaUser className="inline mr-2" />
                      Profile
                    </Link>
                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow transition-all">
                      <FaList className="inline mr-2" />
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow transition-all"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:scale-105">
                  Login
                </Link>
                <Link to="/signup" className="bg-pizza-yellow text-pizza-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pizza-yellow/30">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-pizza-yellow p-2 transition-all duration-300"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pizza-black/95 border-t border-pizza-yellow/20 animate-slideDown">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/order" 
              className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Now
            </Link>
            <Link 
              to="/menu" 
              className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              to="/cart" 
              className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaShoppingCart className="inline mr-2" />
              Cart
            </Link>
            {user ? (
              <>
                <Link 
                  to="/my-orders" 
                  className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHistory className="inline mr-2" />
                  My Orders
                </Link>
                <div className="pt-4 border-t border-pizza-yellow/20">
                  <div className="flex items-center space-x-2 py-3">
                    <div className="w-10 h-10 bg-pizza-yellow rounded-full flex items-center justify-center">
                      <span className="text-pizza-black font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 font-medium">{user.name}</span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all hover:pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser className="inline mr-2" />
                    Profile
                  </Link>
                  <Link 
                    to="/my-orders" 
                    className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all hover:pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaList className="inline mr-2" />
                    Order History
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 text-gray-300 hover:text-pizza-yellow transition-all hover:pl-4"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-pizza-yellow/20 space-y-4">
                <Link 
                  to="/login" 
                  className="block py-3 text-gray-300 hover:text-pizza-yellow transition-all duration-300 font-medium hover:pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block py-3 bg-pizza-yellow text-pizza-black rounded-lg font-medium hover:bg-yellow-500 transition-all duration-300 text-center hover:scale-105"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;