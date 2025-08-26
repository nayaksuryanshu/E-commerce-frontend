import { createContext, useReducer, useEffect } from 'react'
import { authService } from '../services/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token')
      if (token) {
        try {
          const response = await authService.getProfile()
          dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
        } catch {
          Cookies.remove('token')
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Session expired' })
        }
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: null })
      }
    }
    checkAuth()
  }, [])

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await authService.login(credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      return response
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      throw error
    }
  }

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await authService.register(userData)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      return response
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch({ type: 'LOGOUT' })
    }
  }

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }