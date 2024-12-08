import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaUtensils, FaMobile, FaClock } from 'react-icons/fa';
import QRModal from './common/QRModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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