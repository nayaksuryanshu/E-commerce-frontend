import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/auth'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Lock, Camera } from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isUpdating, setIsUpdating] = useState(false)
  const { user, updateUser } = useAuth()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch
  } = useForm()

  const newPassword = watch('newPassword')

  const onProfileSubmit = async (data) => {
    setIsUpdating(true)
    try {
      const response = await authService.updateProfile(data)
      updateUser(response.data)
      toast.success('Profile updated successfully!')
      reset(data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    } finally {
      setIsUpdating(false)
    }
  }

  const onPasswordSubmit = async (data) => {
    setIsUpdating(true)
    try {
      await authService.updateProfile({
        currentPassword: data.currentPassword,
        password: data.newPassword
      })
      toast.success('Password updated successfully!')
      resetPassword()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password update failed')
    } finally {
      setIsUpdating(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: User },
    { id: 'security', name: 'Security', icon: Lock }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-primary-100">{user?.email}</p>
              <p className="text-primary-100 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
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
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    className="input"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    className="input"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="input pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="input pl-10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="btn btn-primary"
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  {...registerPassword('currentPassword', {
                    required: 'Current password is required'
                  })}
                  type="password"
                  className="input"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  {...registerPassword('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  type="password"
                  className="input"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  {...registerPassword('confirmPassword', {
                    required: 'Please confirm your new password',
                    validate: value =>
                      value === newPassword || 'Passwords do not match'
                  })}
                  type="password"
                  className="input"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="btn btn-primary"
              >
                {isUpdating ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile