import api from './api'

export const analyticsService = {
  async getDashboardStats() {
    const response = await api.get('/analytics/dashboard')
    return response.data
  },

  async getSalesAnalytics(params = {}) {
    const response = await api.get('/analytics/sales', { params })
    return response.data
  },

  async getRevenueAnalytics(params = {}) {
    const response = await api.get('/analytics/revenue', { params })
    return response.data
  },

  async getCustomerAnalytics() {
    const response = await api.get('/analytics/customers')
    return response.data
  },

  async getTopProducts() {
    const response = await api.get('/analytics/products/top')
    return response.data
  }
}