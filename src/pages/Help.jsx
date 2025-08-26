import React from 'react'
import { ChevronDown } from 'lucide-react'

const Help = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account and provide shipping information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and PayPal. All payments are processed securely."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by vendor and location. Most orders are processed within 1-2 business days and delivered within 3-7 business days."
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes, we offer a 30-day return policy for most items. Items must be unused and in original packaging."
    },
    {
      question: "How do I become a vendor?",
      answer: "You can apply to become a vendor by registering an account and selecting 'Vendor' as your account type. We'll review your application within 24-48 hours."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Help Center</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="divide-y">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Still need help?</p>
          <a href="/contact" className="btn btn-primary">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default Help