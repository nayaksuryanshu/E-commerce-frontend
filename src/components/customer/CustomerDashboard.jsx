import { useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { orderService } from '../../services/orders'
import { AuthContext } from '../../context/AuthContext'
import Loading from '../common/Loading'
import { Package, Calendar, DollarSign, Clock, AlertCircle, Mail } from 'lucide-react'
import Cookies from 'js-cookie'

const CustomerDashboard = ({ activeTab }) => {
  const [orderFilter, setOrderFilter] = useState('all')
  const { isAuthenticated, user, isLoading: authLoading, error: authError } = useContext(AuthContext)
  
const { data: orders, isLoading, error } = useQuery({
  queryKey: ['customer-orders', orderFilter],
  queryFn: () => orderService.getOrders({ status: orderFilter === 'all' ? '' : orderFilter }),
  enabled: (activeTab === 'orders' || activeTab === 'overview') && isAuthenticated && !authLoading,
  retry: 1,
  onError: (error) => {
    console.error('Error fetching orders:', error)
  }
})

  // Show loading while auth is being checked
  if (authLoading) {
    return <Loading />
  }

  // Handle inactive user account
  if (authError && authError.includes('inactive')) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg border border-red-200 shadow-sm">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Inactive</h2>
          <p className="text-gray-600 mb-6">
            Your account is currently inactive. Please contact our support team to activate your account.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              <span>Support: support@yourcompany.com</span>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Contact Support
              </button>
              <button 
                onClick={() => {
                  Cookies.remove('token')
                  window.location.href = '/login'
                }}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Login Different Account
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Please login to view your dashboard</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    )
  }

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '$0.00'
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid Date'
    }
  }

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800'
    
    switch (status.toLowerCase()) {
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

  // Helper function to safely check account status
  const isAccountActive = () => {
    if (!user) return false
    // Check multiple possible field names for account status
    return user.isActive !== false && 
           user.isAccountActive !== false && 
           user.status !== 'inactive' &&
           user.accountStatus !== 'inactive'
  }

  // Handle error state - but check if it's the "user not active" error
  if (error) {
    console.error('Orders query error:', error)
    
    if (error.response?.data?.message === 'User is not active') {
      return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg border border-red-200 shadow-sm">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Inactive</h2>
            <p className="text-gray-600 mb-6">
              Your account is currently inactive. Please contact our support team to activate your account.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>Support: support@yourcompany.com</span>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Contact Support
                </button>
                <button 
                  onClick={() => {
                    Cookies.remove('token')
                    window.location.href = '/login'
                  }}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Login Different Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-red-300 mx-auto mb-4" />
        <p className="text-red-500">
          {error.response?.status === 403 
            ? 'Access denied. Please check your permissions.' 
            : `Error loading orders: ${error.message}`
          }
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  // Safely extract orders data - handle different response structures
  let ordersData = []
  try {
    if (orders?.data && Array.isArray(orders.data)) {
      ordersData = orders.data
    } else if (orders && Array.isArray(orders)) {
      ordersData = orders
    } else if (orders?.orders && Array.isArray(orders.orders)) {
      ordersData = orders.orders
    }
  } catch (err) {
    console.error('Error extracting orders data:', err)
    ordersData = []
  }

  if (activeTab === 'overview') {
    const totalAmount = ordersData.reduce((total, order) => {
      try {
        const amount = order?.totalAmount || order?.total || 0
        return total + (typeof amount === 'number' ? amount : 0)
      } catch (err) {
        console.error('Error calculating total amount:', err)
        return total
      }
    }, 0)

    const pendingOrders = ordersData.filter(order => {
      try {
        return order?.status?.toLowerCase() === 'processing'
      } catch {
        return false
      }
    }).length

    const stats = [
      {
        name: 'Total Orders',
        value: ordersData.length,
        icon: Package,
        color: 'bg-blue-500'
      },
      {
        name: 'Total Spent',
        value: formatPrice(totalAmount),
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        name: 'Pending Orders',
        value: pendingOrders,
        icon: Clock,
        color: 'bg-yellow-500'
      }
    ]

    return (
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'Customer'}!
          </h2>
          <p className="text-gray-600">Here's a summary of your account activity.</p>
          
          {/* Show account status if available */}
          {user && (
            <div className="mt-4 text-sm">
              <span className="text-gray-500">Account Status: </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isAccountActive()
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isAccountActive() ? 'Active' : 'Inactive'}
              </span>
            </div>
          )}
        </div>

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
          ) : ordersData.length > 0 ? (
            <div className="space-y-4">
              {ordersData.slice(0, 5).map((order) => {
                try {
                  if (!order?._id && !order?.id) return null
                  
                  const orderId = order._id || order.id
                  const totalAmount = order.totalAmount || order.total || 0
                  
                  return (
                    <div key={orderId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Order #{orderId.toString().slice(-8)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt || order.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(totalAmount)}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status || 'unknown'}
                        </span>
                      </div>
                    </div>
                  )
                } catch (err) {
                  console.error('Error rendering order:', err)
                  return null
                }
              })}
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
        ) : ordersData.length > 0 ? (
          <div className="space-y-4">
            {ordersData.map((order) => {
              try {
                if (!order?._id && !order?.id) return null
                
                const orderId = order._id || order.id
                const orderItems = order.items || order.products || []
                const totalAmount = order.totalAmount || order.total || 0
                
                return (
                  <div key={orderId} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          Order #{orderId.toString().slice(-8)}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.createdAt || order.created_at)}
                        </p>
                      </div>
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status || 'unknown'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {orderItems.length > 0 ? (
                        orderItems.map((item, index) => {
                          try {
                            if (!item) return null
                            
                            const itemKey = item._id || item.id || `item-${index}`
                            const product = item.product || item
                            const productName = product?.name || product?.title || 'Unknown Product'
                            const productImage = product?.images?.[0]?.url || product?.image || '/placeholder-image.jpg'
                            const quantity = item.quantity || 1
                            const price = item.price || product?.price || 0
                            
                            return (
                              <div key={itemKey} className="flex items-center space-x-4">
                                <img
                                  src={productImage}
                                  alt={productName}
                                  className="w-16 h-16 object-cover rounded"
                                  onError={(e) => {
                                    e.target.src = '/placeholder-image.jpg'
                                  }}
                                />
                                <div className="flex-grow">
                                  <p className="font-medium text-gray-900">{productName}</p>
                                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-900">
                                  {formatPrice(price * quantity)}
                                </p>
                              </div>
                            )
                          } catch (err) {
                            console.error('Error rendering order item:', err)
                            return null
                          }
                        })
                      ) : (
                        <p className="text-gray-500 text-sm">No items in this order</p>
                      )}
                    </div>
                    
                    <div className="border-t mt-4 pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatPrice(totalAmount)}
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                        View Details
                      </button>
                    </div>
                  </div>
                )
              } catch (err) {
                console.error('Error rendering order:', err)
                return null
              }
            })}
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
        
        {/* User Info */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Name:</span> {user?.firstName || 'N/A'} {user?.lastName || ''}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {user?.email || 'N/A'}
            </p>
            {user?.phone && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Account Status:</span>{' '}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isAccountActive()
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isAccountActive() ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Email Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Order updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Promotional emails</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Newsletter</span>
              </label>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Privacy Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Public profile</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Show purchase history</span>
              </label>
            </div>
          </div>
        </div>
        
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Settings
        </button>
      </div>
    )
  }

  return null
}

export default CustomerDashboard