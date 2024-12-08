import { create } from 'zustand';

const API_URL =
  import.meta.env.VITE_API_URL || "https://qr-menu-hp3b.onrender.com/api";

const useOrderStore = create((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      const formattedOrders = data.map(order => ({
        ...order,
        orderId: order.orderId || `ORD-${order._id.slice(-6)}`,
        customer: order.user?.name || 'Guest Customer',
        items: order.items.map(item => ({
          ...item,
          name: item.name || 'Unknown Item',
          quantity: item.quantity || 1
        })),
        total: order.total || order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: order.status || 'pending',
        createdAt: order.createdAt || new Date().toISOString()
      }));

      set({ orders: formattedOrders, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      set(state => ({
        orders: state.orders.map(order => 
          order._id === orderId 
            ? {
                ...updatedOrder,
                orderId: updatedOrder.orderId || `ORD-${updatedOrder._id.slice(-6)}`,
                customer: updatedOrder.user?.name || 'Guest Customer'
              }
            : order
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  addOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const newOrder = await response.json();
      set(state => ({
        orders: [...state.orders, {
          ...newOrder,
          orderId: newOrder.orderId || `ORD-${newOrder._id.slice(-6)}`,
          customer: newOrder.user?.name || 'Guest Customer'
        }],
        isLoading: false
      }));
      return newOrder;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  }
}));

export default useOrderStore; 