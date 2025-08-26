// import { useQuery } from 'react-query'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth'
import { orderService } from '../../services/orders'
import Loading from '../common/Loading'
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react'

const VendorAnalytics = () => {
  const { user } = useAuth()
  
  const { data: analytics, isLoading } = useQuery(
    ['vendor-analytics', user?._id],
    () => orderService.getOrders({ vendor: user._id }),
    { enabled: !!user?._id }
  )

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (isLoading) return <Loading />

  // Calculate analytics data
  const orders = analytics?.data || []
  const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0)
  const totalOrders = orders.length
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Monthly revenue calculation
  const monthlyRevenue = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' })
    acc[month] = (acc[month] || 0) + order.totalAmount
    return acc
  }, {})

  const metrics = [
    {
      name: 'Total Revenue',
      value: formatPrice(totalRevenue),
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Average Order Value',
      value: formatPrice(averageOrderValue),
      change: '+4.1%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      icon: BarChart3,
      color: 'bg-indigo-500'
    }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.name} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-green-600">{metric.change}</p>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h4>
          <div className="space-y-3">
            {Object.entries(monthlyRevenue).map(([month, revenue]) => (
              <div key={month} className="flex justify-between items-center">
                <span className="text-gray-600">{month}</span>
                <span className="font-semibold text-gray-900">{formatPrice(revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h4>
          <div className="space-y-3">
            {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
              const count = orders.filter(order => order.status === status).length
              const percentage = totalOrders > 0 ? (count / totalOrders * 100).toFixed(1) : 0
              return (
                <div key={status} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{status}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{percentage}%</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">95%</p>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">2.5 days</p>
            <p className="text-sm text-gray-600">Average Fulfillment Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">4.8/5</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorAnalytics