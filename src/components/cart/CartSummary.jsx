import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const CartSummary = ({ items }) => {
  const { clearCart } = useCart()

  const subtotal = items.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)

  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {subtotal >= 100 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <p className="text-sm text-green-800">
            🎉 Congratulations! You qualify for free shipping!
          </p>
        </div>
      )}

      <div className="space-y-3">
        <Link
          to="/checkout"
          className="btn btn-primary w-full text-center block"
        >
          Proceed to Checkout
        </Link>
        
        <Link
          to="/products"
          className="btn btn-outline w-full text-center block"
        >
          Continue Shopping
        </Link>
        
        <button
          onClick={handleClearCart}
          className="w-full text-sm text-red-600 hover:text-red-700 mt-4"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}

export default CartSummary