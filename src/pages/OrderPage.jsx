import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaPlus, FaArrowLeft, FaClock, FaMapMarkerAlt, FaPhone, FaPizzaSlice, FaUser, FaHistory } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function OrderPage() {
  const { cart, addToCart, getItemCount } = useCart();
  const [selectedSize, setSelectedSize] = useState({});
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      if (response.ok) {
        const data = await response.json();
        setPizzaMenu(data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      // Fallback to hardcoded menu if API fails
      setPizzaMenu([
        {
          id: 1,
          name: "Margherita Supreme",
          desc: "Fresh mozzarella, basil & tomato sauce",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop",
          sizes: { small: 899, medium: 1299, large: 1599 }
        },
        {
          id: 2,
          name: "Pepperoni Blast",
          desc: "Double pepperoni with extra cheese",
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop",
          sizes: { small: 999, medium: 1499, large: 1799 }
        },
        {
          id: 3,
          name: "Veggie Delight",
          desc: "Bell peppers, mushrooms, olives & onions",
          image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=500&h=400&fit=crop",
          sizes: { small: 899, medium: 1399, large: 1699 }
        },
        {
          id: 4,
          name: "BBQ Chicken",
          desc: "Grilled chicken with BBQ sauce",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop",
          sizes: { small: 1099, medium: 1599, large: 1899 }
        },
        {
          id: 5,
          name: "Meat Lovers",
          desc: "Pepperoni, sausage, bacon & ham",
          image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&h=400&fit=crop",
          sizes: { small: 1299, medium: 1699, large: 1999 }
        },
        {
          id: 6,
          name: "Hawaiian Paradise",
          desc: "Ham, pineapple & mozzarella",
          image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=400&fit=crop",
          sizes: { small: 999, medium: 1499, large: 1799 }
        },
        {
          id: 7,
          name: "Supreme Deluxe",
          desc: "Loaded with premium toppings",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop",
          sizes: { small: 1199, medium: 1699, large: 1999 }
        },
        {
          id: 8,
          name: "Four Cheese",
          desc: "Mozzarella, cheddar, parmesan & feta",
          image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=400&fit=crop",
          sizes: { small: 1099, medium: 1599, large: 1899 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (pizza, size) => {
    addToCart(pizza, size);
    toast.success(`🍕 ${pizza.name} (${size}) added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pizza-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pizza-yellow mx-auto mb-4"></div>
          <p>Loading delicious pizzas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pizza-black text-white">
      {/* Header */}
      <nav className="fixed w-full top-0 z-50 bg-pizza-black/95 backdrop-blur-sm border-b border-pizza-yellow/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <FaArrowLeft className="text-pizza-yellow" />
              <span className="text-pizza-yellow font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pizza-yellow rounded-full flex items-center justify-center">
                <FaPizzaSlice className="text-pizza-black text-xl md:text-2xl" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pizza-yellow">Pizza Planet</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 bg-pizza-yellow rounded-full flex items-center justify-center">
                      <span className="text-pizza-black font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-pizza-yellow font-semibold hidden sm:block">{user.name}</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-pizza-black border border-pizza-yellow/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link 
                      to="/my-orders" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow"
                    >
                      <FaHistory className="inline mr-2" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow"
                    >
                      <FaArrowLeft className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-pizza-yellow hover:text-yellow-500 font-semibold">
                  Login
                </Link>
              )}
              <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                <FaShoppingCart className="text-pizza-yellow text-2xl" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 md:pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Order Your <span className="text-pizza-yellow">Favorite Pizza</span>
            </h1>
            <p className="text-gray-400 text-lg">Choose your pizza, select size, and add to cart</p>
          </div>

          {/* Menu Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pizzaMenu.map((pizza) => (
              <div key={pizza._id || pizza.id} className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl overflow-hidden hover:border-pizza-yellow transition-all transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pizza-black to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-pizza-yellow mb-2">{pizza.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{pizza.description || pizza.desc}</p>
                  
                  <div className="space-y-3">
                    <div className="text-sm text-gray-300">Select Size:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(pizza.sizes).map(([size, price]) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize({ ...selectedSize, [pizza._id || pizza.id]: size })}
                          className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                            selectedSize[pizza._id || pizza.id] === size
                              ? 'bg-pizza-yellow text-pizza-black border-pizza-yellow'
                              : 'bg-transparent text-gray-400 border-pizza-yellow/30 hover:border-pizza-yellow'
                          }`}
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                          <div className="text-xs">PKR {price}</div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const size = selectedSize[pizza._id || pizza.id] || 'medium';
                        handleAddToCart(pizza, size);
                      }}
                      className="w-full bg-pizza-yellow text-pizza-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all flex items-center justify-center space-x-2"
                    >
                      <FaPlus />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Cart Button */}
          {getItemCount() > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/cart')}
                className="bg-pizza-yellow text-pizza-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3 shadow-lg"
              >
                <FaShoppingCart />
                <span>View Cart ({getItemCount()} items)</span>
                <FaPizzaSlice />
              </button>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-12 bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <FaPhone className="text-pizza-yellow text-3xl mx-auto mb-2" />
                <h3 className="font-bold text-pizza-yellow mb-1">Call Us</h3>
                <p className="text-gray-400">+92 (300) 123-4567</p>
              </div>
              <div>
                <FaClock className="text-pizza-yellow text-3xl mx-auto mb-2" />
                <h3 className="font-bold text-pizza-yellow mb-1">Open Hours</h3>
                <p className="text-gray-400">Mon-Sun: 10AM - 11PM</p>
              </div>
              <div>
                <FaMapMarkerAlt className="text-pizza-yellow text-3xl mx-auto mb-2" />
                <h3 className="font-bold text-pizza-yellow mb-1">Location</h3>
                <p className="text-gray-400">123 Pizza Street, Lahore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;