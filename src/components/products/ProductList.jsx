import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'
import Loading from '../common/Loading'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductList = ({ filters = {} }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [appliedFilters, setAppliedFilters] = useState(filters)
  
  const queryParams = {
    page: currentPage,
    limit: 12,
    ...appliedFilters
  }
  
  const { data, isLoading, error } = useProducts(queryParams)

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) return <Loading />
  if (error) return <div className="text-center text-red-600">Error loading products</div>

  const products = data?.data || []
  const pagination = data?.pagination || {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Products ({pagination.totalProducts || 0})
            </h2>
            
            <select
              onChange={(e) => handleFilterChange({ ...appliedFilters, sort: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Sort by</option>
              <option value="name">Name A-Z</option>
              <option value="-name">Name Z-A</option>
              <option value="price">Price Low to High</option>
              <option value="-price">Price High to Low</option>
              <option value="-averageRating">Highest Rated</option>
              <option value="-createdAt">Newest First</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn ${
                            currentPage === page ? 'btn-primary' : 'btn-secondary'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    }
                    return null
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList