// import { useState } from 'react'
// import { useQuery } from 'react-query'
import { useQuery } from '@tanstack/react-query'
import { productService } from '../../services/products'
import { orderService } from '../../services/orders'
import { useAuth } from '../../hooks/useAuth'
import VendorProducts from './VendorProducts'
import VendorAnalytics from './VendorAnalytics'
import Loading from '../common/Loading'
import { Package, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react'

const VendorDashboard = ({ activeTab }) => {
  const { user } = useAuth()
  
  const { data: products, isLoading: productsLoading } = useQuery(
    ['vendor-products', user?._id],
    () => productService.getVendorProducts(user._id),
    { enabled: !!user?._id && (activeTab === 'overview' || activeTab === 'products') }
  )

  const { data: orders, isLoading: ordersLoading } = useQuery(
    ['vendor-orders'],
    () => orderService.getOrders({ vendor: user._id }),
    { enabled: !!user?._id && (activeTab === 'overview' || activeTab === 'orders') }
  )

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (activeTab === 'overview') {
    const totalRevenue = orders?.data?.reduce((total, order) => {
      return total + order.items
        .filter(item => item.product?.vendor === user._id)
        .reduce((itemTotal, item) => itemTotal + (item.price * item.quantity), 0)
    }, 0) || 0

    const stats = [
      {
        name: 'Total Products',
        value: products?.data?.length || 0,
        icon: Package,
        color: 'bg-blue-500'
      },
      {
        name: 'Total Revenue',
        value: formatPrice(totalRevenue),
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        name: 'Total Orders',
        value: orders?.data?.length || 0,
        icon: ShoppingBag,
        color: 'bg-purple-500'
      },
      {
        name: 'Active Products',
        value: products?.data?.filter(product => product.status === 'active').length || 0,
        icon: TrendingUp,
        color: 'bg-indigo-500'
      }
    ]

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            {ordersLoading ? (
              <Loading />
            ) : orders?.data?.length > 0 ? (
              <div className="space-y-4">
                {orders.data.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Order #{order._id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </p>
                      <span className="text-xs text-gray-600">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No orders yet</p>
            )}
          </div>

          {/* Low Stock Products */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
            {productsLoading ? (
              <Loading />
            ) : (
              <div className="space-y-4">
                {products?.data
                  ?.filter(product => product.stock <= 10)
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product._id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      </div>
                      <span className="text-sm font-semibold text-red-600">
                        {product.stock} left
                      </span>
                    </div>
                  )) || <p className="text-gray-500">All products are well-stocked</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'products') {
    return <VendorProducts />
  }

  if (activeTab === 'analytics') {
    return <VendorAnalytics />
  }

  if (activeTab === 'orders') {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Vendor Orders</h3>
        
        {ordersLoading ? (
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
                      Customer: {order.user?.firstName} {order.user?.lastName}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    {order.status}
                  </span>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">
                    Total: {formatPrice(order.totalAmount)}
                  </p>
                  <div className="space-x-2">
                    <button className="btn btn-outline">View Details</button>
                    <button className="btn btn-primary">Update Status</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default VendorDashboard