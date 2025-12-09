// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaPizzaSlice, FaShoppingCart, FaUser, FaList, FaHistory, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

// function HomePage() {
//   const [user, setUser] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUserProfile();
//     }
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/auth/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-pizza-black text-white">
//       {/* Header */}
//       <nav className="fixed w-full top-0 z-50 bg-pizza-black/95 backdrop-blur-sm border-b border-pizza-yellow/20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 md:h-20">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 md:w-12 md:h-12 bg-pizza-yellow rounded-full flex items-center justify-center">
//                 <FaPizzaSlice className="text-pizza-black text-xl md:text-2xl" />
//               </div>
//               <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pizza-yellow">Pizza Planet</h1>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-6">
//               <Link to="/order" className="text-gray-300 hover:text-pizza-yellow transition-colors font-medium">
//                 Order Now
//               </Link>
//               <Link to="/cart" className="text-gray-300 hover:text-pizza-yellow transition-colors font-medium flex items-center">
//                 <FaShoppingCart className="mr-2" />
//                 Cart
//               </Link>
//               {user ? (
//                 <>
//                   <Link to="/my-orders" className="text-gray-300 hover:text-pizza-yellow transition-colors font-medium flex items-center">
//                     <FaHistory className="mr-2" />
//                     My Orders
//                   </Link>
//                   <div className="relative group">
//                     <div className="flex items-center space-x-2 cursor-pointer">
//                       <div className="w-8 h-8 bg-pizza-yellow rounded-full flex items-center justify-center">
//                         <span className="text-pizza-black font-bold text-sm">
//                           {user.name.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <span className="text-gray-300 hover:text-pizza-yellow transition-colors font-medium">
//                         {user.name}
//                       </span>
//                     </div>
//                     <div className="absolute right-0 mt-2 w-48 bg-pizza-black border border-pizza-yellow/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                       <Link 
//                         to="/my-orders" 
//                         className="block px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow"
//                       >
//                         <FaList className="inline mr-2" />
//                         Order History
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-pizza-yellow/10 hover:text-pizza-yellow"
//                       >
//                         <FaSignOutAlt className="inline mr-2" />
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="text-gray-300 hover:text-pizza-yellow transition-colors font-medium">
//                     Login
//                   </Link>
//                   <Link to="/signup" className="bg-pizza-yellow text-pizza-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-gray-300 hover:text-pizza-yellow p-2"
//               >
//                 {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-pizza-black/95 border-t border-pizza-yellow/20">
//             <div className="container mx-auto px-4 py-4 space-y-4">
//               <Link 
//                 to="/order" 
//                 className="block py-2 text-gray-300 hover:text-pizza-yellow transition-colors font-medium"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Order Now
//               </Link>
//               <Link 
//                 to="/cart" 
//                 className="block py-2 text-gray-300 hover:text-pizza-yellow transition-colors font-medium"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <FaShoppingCart className="inline mr-2" />
//                 Cart
//               </Link>
//               {user ? (
//                 <>
//                   <Link 
//                     to="/my-orders" 
//                     className="block py-2 text-gray-300 hover:text-pizza-yellow transition-colors font-medium"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <FaHistory className="inline mr-2" />
//                     My Orders
//                   </Link>
//                   <div className="pt-2 border-t border-pizza-yellow/20">
//                     <div className="flex items-center space-x-2 py-2">
//                       <div className="w-8 h-8 bg-pizza-yellow rounded-full flex items-center justify-center">
//                         <span className="text-pizza-black font-bold text-sm">
//                           {user.name.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <span className="text-gray-300 font-medium">{user.name}</span>
//                     </div>
//                     <Link 
//                       to="/my-orders" 
//                       className="block py-2 text-gray-300 hover:text-pizza-yellow transition-colors"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <FaList className="inline mr-2" />
//                       Order History
//                     </Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setMobileMenuOpen(false);
//                       }}
//                       className="block w-full text-left py-2 text-gray-300 hover:text-pizza-yellow transition-colors"
//                     >
//                       <FaSignOutAlt className="inline mr-2" />
//                       Logout
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="pt-2 border-t border-pizza-yellow/20 space-y-2">
//                   <Link 
//                     to="/login" 
//                     className="block py-2 text-gray-300 hover:text-pizza-yellow transition-colors font-medium"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link 
//                     to="/signup" 
//                     className="block py-2 bg-pizza-yellow text-pizza-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-center"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <div className="pt-20 md:pt-24 pb-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               Delicious <span className="text-pizza-yellow">Pizza</span> Delivered Fast
//             </h1>
//             <p className="text-xl text-gray-300 mb-8">
//               Experience the taste of authentic Italian pizza made with fresh ingredients and delivered right to your doorstep.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link 
//                 to="/order" 
//                 className="bg-pizza-yellow text-pizza-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
//               >
//                 <FaShoppingCart />
//                 <span>Order Now</span>
//               </Link>
//               <Link 
//                 to="/order" 
//                 className="border-2 border-pizza-yellow text-pizza-yellow px-8 py-4 rounded-full text-lg font-bold hover:bg-pizza-yellow hover:text-pizza-black transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
//               >
//                 <FaPizzaSlice />
//                 <span>View Menu</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-12 bg-gradient-to-br from-pizza-yellow/10 to-transparent">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pizza Planet?</h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">We deliver more than just pizza - we deliver happiness to your doorstep.</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6 text-center hover:border-pizza-yellow transition-all">
//               <div className="w-16 h-16 bg-pizza-yellow rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaPizzaSlice className="text-pizza-black text-2xl" />
//               </div>
//               <h3 className="text-xl font-bold text-pizza-yellow mb-2">Fresh Ingredients</h3>
//               <p className="text-gray-400">We use only the freshest ingredients sourced locally to ensure the best taste.</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6 text-center hover:border-pizza-yellow transition-all">
//               <div className="w-16 h-16 bg-pizza-yellow rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="text-pizza-black text-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-pizza-yellow mb-2">Fast Delivery</h3>
//               <p className="text-gray-400">Lightning-fast delivery within 30 minutes or you get your pizza free!</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-pizza-yellow/10 to-transparent border border-pizza-yellow/30 rounded-2xl p-6 text-center hover:border-pizza-yellow transition-all">
//               <div className="w-16 h-16 bg-pizza-yellow rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="text-pizza-black text-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-pizza-yellow mb-2">Customer Love</h3>
//               <p className="text-gray-400">Join thousands of satisfied customers who love our pizzas and service.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;





import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

// Import Components
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PopularPizzas from '../components/PopularPizzas';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import MobileApp from '../components/MobileApp';
import Footer from '../components/Footer';

function HomePage() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    }

    // Mouse move effect for 3D parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    // Scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-pizza-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pizza-yellow/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pizza-red/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-pizza-yellow/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navbar */}
      <Navbar 
        user={user}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection mousePosition={mousePosition} scrollY={scrollY} />

      {/* Popular Pizzas */}
      <PopularPizzas scrollY={scrollY} />

      {/* Features */}
      <Features mousePosition={mousePosition} />

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-pizza-yellow/10 to-pizza-red/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-pizza-yellow mb-2">10K+</div>
              <div className="text-gray-400 text-lg">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pizza-yellow mb-2">30min</div>
              <div className="text-gray-400 text-lg">Avg Delivery Time</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pizza-yellow mb-2">50+</div>
              <div className="text-gray-400 text-lg">Pizza Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pizza-yellow mb-2">24/7</div>
              <div className="text-gray-400 text-lg">Order Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Mobile App */}
      <MobileApp />

      {/* Footer */}
      <Footer />

      {/* Fixed Order Button */}
      <Link 
        to="/order" 
        className="fixed bottom-8 right-8 bg-pizza-yellow text-pizza-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none z-40"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      >
        <FaShoppingCart size={24} />
      </Link>
    </div>
  );
}

export default HomePage;