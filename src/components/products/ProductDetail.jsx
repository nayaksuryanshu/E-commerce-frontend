import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import Loading from '../common/Loading'
import { Star, Plus, Minus, ShoppingCart, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  const { data: product, isLoading, error } = useProduct(id)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  if (isLoading) return <Loading />
  if (error) return <div className="text-center text-red-600">Product not found</div>

  const productData = product?.data

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      await addToCart({
        productId: productData._id,
        quantity
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={productData?.images?.[selectedImage] || '/placeholder-image.jpg'}
              alt={productData?.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          {productData?.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{productData?.name}</h1>
            <p className="text-lg text-gray-600 mt-2">
              by {productData?.vendor?.businessName || productData?.vendor?.name}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(productData?.averageRating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {productData?.averageRating?.toFixed(1)} ({productData?.numReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(productData?.price)}
            </span>
            {productData?.originalPrice && productData.originalPrice > productData.price && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(productData.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{productData?.description}</p>
          </div>

          {/* Stock Status */}
          <div>
            {productData?.stock > 0 ? (
              <span className="text-green-600 font-medium">
                {productData.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of stock</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(productData?.stock || 1, quantity + 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={productData?.stock <= 0}
              className="btn btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            
            <button className="btn btn-outline p-3">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <dl className="space-y-2">
              {productData?.brand && (
                <div className="flex">
                  <dt className="text-gray-600 w-1/3">Brand:</dt>
                  <dd className="text-gray-900">{productData.brand}</dd>
                </div>
              )}
              {productData?.category && (
                <div className="flex">
                  <dt className="text-gray-600 w-1/3">Category:</dt>
                  <dd className="text-gray-900">{productData.category.name}</dd>
                </div>
              )}
              {productData?.sku && (
                <div className="flex">
                  <dt className="text-gray-600 w-1/3">SKU:</dt>
                  <dd className="text-gray-900">{productData.sku}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
        
        {productData?.reviews?.length > 0 ? (
          <div className="space-y-6">
            {productData.reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.user.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  )
}

export default ProductDetail