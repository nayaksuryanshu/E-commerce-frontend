import { useSearchParams } from 'react-router-dom'
import ProductList from '../components/products/ProductList'

const Products = () => {
  const [searchParams] = useSearchParams()
  
  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '',
    featured: searchParams.get('featured') || '',
    trending: searchParams.get('trending') || ''
  }

  return (
    <div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          {filters.search && (
            <p className="text-gray-600 mt-2">
              Search results for "{filters.search}"
            </p>
          )}
        </div>
      </div>
      <ProductList filters={filters} />
    </div>
  )
}

export default Products