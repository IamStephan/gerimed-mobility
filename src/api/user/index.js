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

async function GetPurchaseHistory({
  server,
  protocol,
  port
}, {
  skip,
  offset
}) {

}

async function UpdateUserInfo({
  server,
  protocol,
  port
}, {
  firstName,
  lastName,
  phone
}) {

}

async function UpdateUserShipping({
  server,
  protocol,
  port
}, {
  steet,
  suburb,
  postCode,
  province
}) {

}

async function UpdateUserSettings({
  server,
  protocol,
  port
}, {
  newsletter
}) {

}

export {
  GetUser
}