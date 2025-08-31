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
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      await addToCart({
        productId: product._id,
        quantity: 1
      })
      toast.success('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add product to cart')
    }
  }

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '$0.00'
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Safely get the main image URL
  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      // Handle both object format {url: "..."} and string format
      const mainImage = product.images.find(img => img.isMain) || product.images[0]
      return typeof mainImage === 'string' ? mainImage : mainImage?.url
    }
    return '/placeholder-image.jpg'
  }

  // Check if product is in stock
  const isInStock = () => {
    if (!product.trackQuantity) return true
    return product.stock > 0 || product.allowBackorder
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl()}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg'
            }}
          />
          
          {/* Stock status overlay */}
          {!isInStock() && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          )}
          
          {/* Featured badge */}
          {product.isFeatured && (
            <div className="absolute top-2 left-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}
          
          {/* Discount badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">by {product.brand}</p>
        )}
        
        {/* Rating */}
        <div className="flex items-center mb-3">
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
            {product.averageRating ? product.averageRating.toFixed(1) : '0.0'}
          </span>
          <span className="text-sm text-gray-500 ml-1">
            ({product.numReviews || 0})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        {/* Stock info */}
        {product.trackQuantity && (
          <div className="mb-3">
            {product.stock <= 10 && product.stock > 0 && (
              <span className="text-xs text-orange-600 font-medium">
                Only {product.stock} left in stock
              </span>
            )}
          </div>
        )}
        
        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock()}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors ${
            isInStock()
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{isInStock() ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
        
        {/* Vendor info */}
        {product.vendor && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Sold by {product.vendor.businessName || `${product.vendor.firstName} ${product.vendor.lastName}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductCard