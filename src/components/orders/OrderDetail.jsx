import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { orderService } from '../../services/orders'
import { useAuth } from '../../hooks/useAuth'
import { formatPrice, formatDate, getStatusColor } from '../../utils/helpers'
import toast from 'react-hot-toast'
import { ArrowLeft, MapPin, CreditCard, Package, Truck } from 'lucide-react'

const OrderDetail = ({ order, onBack }) => {
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const updateStatusMutation = useMutation(
    ({ orderId, status }) => orderService.updateOrderStatus(orderId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders')
        toast.success('Order status updated successfully!')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update order status')
      },
      onSettled: () => {
        setUpdatingStatus(false)
      }
    }
  )

  const cancelOrderMutation = useMutation(orderService.cancelOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders')
      toast.success('Order cancelled successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to cancel order')
    }
  })

  const handleStatusUpdate = async (newStatus) => {
    setUpdatingStatus(true)
    updateStatusMutation.mutate({ orderId: order._id, status: newStatus })
  }

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrderMutation.mutate(order._id)
    }
  }

  const canUpdateStatus = user?.role === 'vendor' || user?.role === 'admin'
  const canCancelOrder = order.status === 'pending' || order.status === 'processing'

  const statusOptions = [
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' }
  ]

  const getOrderTimeline = () => {
    const timeline = [
      {
        status: 'pending',
        label: 'Order Placed',
        date: order.createdAt,
        completed: true
      },
      {
        status: 'processing',
        label: 'Processing',
        date: order.updatedAt,
        completed: ['processing', 'shipped', 'delivered'].includes(order.status)
      },
      {
        status: 'shipped',
        label: 'Shipped',
        date: order.shippedAt,
        completed: ['shipped', 'delivered'].includes(order.status)
      },
      {
        status: 'delivered',
        label: 'Delivered',
        date: order.deliveredAt,
        completed: order.status === 'delivered'
      }
    ]

    return timeline
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="btn btn-outline flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Orders</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order #{order._id.slice(-8)}
            </h1>
            <p className="text-gray-600">
              Placed on {formatDate(order.createdAt, { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          {canUpdateStatus && (
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={updatingStatus}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="space-y-4">
              {getOrderTimeline().map((step, index) => (
                <div key={step.status} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-medium ${
                      step.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </p>
                    {step.date && step.completed && (
                      <p className="text-sm text-gray-600">
                        {formatDate(step.date)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <img
                    src={item.product?.images?.[0] || '/placeholder-image.jpg'}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{item.product?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.product?.vendor?.businessName || item.product?.vendor?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatPrice(order.shippingCost || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(order.taxAmount || 0)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </h2>
            <div className="text-gray-700">
              <p className="capitalize">Payment Method: {order.paymentMethod}</p>
              <p className={`text-sm ${
                order.paymentStatus === 'paid' 
                  ? 'text-green-600' 
                  : order.paymentStatus === 'failed'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}>
                Status: {order.paymentStatus || 'pending'}
              </p>
            </div>
          </div>

          {/* Actions */}
          {(user?.role === 'customer' && canCancelOrder) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <button
                onClick={handleCancelOrder}
                disabled={cancelOrderMutation.isLoading}
                className="btn bg-red-600 text-white hover:bg-red-700 w-full"
              >
                {cancelOrderMutation.isLoading ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetail