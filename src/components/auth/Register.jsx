import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, isLoading } = useAuth()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      toast.success('Registration successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    }
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        sign in to your existing account
                    </Link>
                </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            {...register('firstName', {
                                required: 'First name is required',
                                minLength: {
                                    value: 2,
                                    message: 'First name must be at least 2 characters'
                                }
                            })}
                            type="text"
                            className="input mt-1"
                            placeholder="First name"
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            {...register('lastName', {
                                required: 'Last name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Last name must be at least 2 characters'
                                }
                            })}
                            type="text"
                            className="input mt-1"
                            placeholder="Last name"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        type="email"
                        className="input mt-1"
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^\+?[\d\s\-()]+$/,
                                message: 'Invalid phone number'
                            }
                        })}
                        type="tel"
                        className="input mt-1"
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Account Type
                    </label>
                    <select
                        id="role"
                        {...register('role', { required: 'Please select account type' })}
                        className="input mt-1"
                    >
                        <option value="">Select account type</option>
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                    </select>
                    {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative mt-1">
                        <input
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                                }
                            })}
                            type={showPassword ? 'text' : 'password'}
                            className="input pr-10"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative mt-1">
                        <input
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="input pr-10"
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        id="agreeToTerms"
                        {...register('agreeToTerms', {
                            required: 'You must agree to the terms and conditions'
                        })}
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                            Terms and Conditions
                        </Link>
                    </label>
                </div>
                {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full flex justify-center"
                >
                    {isLoading ? 'Creating account...' : 'Create account'}
                </button>
            </form>
        </div>
    </div>
)
}

export default Register