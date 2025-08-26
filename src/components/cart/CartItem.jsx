import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { Plus, Minus, Trash2 } from 'lucide-react'

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return
    
    setIsUpdating(true)
    try {
      await updateCartItem(item.product._id, newQuantity)
    } catch (error) {
      console.error('Error updating quantity:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    try {
      await removeFromCart(item.product._id)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
        <img
          src={item.product.images?.[0] || '/placeholder-image.jpg'}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow">
        <Link
          to={`/products/${item.product._id}`}
          className="text-lg font-medium text-gray-900 hover:text-primary-600"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-gray-600">
          {item.product.vendor?.businessName || item.product.vendor?.name}
        </p>
        <p className="text-lg font-semibold text-gray-900">
          {formatPrice(item.product.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="w-12 text-center font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating || item.quantity >= item.product.stock}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-lg font-semibold text-gray-900 w-24 text-right">
        {formatPrice(item.product.price * item.quantity)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-red-600 hover:bg-red-50 rounded"
        title="Remove item"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  )
}

export default CartItem