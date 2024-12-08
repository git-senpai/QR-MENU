import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useMenuStore from "../../store/menuStore";
import useOrderStore from "../../store/orderStore";
import {
  FiGrid,
  FiList,
  FiPieChart,
  FiUser,
  FiMail,
  FiCalendar,
  FiShield,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import Loading from "../common/Loading";
import Error from "../common/Error";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function Dashboard() {
  const { user } = useAuthStore();
  const {
    items,
    fetchMenu,
    deleteItem,
    isLoading: menuLoading,
    error: menuError,
  } = useMenuStore();

  const {
    orders,
    fetchOrders,
    updateOrderStatus,
    isLoading: orderLoading,
    error: orderError,
  } = useOrderStore();

  const [activeTab, setActiveTab] = useState("menu");

  // Fetch data when component mounts
  useEffect(() => {
    if (user?.role === "admin") {
      fetchMenu();
      fetchOrders();
    }
  }, [user, fetchMenu, fetchOrders]);

  if (!user?.role === "admin") {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  // Calculate statistics
  const totalRevenue =
    orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const totalOrders = orders?.length || 0;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const pendingOrders =
    orders?.filter((order) => order.status === "pending").length || 0;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      // Refresh menu items after deletion
      fetchMenu();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (menuLoading || orderLoading) return <Loading />;
  if (menuError || orderError)
    return <Error message={menuError || orderError} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-indigo-100">
          Manage your restaurant operations from here
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100">
              <FiUser className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FiMail className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <FiCalendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Joined</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FiShield className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-lg font-semibold text-gray-900">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "menu"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Menu Management
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "orders"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("statistics")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "statistics"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Statistics
        </button>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Menu Management Section */}
        {activeTab === "menu" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
              <Link
                to="/admin/create-item"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add New Item
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/admin/menu/edit/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <FiEdit2 className="inline-block h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="inline-block h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
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
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`text-sm rounded-full px-3 py-1 font-semibold ${
                            STATUS_COLORS[order.status]
                          }`}
                        >
                          {[
                            "pending",
                            "preparing",
                            "ready",
                            "delivered",
                            "cancelled",
                          ].map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
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

        {/* Statistics Section */}
        {activeTab === "statistics" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-100">
                    <FiList className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Orders
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {totalOrders}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <FiPieChart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${totalRevenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <FiGrid className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Average Order
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${averageOrderValue.toFixed(2)}
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
                    <p className="text-sm font-medium text-gray-500">
                      Pending Orders
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {pendingOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
