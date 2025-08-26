import { useState } from 'react'
import { useQuery } from 'react-query'
import { orderService } from '../../services/orders'
import { useAuth } from '../../hooks/useAuth'
import OrderDetail from './OrderDetail'
import Loading from '../common/Loading'
import { formatPrice, formatDate, getStatusColor } from '../../utils/helpers'
import { Package, Eye, Download } from 'lucide-react'

const OrderList = ({ filters = {} }) => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useAuth()
  
  const queryParams = {
    page: currentPage,
    limit: 10,
    ...filters
  }

  const { data, isLoading, error } = useQuery(
    ['orders', queryParams],
    () => orderService.getOrders(queryParams),
    { keepPreviousData: true }
  )

  if (isLoading) return <Loading />
  if (error) return <div className="text-center text-red-600">Error loading orders</div>

  const orders = data?.data || []
  const pagination = data?.pagination || {}

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
  }

  const handleDownloadInvoice = (orderId) => {
    // Implement invoice download
    console.log('Download invoice for order:', orderId)
  }

  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Orders ({pagination.totalOrders || 0})
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                  {user?.role !== 'customer' && order.user && (
                    <p className="text-sm text-gray-600">
                      Customer: {order.user.firstName} {order.user.lastName}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {order.items?.length || 0} item(s)
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      Total: {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="btn btn-outline flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(order._id)}
                      className="btn btn-primary flex items-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              {order.items?.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item._id} className="flex items-center space-x-3">
                        <img
                          src={item.product?.images?.[0] || '/placeholder-image.jpg'}
                          alt={item.product?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product?.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="btn btn-outline disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default OrderList