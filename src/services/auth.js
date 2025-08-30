import api from './api'
import Cookies from 'js-cookie'

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 })
    }
    return response.data
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 })
    }
    return response.data
  },

  async logout() {
    await api.post('/auth/logout')
    Cookies.remove('token')
  },

  async getProfile() {
    const response = await api.get('/auth/me')
    return response.data
  },

  async updateProfile(data) {
    const response = await api.put('/auth/profile', data)
    return response.data
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  async resetPassword(token, password) {
    const response = await api.put(`/auth/reset-password/${token}`, { password })
    return response.data
  },

  async refreshToken() {
    const response = await api.post('/auth/refresh-token')
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 })
    }
    return response.data
  }
}