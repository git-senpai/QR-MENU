import { create } from 'zustand'
import { api } from '../utils/api'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, ...userData } = response
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      set({ 
        user: userData,
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/auth/register', userData)
      const { token, ...user } = response
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      set({ 
        user,
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ 
      user: null, 
      isAuthenticated: false,
      error: null 
    })
  }
}))

export default useAuthStore 