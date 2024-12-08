import { create } from 'zustand'
import { api } from '../utils/api'

const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  addItem: (item) => {
    const { items } = get()
    const existingItem = items.find((i) => i._id === item._id)

    if (existingItem) {
      set({
        items: items.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] })
    }
  },

  removeItem: (itemId) => {
    const { items } = get()
    set({ items: items.filter((item) => item._id !== itemId) })
  },

  updateQuantity: (itemId, quantity) => {
    const { items } = get()
    if (quantity < 1) return

    set({
      items: items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      ),
    })
  },

  clearCart: () => {
    set({ items: [] })
  },

  placeOrder: async (orderData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/orders', orderData)
      set({ items: [], isLoading: false })
      return response
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  getTotal: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getItemCount: () => {
    const { items } = get()
    return items.reduce((count, item) => count + item.quantity, 0)
  }
}))

export default useCartStore 