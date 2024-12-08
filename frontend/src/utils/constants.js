export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash'
}

export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer'
}

export const MENU_CATEGORIES = {
  ALL: 'All',
  APPETIZERS: 'Appetizers',
  MAIN_COURSE: 'Main Course',
  DESSERTS: 'Desserts',
  BEVERAGES: 'Beverages'
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout'
  },
  MENU: {
    BASE: '/menu',
    CATEGORIES: '/menu/categories'
  },
  ORDERS: {
    BASE: '/orders',
    STATUS: '/orders/status'
  },
  USER: {
    PROFILE: '/user/profile',
    ORDERS: '/user/orders'
  }
} 