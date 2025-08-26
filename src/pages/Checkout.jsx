import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../services/categories'
import ProductList from '../components/products/ProductList'
import Loading from '../components/common/Loading'

const Category = () => {
  const { slug } = useParams()
  
  const { data: category, isLoading, error } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategory(slug),
    enabled: !!slug
  })

  if (isLoading) return <Loading />
  if (error) return <div className="text-center text-red-600">Category not found</div>

  const categoryData = category?.data

  return (
    <div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{categoryData?.name}</h1>
          {categoryData?.description && (
            <p className="text-gray-600 mt-2">{categoryData.description}</p>
          )}
        </div>
      </div>
      <ProductList filters={{ category: slug }} />
    </div>
  )
}

export default Category