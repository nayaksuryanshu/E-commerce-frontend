/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useFeaturedProducts, useTrendingProducts, useTopRatedProducts } from '../hooks/useProducts'
import ProductCard from '../components/products/ProductCard'
import Loading from '../components/common/Loading'
import { ArrowRight, Star, TrendingUp, Award } from 'lucide-react'

const Home = () => {
  const { data: featuredProducts, isLoading: featuredLoading } = useFeaturedProducts()
  const { data: trendingProducts, isLoading: trendingLoading } = useTrendingProducts()
  const { data: topRatedProducts, isLoading: topRatedLoading } = useTopRatedProducts()

  const ProductSection = ({ title, products, loading, icon: Icon, linkTo }) => (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Icon className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <Link
          to={linkTo}
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
        >
          <span>View all</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.data?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover amazing products from trusted vendors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Shop Now
              </Link>
              <Link to="/register" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Products */}
        <ProductSection
          title="Featured Products"
          products={featuredProducts}
          loading={featuredLoading}
          icon={Star}
          linkTo="/products?featured=true"
        />

        {/* Trending Products */}
        <ProductSection
          title="Trending Now"
          products={trendingProducts}
          loading={trendingLoading}
          icon={TrendingUp}
          linkTo="/products?trending=true"
        />

        {/* Top Rated Products */}
        <ProductSection
          title="Top Rated"
          products={topRatedProducts}
          loading={topRatedLoading}
          icon={Award}
          linkTo="/products?sort=rating"
        />
      </div>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start selling?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of vendors who trust our platform
          </p>
          <Link to="/register" className="btn btn-primary">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home