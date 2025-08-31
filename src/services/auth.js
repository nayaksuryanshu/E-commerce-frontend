import api from './api'
import Cookies from 'js-cookie'

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    // Registration doesn't return a token - user needs to login after
    return response.data
  },

  async login(credentials) {
    console.log('AuthService: Login request with:', credentials)
    const response = await api.post('/auth/login', credentials)
    console.log('AuthService: Login response:', response.data)
    
    // Fix: Backend returns { data: { accessToken, user } }
    if (response.data?.data?.accessToken) {
      const token = response.data.data.accessToken
      console.log('AuthService: Setting token in cookies:', token.substring(0, 20) + '...')
      Cookies.set('token', token, { expires: 7 })
    } else {
      console.error('AuthService: No accessToken in response:', response.data)
    }
    
    return response.data
  },

  async logout() {
    await api.post('/auth/logout')
    Cookies.remove('token')
    console.log('AuthService: Token removed from cookies')
  },

  async getProfile() {
    console.log('AuthService: Getting profile...')
    const response = await api.get('/auth/me')
    console.log('AuthService: Profile response:', response.data)
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
    
    // Reset password returns accessToken too
    if (response.data?.data?.accessToken) {
      Cookies.set('token', response.data.data.accessToken, { expires: 7 })
    }
    return response.data
  },

  async refreshToken() {
    const response = await api.post('/auth/refresh-token')
    
    // Refresh returns new accessToken
    if (response.data?.data?.accessToken) {
      Cookies.set('token', response.data.data.accessToken, { expires: 7 })
    }
    return response.data
  }
}