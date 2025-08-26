import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authService } from '../../services/auth'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft } from 'lucide-react'

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await authService.forgotPassword(data.email)
      setEmailSent(true)
      toast.success('Password reset link sent to your email!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email')
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <Mail className="mx-auto h-12 w-12 text-primary-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a password reset link to your email address.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="btn btn-outline w-full"
            >
              Try again
            </button>
            <Link to="/login" className="btn btn-primary w-full block text-center">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              autoComplete="email"
              className="input mt-1"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full flex justify-center"
          >
            {isLoading ? 'Sending...' : 'Send reset link'}
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-500"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword