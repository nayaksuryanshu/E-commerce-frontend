import React from 'react'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 1, 2024</p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support. This may include your name, email address, 
              phone number, shipping address, and payment information.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your account and orders</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information 
              with vendors to fulfill your orders and with service providers who assist us in operating 
              our marketplace.
            </p>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
            
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our 
              marketplace. You can control cookie settings through your browser preferences.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Delete your account</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our marketplace is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
            
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "last updated" date.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at 
              privacy@ecommerce.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy