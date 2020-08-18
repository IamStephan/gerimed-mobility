import axios from 'axios'

// Error Handling
import { SanitizeErrors } from '../sanitizers'

/**
 * NOTES:
 * ======
 * Maybe create a handler function that simlifies api calls
 * They're all quiet simmilar in signiture
 */

// Set username automatically
async function Register({
  server,
  protocol,
  port
}, {
  email,
  password,
  firstName,
  lastName
}) {
  try {
    const data = await axios.post(`${protocol}://${server}:${port}/auth/local/register`, {
      username: `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${email.toLowerCase()}`,
      email: email,
      password: password,
      'first_name': firstName,
      'last_name': lastName
    })

    return {
      type: 'success',
      data,
      notis: [
        {
          id: Math.random(),
          message: 'Please check your email for a validation link'
        }
      ]
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

async function Login({
  server,
  protocol,
  port
}, {
  identifier,
  password
}) {
  try {
    const data = await axios.post(`${protocol}://${server}:${port}/auth/local`, {
      identifier: identifier,
      password: password
    })

    return {
      type: 'success',
      data,
      // Not needed since the client will be redirected
      notis: [
        {
          id: Math.random(),
          message: 'Login successful'
        }
      ]
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

async function RequestPasswordReset({
  server,
  protocol,
  port
}, {
  email
}) {
  try {
    const data = await axios.post(`${protocol}://${server}:${port}/auth/forgot-password`, {
      email: email
    })

    return {
      type: 'success',
      data,
      notis: [
        {
          id: Math.random(),
          message: 'Please check your email for the reset link'
        }
      ]
    }

  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

async function ResetPassword({
  server,
  protocol,
  port
}, {
  code,
  password,
  confirmPassword,
}) {
  try {
    const data = await axios.post(`${protocol}://${server}:${port}/auth/reset-password`, {
      code: code, // code contained in the reset link of step 3.
      password: password,
      passwordConfirmation: confirmPassword,
    })

    return {
      type: 'success',
      data,
      // Not needed since the client will be redirected
      notis: [
        {
          id: Math.random(),
          message: 'Password reset, you can now login'
        }
      ]
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

async function ResendConfirmation({
  server,
  protocol,
  port
}, {
  email
}) {
  try {
    const data = await axios.post(`${protocol}://${server}:${port}/auth/send-email-confirmation`, {
      email
    })

    return {
      type: 'success',
      data,
      notis: [
        {
          id: Math.random(),
          message: 'Please check your email for the confirmation link'
        }
      ]
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

export {
  Register,
  Login,
  RequestPasswordReset,
  ResetPassword,
  ResendConfirmation
}