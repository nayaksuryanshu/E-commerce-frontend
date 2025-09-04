// components/products/ProductList.jsx
import { useState, useEffect } from 'react'
import { 
  getFeaturedProducts, 
  getTrendingProducts, 
  getAllProducts 
} from '../../utils/dummyData'

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true)
      
      let result
      
      // Check for specific product types first
      if (filters.featured === 'true') {
        result = getFeaturedProducts()
      } else if (filters.trending === 'true') {
        result = getTrendingProducts()
      } else {
        // Use getAllProducts with filters
        const filterParams = {}
        
        if (filters.search) filterParams.search = filters.search
        if (filters.category) filterParams.category = filters.category
        if (filters.minPrice) filterParams.minPrice = parseFloat(filters.minPrice)
        if (filters.maxPrice) filterParams.maxPrice = parseFloat(filters.maxPrice)
        
        result = getAllProducts(filterParams)
      }
      
      let productData = result.data
      
      // Apply sorting
      if (filters.sort) {
        switch (filters.sort) {
          case 'price-low':
            productData = [...productData].sort((a, b) => a.price - b.price)
            break
          case 'price-high':
            productData = [...productData].sort((a, b) => b.price - a.price)
            break
          case 'rating':
            productData = [...productData].sort((a, b) => b.averageRating - a.averageRating)
            break
          case 'newest':
            productData = [...productData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            break
          case 'popular':
            productData = [...productData].sort((a, b) => b.purchases - a.purchases)
            break
          default:
            break
        }
      }
      
      setProducts(productData)
      setLoading(false)
    }

    fetchProducts()
  }, [filters])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
          {filters.search && ` for "${filters.search}"`}
          {filters.category && ` in ${filters.category}`}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Product Card Component
const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>)
    }
    
    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 h-12 overflow-hidden">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 h-10 overflow-hidden">
          {product.description.length > 60 
            ? `${product.description.substring(0, 60)}...` 
            : product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.averageRating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.numReviews})
          </span>
        </div>
        
        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          
          {/* Stock Status */}
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.stock > 50 
              ? 'bg-green-100 text-green-800' 
              : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 50 ? 'In Stock' : 
             product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
          </span>
        </div>
        
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>
        
        {/* Add to Cart Button */}
        <button 
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            product.stock > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={product.stock === 0}
          onClick={() => {
            // Add your cart logic here
            console.log('Added to cart:', product.name)
          }}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductList