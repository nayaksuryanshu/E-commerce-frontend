
import Loading from '../common/Loading'
import { Users, Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'

const AdminDashboard = ({ activeTab }) => {
  // Mock data - in real app, fetch from API
  const stats = [
    {
      name: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Products',
      value: '1,234',
      change: '+8.2%',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      name: 'Total Orders',
      value: '5,678',
      change: '+15.3%',
      icon: ShoppingBag,
      color: 'bg-purple-500'
    },
    {
      name: 'Total Revenue',
      value: '$125,430',
      change: '+23.1%',
      icon: DollarSign,
      color: 'bg-yellow-500'
    }
  ]

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
            <div className="space-y-4">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Customer' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Vendor' },
                { name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">{user.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[
                { id: '#12345', customer: 'Alice Cooper', amount: '$125.00', status: 'Processing' },
                { id: '#12346', customer: 'Bob Wilson', amount: '$89.50', status: 'Shipped' },
                { id: '#12347', customer: 'Carol Davis', amount: '$256.75', status: 'Delivered' }
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <span className="text-xs text-gray-600">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'users') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <button className="btn btn-primary">Add User</button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joined: '2024-01-15' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Vendor', status: 'Active', joined: '2024-01-10' },
                { name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive', joined: '2024-01-05' }
              ].map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Other tabs...
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">This section is under development</p>
    </div>
  )
}

export default AdminDashboard