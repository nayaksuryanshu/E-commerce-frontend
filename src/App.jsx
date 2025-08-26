import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Loading from './components/common/Loading'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

// Auth Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'

// Additional Pages
import About from './pages/About'
import Contact from './pages/Contact'
import Help from './pages/Help'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function App() {
  const { isLoading, isAuthenticated, user } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Auth Routes - Redirect if already authenticated */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to={getDashboardRedirect(user?.role)} replace />
              ) : (
                <Login />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to={getDashboardRedirect(user?.role)} replace />
              ) : (
                <Register />
              )
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              isAuthenticated ? (
                <Navigate to={getDashboardRedirect(user?.role)} replace />
              ) : (
                <ForgotPassword />
              )
            } 
          />

          {/* Cart - Available to all users but requires auth for checkout */}
          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes - Require Authentication */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Dashboard Routes - Role-based access */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Only Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminRoutes />
              </ProtectedRoute>
            } 
          />

          {/* Vendor Only Routes */}
          <Route 
            path="/vendor/*" 
            element={
              <ProtectedRoute roles={['vendor']}>
                <VendorRoutes />
              </ProtectedRoute>
            } 
          />

          {/* Customer Routes */}
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute roles={['customer', 'vendor', 'admin']}>
                <Orders />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/orders/:id" 
            element={
              <ProtectedRoute roles={['customer', 'vendor', 'admin']}>
                <OrderDetail />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

// Helper function to determine dashboard redirect based on role
const getDashboardRedirect = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard?tab=overview'
    case 'vendor':
      return '/dashboard?tab=overview'
    case 'customer':
    default:
      return '/dashboard?tab=overview'
  }
}

// Admin Routes Component
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/users" element={<Dashboard />} />
      <Route path="/products" element={<Dashboard />} />
      <Route path="/orders" element={<Dashboard />} />
      <Route path="/analytics" element={<Dashboard />} />
      <Route path="/settings" element={<Dashboard />} />
    </Routes>
  )
}

// Vendor Routes Component
const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/products" element={<Dashboard />} />
      <Route path="/orders" element={<Dashboard />} />
      <Route path="/analytics" element={<Dashboard />} />
      <Route path="/settings" element={<Dashboard />} />
    </Routes>
  )
}

// Orders Component (placeholder - you might want to create a separate component)
const Orders = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      {/* Orders content will be handled by Dashboard component */}
      <Dashboard />
    </div>
  )
}

// OrderDetail Component (placeholder)
const OrderDetail = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Details</h1>
      {/* Order detail content */}
    </div>
  )
}

export default App