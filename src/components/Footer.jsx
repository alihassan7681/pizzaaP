import React from 'react';
import { Pizza, MapPin, Phone, Clock, Facebook, Twitter, Instagram, CreditCard, Mail, ArrowRight } from 'lucide-react';

function Footer() {
  const quickLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Order Online', path: '/order' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
      </div>

      {/* Top Border Glow */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-yellow-500/50">
                <Pizza className="text-black w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Pizza Planet
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Delivering happiness one pizza at a time since 2010. Fresh ingredients, authentic recipes, and love in every slice.
            </p>
            
            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                Subscribe Newsletter
              </h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-l-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 rounded-r-lg hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 active:scale-95">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-500 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
              Contact Info
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group hover:text-yellow-400 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>123 Pizza Street, Food City, FC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group hover:text-yellow-400 transition-colors cursor-pointer">
                <Phone className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group hover:text-yellow-400 transition-colors cursor-pointer">
                <Clock className="w-5 h-5 flex-shrink-0 group-hover:rotate-180 transition-transform duration-500" />
                <span>24/7 Delivery Service</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group hover:text-yellow-400 transition-colors cursor-pointer">
                <Mail className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>info@pizzaplanet.com</span>
              </li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
              Follow Us
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-500 rounded-full" />
            </h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  aria-label={social.label}
                  className="group relative w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-800 hover:border-yellow-500"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                  <div className="absolute inset-0 bg-yellow-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                </a>
              ))}
            </div>

            {/* App Download */}
            <div className="space-y-3 mt-8">
              <h5 className="text-white font-semibold text-sm mb-3">Download Our App</h5>
              <button className="w-full bg-gray-900 border border-gray-800 hover:border-yellow-500 rounded-lg px-4 py-2 flex items-center gap-3 transition-all hover:bg-gray-800 group">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-xl">
                  🍎
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Download on</div>
                  <div className="text-sm text-white font-semibold group-hover:text-yellow-400 transition-colors">App Store</div>
                </div>
              </button>
              <button className="w-full bg-gray-900 border border-gray-800 hover:border-yellow-500 rounded-lg px-4 py-2 flex items-center gap-3 transition-all hover:bg-gray-800 group">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-xl">
                  🤖
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Get it on</div>
                  <div className="text-sm text-white font-semibold group-hover:text-yellow-400 transition-colors">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-900 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © 2025 Pizza Planet. All rights reserved. Made with ❤️ for Tech Wave Team
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">We Accept:</span>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4].map((_, index) => (
                  <div 
                    key={index}
                    className="w-12 h-8 bg-gray-900 rounded border border-gray-800 flex items-center justify-center hover:border-yellow-500 transition-colors group cursor-pointer"
                  >
                    <CreditCard className="w-5 h-5 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Extra Links */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <span className="text-gray-800">|</span>
            <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors">Terms of Service</a>
            <span className="text-gray-800">|</span>
            <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;