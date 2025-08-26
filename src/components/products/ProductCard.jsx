import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      await addToCart({
        productId: product._id,
        quantity: 1
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <div className="relative">
          <img
            src={product.images?.[0] || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.averageRating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.numReviews || 0})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="btn btn-primary p-2"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
        
        {product.vendor && (
          <p className="text-sm text-gray-600 mt-2">
            by {product.vendor.businessName || product.vendor.name}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductCard