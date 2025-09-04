import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

// Updated to use environment variables properly
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-backend-production-5d11.up.railway.app'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    console.log('API Request Interceptor - Token exists:', !!token)
    console.log('API Request Interceptor - URL:', config.url)
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('API Request Interceptor - Authorization header set')
    } else {
      console.log('API Request Interceptor - No token found')
    }
    return config
  },
  (error) => {
    console.error('API Request Interceptor Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.config.url, response.status)
    return response
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message,
      token: !!Cookies.get('token')
    })

    if (error.response?.status === 401) {
      console.log('401 Unauthorized - Removing token and redirecting to login')
      Cookies.remove('token')
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        toast.error('Session expired. Please login again.')
        window.location.href = '/login'
      }
    } else if (error.response?.status === 403) {
      console.log('403 Forbidden - Access denied')
      toast.error('Access denied. Please check your permissions.')
    } else if (error.response?.status >= 500) {
      console.log('Server error:', error.response.status)
      toast.error('Server error. Please try again later.')
    } else if (error.response?.status === 404) {
      console.log('404 Not Found:', error.config?.url)
      toast.error('Resource not found.')
    }
    return Promise.reject(error)
  }
)

export default api