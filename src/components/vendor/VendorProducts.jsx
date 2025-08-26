import { useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useQuery ,useMutation,useQueryClient} from '@tanstack/react-query'
import { productService } from '../../services/products'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import Loading from '../common/Loading'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Package, X } from 'lucide-react'

const VendorProducts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { user } = useAuth()
  const queryClient = useQueryClient()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { data: products, isLoading } = useQuery(
    ['vendor-products', user?._id],
    () => productService.getVendorProducts(user._id),
    { enabled: !!user?._id }
  )

  const createProductMutation = useMutation(productService.createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['vendor-products', user._id])
      toast.success('Product created successfully!')
      setShowCreateModal(false)
      reset()
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create product')
    }
  })

  const updateProductMutation = useMutation(
    ({ id, data }) => productService.updateProduct(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['vendor-products', user._id])
        toast.success('Product updated successfully!')
        setEditingProduct(null)
        reset()
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update product')
      }
    }
  )

  const deleteProductMutation = useMutation(productService.deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['vendor-products', user._id])
      toast.success('Product deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete product')
    }
  })

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      vendor: user._id
    }

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct._id, data: productData })
    } else {
      createProductMutation.mutate(productData)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category?._id,
      brand: product.brand,
      sku: product.sku
    })
    setShowCreateModal(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(productId)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (isLoading) return <Loading />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">My Products</h3>
        <button
          onClick={() => {
            setEditingProduct(null)
            reset()
            setShowCreateModal(true)
          }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Grid */}
      {products?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.data.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.images?.[0] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-outline flex-1 flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No products yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            Create Your First Product
          </button>
        </div>
      )}

      {/* Create/Edit Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Create Product'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingProduct(null)
                  reset()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  {...register('name', { required: 'Product name is required' })}
                  className="input"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className="input"
                  rows={3}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    type="number"
                    step="0.01"
                    className="input"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    {...register('stock', {
                      required: 'Stock is required',
                      min: { value: 0, message: 'Stock must be positive' }
                    })}
                    type="number"
                    className="input"
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  {...register('brand')}
                  className="input"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  {...register('sku')}
                  className="input"
                  placeholder="Enter SKU"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingProduct(null)
                    reset()
                  }}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isLoading || updateProductMutation.isLoading}
                  className="btn btn-primary flex-1"
                >
                  {createProductMutation.isLoading || updateProductMutation.isLoading
                    ? 'Saving...'
                    : editingProduct
                    ? 'Update'
                    : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VendorProducts