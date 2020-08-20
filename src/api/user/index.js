import axios from 'axios'

// Error Handling
import { SanitizeErrors } from '../sanitizers'


async function GetUser({
  server,
  protocol,
  port
}, {
  token
}) {
  try {
    const { data } = await axios.get(`${protocol}://${server}:${port}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return {
      type: 'success',
      data,
      // Not needed since the client will be redirected
      notis: []
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

async function UpdateUser({
  server,
  protocol,
  port
}, { token }, { dataToSubmit }) {
  try {
    const { data } = await axios.put(`${protocol}://${server}:${port}/users/me`, {
      ...dataToSubmit
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    
    return {
      type: 'success',
      data,
      notis: [
        {
          id: Math.random(),
          message: 'Your account has been updated.'
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

async function GetPurchaseHistory({
  server,
  protocol,
  port
}, {
  offset,
  limit,
  token
}) {
  try {
    const data = await axios.post(`${protocol}://${server}:${port}/users/my-invoices`, {
      start: offset,
      limit
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return {
      type: 'success',
      data,
      // Do not notify anything, results will do
      notis: []
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

async function GetPurchaseHistoryCount({
  server,
  protocol,
  port
}, {
  token
}) {
  try {
    const data = await axios.get(`${protocol}://${server}:${port}/users/count-my-invoices`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return {
      type: 'success',
      data,
      // Do not notify anything, results will do
      notis: []
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}

export {
  GetUser,
  UpdateUser,
  GetPurchaseHistory,
  GetPurchaseHistoryCount
}