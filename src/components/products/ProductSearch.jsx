import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { productService } from '../../services/products'
import { debounce } from '../../utils/helpers'
import { Search, X } from 'lucide-react'

const ProductSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const navigate = useNavigate()

  // Debounce search query
  const debouncedSetQuery = debounce((value) => {
    setDebouncedQuery(value)
  }, 300)

  useEffect(() => {
    debouncedSetQuery(query)
  }, [query])

  const { data: searchResults, isLoading } = useQuery(
    ['product-search', debouncedQuery],
    () => productService.getProducts({ search: debouncedQuery, limit: 5 }),
    {
      enabled: debouncedQuery.length > 2,
      staleTime: 30000
    }
  )

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
    onClose()
    setQuery('')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`)
      onClose()
      setQuery('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <form onSubmit={handleSearchSubmit} className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="max-h-96 overflow-y-auto">
          {isLoading && debouncedQuery && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          )}

          {searchResults?.data?.length > 0 && (
            <div className="py-2">
              <p className="px-4 py-2 text-sm text-gray-500 font-medium">Products</p>
              {searchResults.data.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 text-left"
                >
                  <img
                    src={product.images?.[0] || '/placeholder-image.jpg'}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      ${product.price} • {product.vendor?.businessName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {debouncedQuery && !isLoading && (!searchResults?.data || searchResults.data.length === 0) && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found for "{debouncedQuery}"</p>
              <button
                onClick={handleSearchSubmit}
                className="mt-2 text-primary-600 hover:text-primary-700"
              >
                Search for "{debouncedQuery}" in all products
              </button>
            </div>
          )}

          {!debouncedQuery && (
            <div className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Start typing to search for products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductSearch