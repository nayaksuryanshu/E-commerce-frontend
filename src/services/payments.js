// 🔴 CREATE THIS FILE - src/services/payments.js
import api from './api'

export const paymentService = {
  async createPaymentIntent(amount, currency = 'usd') {
    const response = await api.post('/payments/create-intent', {
      amount,
      currency
    })
    return response.data
  },

  async confirmPayment(paymentData) {
    const response = await api.post('/payments/confirm', paymentData)
    return response.data
  },

  async processRefund(paymentId, amount) {
    const response = await api.post('/payments/refund', {
      paymentId,
      amount
    })
    return response.data
  }
}