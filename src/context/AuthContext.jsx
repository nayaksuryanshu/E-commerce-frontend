import { createContext, useReducer, useEffect } from 'react'
import { authService } from '../services/auth'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

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
    case 'USER_INACTIVE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: action.payload.user,
        error: 'Your account is inactive. Please contact support to activate your account.'
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'AUTH_CHECK_COMPLETE':
      return {
        ...state,
        isLoading: false
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
      console.log('AuthContext: Checking auth on mount, token exists:', !!token)
      
      if (token) {
        try {
          console.log('AuthContext: Attempting to get profile...')
          const response = await authService.getProfile()
          console.log('AuthContext: Profile response:', response)
          
          // Handle different response structures
          let user = null
          if (response.data?.user) {
            user = response.data.user
          } else if (response.data && typeof response.data === 'object') {
            user = response.data
          } else if (response.user) {
            user = response.user
          }
          
          if (user && user.id) {
            console.log('AuthContext: Successfully extracted user:', user)
            
            // Check if user is active
            if (user.isActive === false || user.active === false) {
              console.log('AuthContext: User account is inactive')
              dispatch({ 
                type: 'USER_INACTIVE', 
                payload: { user }
              })
              toast.error('Your account is inactive. Please contact support.')
              return
            }
            
            dispatch({ type: 'LOGIN_SUCCESS', payload: user })
          } else {
            console.error('AuthContext: Invalid user data structure:', response)
            throw new Error('Invalid user data received')
          }
        } catch (error) {
          console.error('AuthContext: Auth check failed:', error)
          
          // Handle specific error messages
          if (error.response?.data?.message === 'User is not active') {
            console.log('AuthContext: User is not active')
            dispatch({ 
              type: 'USER_INACTIVE', 
              payload: { user: null }
            })
            toast.error('Your account is inactive. Please contact support to activate your account.')
            return
          }
          
          // Only remove token and show error for certain error types
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('AuthContext: Removing invalid token')
            Cookies.remove('token')
            toast.error('Session expired. Please login again.')
          } else {
            console.log('AuthContext: Network or server error, keeping token')
            toast.error('Unable to verify session. Please check your connection.')
          }
          
          dispatch({ type: 'LOGIN_FAILURE', payload: error.message || 'Session verification failed' })
        }
      } else {
        console.log('AuthContext: No token found, user not authenticated')
        dispatch({ type: 'AUTH_CHECK_COMPLETE' })
      }
    }
    
    checkAuth()
  }, [])

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      console.log('AuthContext: Starting login...')
      const response = await authService.login(credentials)
      console.log('AuthContext: Login response:', response)
      
      // Handle different response structures
      let user = null
      if (response.data?.user) {
        user = response.data.user
      } else if (response.data && typeof response.data === 'object') {
        user = response.data
      } else if (response.user) {
        user = response.user
      }
      
      if (user && user.id) {
        console.log('AuthContext: Login successful, extracted user:', user)
        
        // Check if user is active
        if (user.isAccountActive === false) {
          console.log('AuthContext: User account is inactive during login')
          dispatch({ 
            type: 'USER_INACTIVE', 
            payload: { user }
          })
          toast.error('Your account is inactive. Please contact support.')
          throw new Error('Account is inactive')
        }
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        toast.success('Login successful!')
      } else {
        console.error('AuthContext: Invalid login response structure:', response)
        throw new Error('Invalid login response')
      }
      
      return response
    } catch (error) {
      console.error('AuthContext: Login error:', error)
      
      // Handle specific error messages
      if (error.response?.data?.message === 'User is not active') {
        const message = 'Your account is inactive. Please contact support to activate your account.'
        dispatch({ type: 'USER_INACTIVE', payload: { user: null } })
        toast.error(message)
        throw new Error(message)
      }
      
      const message = error.response?.data?.message || error.message || 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      console.log('AuthContext: Starting registration...')
      const response = await authService.register(userData)
      console.log('AuthContext: Registration response:', response)
      
      // Reset loading state after registration
      dispatch({ type: 'AUTH_CHECK_COMPLETE' })
      toast.success('Registration successful! Please check your email to activate your account, then login.')
      
      return response
    } catch (error) {
      console.error('AuthContext: Registration error:', error)
      const message = error.response?.data?.message || error.message || 'Registration failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      toast.error(message)
      throw error
    }
  }

  const logout = async () => {
    try {
      console.log('AuthContext: Starting logout...')
      await authService.logout()
    } catch (error) {
      console.error('AuthContext: Logout error:', error)
      // Continue with logout even if API call fails
    } finally {
      console.log('AuthContext: Clearing auth state and token')
      Cookies.remove('token')
      dispatch({ type: 'LOGOUT' })
      toast.success('Logged out successfully')
    }
  }

  const updateUser = (userData) => {
    console.log('AuthContext: Updating user data:', userData)
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