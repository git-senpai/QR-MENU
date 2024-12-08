import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/authStore";
import useOrderStore from "../../store/orderStore";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiClock, FiDollarSign, FiList } from "react-icons/fi";
import Loading from "../common/Loading";
import Error from "../common/Error";

export default function UserDashboard() {
  const { user } = useAuthStore();
  const { orders, fetchOrders, isLoading, error } = useOrderStore();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Calculate user statistics
  const userStats = {
    totalOrders: orders?.length || 0,
    pendingOrders:
      orders?.filter((order) => order.status === "pending").length || 0,
    totalSpent: orders?.reduce((sum, order) => sum + order.total, 0) || 0,
    lastOrder: orders?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0],
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-indigo-100">View your orders and account details</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100">
              <FiShoppingBag className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FiClock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Pending Orders
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.pendingOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FiDollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${userStats.totalSpent.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <FiList className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Order</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.lastOrder
                  ? new Date(userStats.lastOrder.createdAt).toLocaleDateString()
                  : "No orders"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "orders"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Your Orders
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "profile"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Profile
        </button>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Orders Section */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.items.map((item, index) => (
                          <div key={index}>
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${Number(order.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }
                          ${
                            order.status === "preparing"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }
                          ${
                            order.status === "ready"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            order.status === "delivered"
                              ? "bg-gray-100 text-gray-800"
                              : ""
                          }
                          ${
                            order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : ""
                          }
                        `}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Account Created
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          to="/menu"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <h3 className="text-lg font-semibold mb-2">Browse Menu</h3>
          <p className="text-gray-600">Explore our delicious offerings</p>
        </Link>

        <Link
          to="/cart"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <h3 className="text-lg font-semibold mb-2">Shopping Cart</h3>
          <p className="text-gray-600">View your current cart</p>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-600">Contact our support team</p>
        </div>
      </div>
    </div>
  );
}
