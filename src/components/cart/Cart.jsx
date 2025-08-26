import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Loading from '../common/Loading'
import { ShoppingBag } from 'lucide-react'

const Cart = () => {
  const { items, isLoading } = useCart()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your cart</h2>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    )
  }

  if (isLoading) return <Loading />

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Cart Items ({items.length})
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary items={items} />
        </div>
      </div>
    </div>
  )
}

export default Cart