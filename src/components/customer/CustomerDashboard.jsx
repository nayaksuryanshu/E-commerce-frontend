import { useState } from 'react'
// import { useQuery } from 'react-query'
import { useQuery } from '@tanstack/react-query'
import { orderService } from '../../services/orders'
import Loading from '../common/Loading'
import { Package, Calendar, DollarSign, Clock } from 'lucide-react'

const CustomerDashboard = ({ activeTab }) => {
  const [orderFilter, setOrderFilter] = useState('all')
  
  const { data: orders, isLoading } = useQuery(
    ['customer-orders', orderFilter],
    () => orderService.getOrders({ status: orderFilter === 'all' ? '' : orderFilter }),
    { enabled: activeTab === 'orders' || activeTab === 'overview' }
  )

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (activeTab === 'overview') {
    const stats = [
      {
        name: 'Total Orders',
        value: orders?.data?.length || 0,
        icon: Package,
        color: 'bg-blue-500'
      },
      {
        name: 'Total Spent',
        value: formatPrice(
          orders?.data?.reduce((total, order) => total + order.totalAmount, 0) || 0
        ),
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        name: 'Pending Orders',
        value: orders?.data?.filter(order => order.status === 'processing').length || 0,
        icon: Clock,
        color: 'bg-yellow-500'
      }
    ]

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          {isLoading ? (
            <Loading />
          ) : orders?.data?.length > 0 ? (
            <div className="space-y-4">
              {orders.data.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPrice(order.totalAmount)}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No orders yet</p>
          )}
        </div>
      </div>
    )
  }

  if (activeTab === 'orders') {
    return (
      <div className="space-y-6">
        {/* Filter */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
          <select
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <Loading />
        ) : orders?.data?.length > 0 ? (
          <div className="space-y-4">
            {orders.data.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-8)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.product?.images?.[0] || '/placeholder-image.jpg'}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">{item.product?.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                  <button className="btn btn-outline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    )
  }

  if (activeTab === 'wishlist') {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Wishlist feature coming soon!</p>
      </div>
    )
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Email Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Order updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Promotional emails</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Newsletter</span>
              </label>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Privacy Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Public profile</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Show purchase history</span>
              </label>
            </div>
          </div>
        </div>
        
        <button className="btn btn-primary">Save Settings</button>
      </div>
    )
  }

  return null
}

export default CustomerDashboard