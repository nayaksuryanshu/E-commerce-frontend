import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSearchParams } from 'react-router-dom'
import VendorDashboard from '../components/vendor/VendorDashboard'
import AdminDashboard from '../components/admin/AdminDashboard'
import CustomerDashboard from '../components/customer/CustomerDashboard'
import { Package, ShoppingBag, Users, BarChart3, Settings } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')

  const getTabsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          { id: 'overview', name: 'Overview', icon: BarChart3 },
          { id: 'users', name: 'Users', icon: Users },
          { id: 'products', name: 'Products', icon: Package },
          { id: 'orders', name: 'Orders', icon: ShoppingBag },
          { id: 'analytics', name: 'Analytics', icon: BarChart3 },
          { id: 'settings', name: 'Settings', icon: Settings }
        ]
      case 'vendor':
        return [
          { id: 'overview', name: 'Overview', icon: BarChart3 },
          { id: 'products', name: 'My Products', icon: Package },
          { id: 'orders', name: 'Orders', icon: ShoppingBag },
          { id: 'analytics', name: 'Analytics', icon: BarChart3 },
          { id: 'settings', name: 'Settings', icon: Settings }
        ]
      default:
        return [
          { id: 'overview', name: 'Overview', icon: BarChart3 },
          { id: 'orders', name: 'My Orders', icon: ShoppingBag },
          { id: 'wishlist', name: 'Wishlist', icon: Package },
          { id: 'settings', name: 'Settings', icon: Settings }
        ]
    }
  }

  const tabs = getTabsForRole(user?.role)

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard activeTab={activeTab} />
      case 'vendor':
        return <VendorDashboard activeTab={activeTab} />
      default:
        return <CustomerDashboard activeTab={activeTab} />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-primary-100 mt-2">
              Welcome back, {user?.firstName}! Here's what's happening with your {user?.role} account.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard