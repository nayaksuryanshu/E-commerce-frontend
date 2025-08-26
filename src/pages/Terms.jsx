import React from 'react'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 1, 2024</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this marketplace, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do 
              not use this service.
            </p>
            
            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times. You are responsible for safeguarding the password 
              and for maintaining the confidentiality of your account.
            </p>
            
            <h2>3. Vendor Terms</h2>
            <p>
              Vendors must provide accurate product descriptions, honor listed prices, and fulfill 
              orders in a timely manner. All products must comply with applicable laws and regulations.
            </p>
            
            <h2>4. Payment Terms</h2>
            <p>
              All payments are processed securely through our payment partners. Prices are subject 
              to change without notice. You agree to pay all charges incurred by your account.
            </p>
            
            <h2>5. Returns and Refunds</h2>
            <p>
              Our return policy allows for returns within 30 days of purchase for most items. 
              Refunds will be processed to the original payment method within 5-10 business days.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall our marketplace be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses.
            </p>
            
            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these terms at any time. If a revision is 
              material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            
            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at 
              legal@ecommerce.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms