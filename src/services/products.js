import api from './api'

export const productService = {
  async getProducts(params = {}) {
    const response = await api.get('/products', { params })
    return response.data
  },

  async getProduct(id) {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  async getFeaturedProducts() {
    const response = await api.get('/products/featured')
    return response.data
  },

  async getTrendingProducts() {
    const response = await api.get('/products/trending')
    return response.data
  },

  async getTopRatedProducts() {
    const response = await api.get('/products/top-rated')
    return response.data
  },

  async getProductSuggestions() {
    const response = await api.get('/products/suggestions')
    return response.data
  },

  async getVendorProducts(vendorId, params = {}) {
    const response = await api.get(`/products/vendor/${vendorId}`, { params })
    return response.data
  },

  async createProduct(productData) {
    const response = await api.post('/products', productData)
    return response.data
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  async addReview(productId, reviewData) {
    const response = await api.post(`/products/${productId}/reviews`, reviewData)
    return response.data
  },

  async uploadProductImages(productId, images) {
    const formData = new FormData()
    images.forEach(image => formData.append('images', image))
    
    const response = await api.post(`/products/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
}