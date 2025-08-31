import { createContext, useReducer, useEffect, useContext } from 'react'
import { cartService } from '../services/cart'
import { AuthContext } from './AuthContext'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext()

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                items: action.payload.items || [],
                total: action.payload.total || 0,
                itemCount: action.payload.itemCount || 0,
                isLoading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
                itemCount: state.itemCount + action.payload.quantity
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.product._id === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.product._id !== action.payload),
                itemCount: state.itemCount - 1
            }
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0,
                isLoading: false
            }
        default:
            return state
    }
}

const initialState = {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const { isAuthenticated, logout } = useContext(AuthContext)

    // Load cart when user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadCart()
        } else {
            dispatch({ type: 'CLEAR_CART' })
        }
    }, [isAuthenticated])

    const loadCart = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            const response = await cartService.getCart()
            dispatch({ type: 'SET_CART', payload: response.data })
        } catch (error) {
            console.error('Error loading cart:', error)
            
            // Handle specific 403 "User is not active" error
            if (error.response?.status === 403) {
                const errorMessage = error.response?.data?.message
                
                if (errorMessage === 'User is not active') {
                    toast.error('Your account is not active. Please verify your email or contact support.')
                    
                    // Clear the auth token since user is inactive
                    Cookies.remove('token')
                    
                    // Trigger logout to clear auth state
                    if (logout) {
                        logout()
                    }
                    
                    // Redirect to login page
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 2000)
                } else {
                    toast.error('Access denied. Please check your permissions.')
                }
            } else {
                toast.error('Failed to load cart')
            }
            
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }

    const addToCart = async (productData) => {
        try {
            await cartService.addToCart(productData)
            await loadCart()
            toast.success('Product added to cart')
        } catch (error) {
            if (error.response?.status === 403 && 
                error.response?.data?.message === 'User is not active') {
                toast.error('Account not active. Cannot add items to cart.')
                return
            }
            toast.error(error.response?.data?.message || 'Failed to add to cart')
        }
    }

    const updateCartItem = async (productId, quantity) => {
        try {
            await cartService.updateCartItem({ productId, quantity })
        } catch (error) {
            if (error.response?.status === 403 && 
                error.response?.data?.message === 'User is not active') {
                toast.error('Account not active. Cannot update cart.')
                return
            }
            toast.error('Failed to update cart item')
        }
    }

    const removeFromCart = async (productId) => {
        try {
            await cartService.removeFromCart(productId)
            dispatch({ type: 'REMOVE_ITEM', payload: productId })
        } catch (error) {
            if (error.response?.status === 403 && 
                error.response?.data?.message === 'User is not active') {
                toast.error('Account not active. Cannot remove items.')
                return
            }
            toast.error('Failed to remove item')
        }
    }

    const clearCart = async () => {
        try {
            await cartService.clearCart()
            dispatch({ type: 'CLEAR_CART' })
        } catch (error) {
            if (error.response?.status === 403 && 
                error.response?.data?.message === 'User is not active') {
                toast.error('Account not active. Cannot clear cart.')
                return
            }
            toast.error('Failed to clear cart')
        }
    }

    const value = {
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        loadCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}