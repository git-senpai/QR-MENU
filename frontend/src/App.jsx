import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Menu from "./components/customer/Menu";
import Cart from "./components/customer/Cart";
import OrderConfirmation from "./components/customer/OrderConfirmation";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/admin/Dashboard";
import MenuManagement from "./components/admin/MenuManagement";
import OrdersList from "./components/admin/OrdersList";
import Statistics from "./components/admin/Statistics";
import Error from "./components/common/Error";
import useAuthStore from "./store/authStore";
import CreateItem from "./components/common/CreateItem";
import EditItem from "./components/admin/EditItem";
import Home from "./components/Home";
import ScrollToTop from "./components/common/ScrollToTop";
import UserDashboard from "./components/user/UserDashboard";

export default function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Protected Route Component
  const AdminRoute = ({ children }) => {
    if (!isAuthenticated || user?.role !== "admin") {
      return <Navigate to="/menu" replace />;
    }
    return children;
  };

  // Add UserRoute component for protecting user routes
  const UserRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                {user?.role === "admin" ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <UserDashboard />
                )}
              </UserRoute>
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <UserRoute>
                <OrderConfirmation />
              </UserRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-item"
            element={
              <AdminRoute>
                <CreateItem />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <AdminRoute>
                <MenuManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrdersList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/statistics"
            element={
              <AdminRoute>
                <Statistics />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/menu/edit/:id"
            element={
              <AdminRoute>
                <EditItem />
              </AdminRoute>
            }
          />

          {/* Error Route */}
          <Route
            path="*"
            element={<Error message="Page not found" showHome={true} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
