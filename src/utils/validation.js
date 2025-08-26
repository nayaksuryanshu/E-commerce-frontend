export const validateEmail = (email) => {
  const errors = []
  
  if (!email) {
    errors.push('Email is required')
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please enter a valid email address')
  }
  
  return errors
}

export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Password is required')
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number')
    }
  }
  
  return errors
}

export const validatePhone = (phone) => {
  const errors = []
  
  if (!phone) {
    errors.push('Phone number is required')
  } else if (!/^\+?[\d\s\-()]+$/.test(phone)) {
    errors.push('Please enter a valid phone number')
  }
  
  return errors
}

export const validateRequired = (value, fieldName) => {
  const errors = []
  
  if (!value || (typeof value === 'string' && !value.trim())) {
    errors.push(`${fieldName} is required`)
  }
  
  return errors
}

export const validateMinLength = (value, minLength, fieldName) => {
  const errors = []
  
  if (value && value.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters long`)
  }
  
  return errors
}

export const validateMaxLength = (value, maxLength, fieldName) => {
  const errors = []
  
  if (value && value.length > maxLength) {
    errors.push(`${fieldName} must not exceed ${maxLength} characters`)
  }
  
  return errors
}

export const validateNumeric = (value, fieldName) => {
  const errors = []
  
  if (value && isNaN(value)) {
    errors.push(`${fieldName} must be a valid number`)
  }
  
  return errors
}