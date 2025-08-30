// 🔴 CREATE THIS FILE - src/services/users.js
import api from './api'

export const userService = {
  async getProfile() {
    const response = await api.get('/users/profile')
    return response.data
  },

  async updateProfile(data) {
    const response = await api.put('/users/profile', data)
    return response.data
  },

  async updatePassword(data) {
    const response = await api.put('/users/password', data)
    return response.data
  },

  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  // Address management
  async addAddress(address) {
    const response = await api.post('/users/addresses', address)
    return response.data
  },

  async updateAddress(addressId, address) {
    const response = await api.put(`/users/addresses/${addressId}`, address)
    return response.data
  },

  async deleteAddress(addressId) {
    const response = await api.delete(`/users/addresses/${addressId}`)
    return response.data
  },

  // Wishlist
  async getWishlist() {
    const response = await api.get('/users/wishlist')
    return response.data
  },

  async addToWishlist(productId) {
    const response = await api.post(`/users/wishlist/${productId}`)
    return response.data
  },

  async removeFromWishlist(productId) {
    const response = await api.delete(`/users/wishlist/${productId}`)
    return response.data
  }
}