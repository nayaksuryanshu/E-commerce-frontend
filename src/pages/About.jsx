import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          
          <div className="prose prose-lg text-gray-700">
            <p className="text-xl text-gray-600 mb-6">
              Welcome to our multi-vendor e-commerce marketplace, where quality meets convenience.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p>
              We're dedicated to connecting customers with trusted vendors from around the world, 
              providing a seamless shopping experience that prioritizes quality, security, and customer satisfaction.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verified vendors and quality products</li>
              <li>Secure payment processing</li>
              <li>Fast and reliable shipping</li>
              <li>24/7 customer support</li>
              <li>Easy returns and refunds</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Story</h2>
            <p>
              Founded in 2024, we started with a simple vision: to create a marketplace that 
              benefits both customers and vendors. Today, we're proud to serve thousands of 
              customers worldwide while supporting small and medium businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About