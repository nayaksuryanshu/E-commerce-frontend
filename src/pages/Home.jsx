/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Shield, Truck, RefreshCw, Star, Users, Heart, Zap } from 'lucide-react'

const Home = () => {
  const categories = [
    { name: 'Electronics', icon: '📱', count: '1,200+', color: 'bg-blue-100 hover:bg-blue-200' },
    { name: 'Fashion', icon: '👕', count: '2,500+', color: 'bg-pink-100 hover:bg-pink-200' },
    { name: 'Home & Garden', icon: '🏠', count: '800+', color: 'bg-green-100 hover:bg-green-200' },
    { name: 'Sports', icon: '⚽', count: '600+', color: 'bg-orange-100 hover:bg-orange-200' },
    { name: 'Books', icon: '📚', count: '1,500+', color: 'bg-purple-100 hover:bg-purple-200' },
    { name: 'Beauty', icon: '💄', count: '900+', color: 'bg-rose-100 hover:bg-rose-200' },
  ]

  const benefits = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-purple-600" />,
      title: 'Easy Returns',
      description: '30-day hassle-free returns'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Customer',
      rating: 5,
      comment: 'Amazing shopping experience! Fast delivery and great customer service.',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Vendor',
      rating: 5,
      comment: 'Perfect platform for my business. Easy to use and great support team.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emma Davis',
      role: 'Customer',
      rating: 5,
      comment: 'Love the variety of products and the secure payment system.',
      avatar: '👩‍🎓'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '5K+', label: 'Products' },
    { number: '500+', label: 'Vendors' },
    { number: '50+', label: 'Countries' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your One-Stop Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Discover amazing products from trusted vendors worldwide. Shop with confidence and join our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Link>
              <Link to="/register" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg">
                Become a Vendor
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                  <div className="text-primary-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Explore our wide range of product categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className={`${category.color} p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600">We're committed to providing the best shopping experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600">Real feedback from our customers and vendors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, deals, and exclusive offers.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300 focus:outline-none"
                />
                <button className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  <Zap className="h-4 w-4 inline mr-2" />
                  Subscribe
                </button>
              </div>
              <p className="text-primary-200 text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Marketplace?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're looking to shop or sell, we've got you covered. Join thousands of satisfied customers and successful vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Link>
              <Link to="/register" className="btn btn-outline border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
                <Heart className="h-5 w-5 mr-2" />
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home