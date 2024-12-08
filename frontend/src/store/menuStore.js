import { create } from 'zustand'

const API_URL =
  import.meta.env.VITE_API_URL || "https://qr-menu-hp3b.onrender.com/api";

const useMenuStore = create((set, get) => ({
  items: [],
  categories: [],
  selectedCategory: 'All',
  isLoading: false,
  error: null,

  fetchMenu: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_URL}/menu`)
      if (!response.ok) throw new Error('Failed to fetch menu')
      const data = await response.json()
      
      const categories = ['All', ...new Set(data.map(item => item.category))]
      set({ items: data, categories, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  addItem: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData // FormData for file upload
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      
      const data = await response.json()
      set(state => ({
        items: [...state.items, data],
        categories: ['All', ...new Set([...state.items, data].map(item => item.category))],
        isLoading: false
      }))
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  updateItem: async (id, formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData // FormData for file upload
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      const data = await response.json()
      set(state => ({
        items: state.items.map(item => item._id === id ? data : item),
        categories: ['All', ...new Set(state.items.map(item => item.category))],
        isLoading: false
      }))
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  deleteItem: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      set(state => ({
        items: state.items.filter(item => item._id !== id),
        isLoading: false
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
  },

  getFilteredItems: () => {
    const { items, selectedCategory } = get()
    return selectedCategory === 'All'
      ? items
      : items.filter(item => item.category === selectedCategory)
  }
}))

export default useMenuStore 