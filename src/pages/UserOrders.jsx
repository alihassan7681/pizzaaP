import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingBag, FaPizzaSlice, FaUser } from 'react-icons/fa';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserOrders();
    fetchUserProfile();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'out-for-delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pizza-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pizza-yellow mx-auto mb-4"></div>
          <p>Loading your orders...</p>
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
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-pizza-yellow rounded-full flex items-center justify-center">
                    <span className="text-pizza-black font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-pizza-yellow font-semibold hidden sm:block">{user.name}</span>
                </div>
              ) : (
                <Link to="/login" className="text-pizza-yellow hover:text-yellow-500 font-semibold">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 md:pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center space-x-3">
              <FaShoppingBag className="text-pizza-yellow" />
              <span>Your <span className="text-pizza-yellow">Orders</span></span>
            </h1>
            <p className="text-gray-400 text-lg">Track your order history and status</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <div className="text-8xl mb-6">📦</div>
              <h2 className="text-2xl md:text-3xl font-bold text-pizza-yellow mb-4">No orders yet!</h2>
              <p className="text-gray-400 mb-8">Place your first order to get started</p>
              <Link 
                to="/order" 
                className="inline-block bg-pizza-yellow text-pizza-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6 hover:border-pizza-yellow transition-all">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-pizza-yellow">Order #{order._id.substring(0, 8)}</h3>
                      <p className="text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-pizza-yellow mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-pizza-yellow/20">
                            <div>
                              <p className="font-medium">{item.menuItem?.name || 'Unknown Item'}</p>
                              <p className="text-sm text-gray-400">Size: {item.size} × {item.quantity}</p>
                            </div>
                            <p className="font-medium">PKR {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-pizza-yellow/20">
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-pizza-yellow">PKR {order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-pizza-yellow mb-3">Delivery Information</h4>
                      <div className="space-y-2">
                        <p className="flex items-start">
                          <FaUser className="text-pizza-yellow mt-1 mr-2 flex-shrink-0" />
                          <span>{user?.name || 'N/A'}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-pizza-yellow mr-2">📍</span>
                          <span>{order.shippingAddress?.street || 'N/A'}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-pizza-yellow mr-2">🏙️</span>
                          <span>{order.shippingAddress?.city || 'N/A'}</span>
                        </p>
                        {order.shippingAddress?.zipCode && (
                          <p className="flex items-start">
                            <span className="text-pizza-yellow mr-2">📮</span>
                            <span>{order.shippingAddress.zipCode}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;