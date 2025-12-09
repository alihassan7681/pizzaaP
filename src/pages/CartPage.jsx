import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaArrowLeft, FaPizzaSlice, FaUser, FaPhone, FaMapMarkerAlt, FaHome, FaCity, FaHistory } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const deliveryFee = 150;

  useEffect(() => {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/login');
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          menuItemId: item._id || item.id, // Use _id if from backend, id if hardcoded
          size: item.size,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          zipCode: formData.postalCode || '',
          phone: formData.phone // Add phone number to shipping address
        },
        totalAmount: parseFloat(getTotal()) + deliveryFee
      };

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Send order to backend
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        
        toast.success('🍕 Order placed successfully! We will deliver in 30-45 minutes.', {
          position: "top-center",
          autoClose: 5000,
        });

        // Clear cart and form
        clearCart();
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          postalCode: '',
          notes: ''
        });
        
        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Order failed: ${errorData.message || 'Please try again'}`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

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
              <Link to="/order" className="text-pizza-yellow hover:text-yellow-500 font-semibold">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 md:pt-24 pb-12 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center space-x-3">
              <FaShoppingCart className="text-pizza-yellow" />
              <span>Your <span className="text-pizza-yellow">Cart</span></span>
            </h1>
            <p className="text-gray-400 text-lg">Review your order and complete checkout</p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl md:text-3xl font-bold text-pizza-yellow mb-4">Your cart is empty!</h2>
              <p className="text-gray-400 mb-8">Add some delicious pizzas to get started</p>
              <Link 
                to="/order" 
                className="inline-block bg-pizza-yellow text-pizza-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-pizza-yellow mb-6">Order Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-4 md:p-6 hover:border-pizza-yellow transition-all">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-pizza-yellow">{item.name}</h3>
                            <p className="text-sm text-gray-400 capitalize">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-red-500 hover:text-red-400 p-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3 bg-pizza-black/50 rounded-lg p-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="bg-pizza-yellow/20 text-pizza-yellow p-2 rounded hover:bg-pizza-yellow/30"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="bg-pizza-yellow/20 text-pizza-yellow p-2 rounded hover:bg-pizza-yellow/30"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">PKR {item.price.toFixed(2)} each</p>
                            <p className="text-xl md:text-2xl font-bold text-pizza-yellow">
                              PKR {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Checkout */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-pizza-yellow mb-6">Order Summary</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal:</span>
                        <span className="font-semibold">PKR {getTotal()}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Delivery Fee:</span>
                        <span className="font-semibold">PKR {deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-pizza-yellow/30 pt-3 flex justify-between text-xl font-bold text-pizza-yellow">
                        <span>Total:</span>
                        <span>PKR {(parseFloat(getTotal()) + deliveryFee).toFixed(2)}</span>
                      </div>
                    </div>
                    {!showCheckout && (
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="w-full bg-pizza-yellow text-pizza-black py-4 rounded-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105"
                      >
                        Proceed to Checkout
                      </button>
                    )}
                  </div>

                  {/* Checkout Form */}
                  {showCheckout && (
                    <div className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6">
                      <h2 className="text-2xl font-bold text-pizza-yellow mb-6">Delivery Details</h2>
                      <form onSubmit={handleSubmitOrder} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <FaUser className="inline mr-2 text-pizza-yellow" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                            placeholder="Enter your name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <FaPhone className="inline mr-2 text-pizza-yellow" />
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                            placeholder="03XX-XXXXXXX"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <FaHome className="inline mr-2 text-pizza-yellow" />
                            Delivery Address *
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                            placeholder="House #, Street, Area"
                            rows="3"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                              <FaCity className="inline mr-2 text-pizza-yellow" />
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                              placeholder="City"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                              placeholder="54000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Special Instructions
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="w-full bg-pizza-black/50 border border-pizza-yellow/30 rounded-lg px-4 py-3 text-white focus:border-pizza-yellow focus:outline-none"
                            placeholder="Any special requests?"
                            rows="2"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-pizza-yellow text-pizza-black py-4 rounded-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <span>Placing Order...</span>
                            </>
                          ) : (
                            <>
                              <span>Place Order - PKR {(parseFloat(getTotal()) + deliveryFee).toFixed(2)}</span>
                              <FaPizzaSlice />
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;