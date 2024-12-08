import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import Loading from '../common/Loading';
import Error from '../common/Error';
import Confetti from 'react-confetti';
import { FaCheck, FaReceipt, FaUtensils, FaArrowLeft } from 'react-icons/fa';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get('orderId');
    if (!orderId) {
      navigate('/menu');
      return;
    }

    const fetchOrder = async () => {
      try {
        const data = await api.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [location, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!order) return <Error message="Order not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={false}
        numberOfPieces={200}
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaCheck className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your order, {order.customerName}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <FaReceipt className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Order Details</h2>
            </div>
            <div className="space-y-3 text-lg">
              <p className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{order._id.slice(-6)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">{order.status}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Table Number:</span>
                <span className="font-medium">{order.tableNumber || 'N/A'}</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaUtensils className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-2xl font-semibold text-gray-900">Items Ordered</h3>
            </div>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span className="text-lg font-semibold text-indigo-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/menu')}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" /> Back to Menu
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
