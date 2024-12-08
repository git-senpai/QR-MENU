import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaUtensils, FaMobile, FaClock, FaStar, FaLeaf, FaShippingFast } from 'react-icons/fa';
import { motion } from 'framer-motion';
import QRModal from './common/QRModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Popular dishes data
  const popularDishes = [
    {
      name: "Classic Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "$12.99",
      rating: 4.8
    },
    {
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "$14.99",
      rating: 4.9
    },
    {
      name: "Caesar Salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "$9.99",
      rating: 4.7
    }
  ];

  // Stats data
  const stats = [
    { number: "15K+", label: "Happy Customers" },
    { number: "150+", label: "Menu Items" },
    { number: "50+", label: "Expert Chefs" },
    { number: "4.8", label: "Average Rating" }
  ];

  const features = [
    {
      icon: <FaQrcode className="h-8 w-8 text-indigo-600" />,
      title: "Scan & Order",
      description: "Simply scan the QR code at your table to view our digital menu and place your order instantly"
    },
    {
      icon: <FaUtensils className="h-8 w-8 text-indigo-600" />,
      title: "Fresh Menu",
      description: "Browse our regularly updated menu with fresh items and daily specials"
    },
    {
      icon: <FaMobile className="h-8 w-8 text-indigo-600" />,
      title: "Contactless Ordering",
      description: "Enjoy a safe and contactless dining experience with digital ordering"
    },
    {
      icon: <FaClock className="h-8 w-8 text-indigo-600" />,
      title: "Real-time Updates",
      description: "Track your order status in real-time from preparation to delivery"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "The QR menu system makes ordering so convenient! No more waiting for servers to take my order.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      content: "Love how easy it is to browse the menu and place orders. The pictures make everything look delicious!",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Food Enthusiast",
      content: "The ordering process is smooth and efficient. Great for busy lunch hours!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="bg-white custom-scrollbar">
      <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-1">
                Order Delicious Food
                <br />
                With a Simple Scan
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Experience contactless dining with our digital menu system
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-colors duration-200 relative z-10 cursor-pointer"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white"></div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple steps to order your favorite dishes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Dishes Section */}
      <motion.div 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Dishes</h2>
            <p className="mt-4 text-xl text-gray-600">Our most loved items that keep customers coming back</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDishes.map((dish, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-48">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-indigo-600">
                    {dish.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{dish.name}</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-2 text-gray-600">{dish.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="bg-indigo-600 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-indigo-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Special Features Section */}
      <motion.div 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-xl text-gray-600">Experience the best in food service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ y: -10 }}
            >
              <FaLeaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the freshest, highest quality ingredients in all our dishes</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ y: -10 }}
            >
              <FaShippingFast className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery service to your table</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ y: -10 }}
            >
              <FaStar className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Quality</h3>
              <p className="text-gray-600">Consistently high-quality food and service</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Download App Section */}
      <motion.div 
        className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Download Our Mobile App</h2>
              <p className="text-xl text-indigo-100 mb-8">Get exclusive offers and order on the go!</p>
              <div className="flex space-x-4">
                <button className="bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-900 transition-colors duration-200">
                  <span>App Store</span>
                </button>
                <button className="bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-900 transition-colors duration-200">
                  <span>Play Store</span>
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://your-mobile-app-mockup-image.png" 
                alt="Mobile App" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Browse our menu and experience the convenience of digital ordering
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}