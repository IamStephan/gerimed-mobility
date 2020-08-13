import React, { useState, useEffect } from "react"

// Hooks
import { useLocalStorage } from 'react-use'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// API
import axios from 'axios'

// Constants
import { KEYS } from '../../constants/localStorage'
import { MODES } from '../../constants/profile'
import { PROFILE_ACTIONS } from '../../constants/state'

// State
import { dispatch, useGlobalStore } from '../../state/profile'

// Gatsby
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            server
            port
          }
        }
      }
    `
  )

  const [mode, setMode] = useState(MODES.loading)

  const [value] = useLocalStorage(KEYS.jwt)

  function getUserInfo(token) {
    axios.get(`http://${site.siteMetadata.server}:${site.siteMetadata.port}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      const { data } = res
      // Extract needed info
      const user = {
        auth: {
          token
        },
        info: {
          firstName: data['first_name'],
          lastName: data['last_name'],
          email: data['email'],
          phone: data['phone']
        },

        // These values are not always available since the registration does not require them
        shipping: {
          street: data.address?.street,
          suburb: data.address?.suburb,
          postCode: data.address?.['post_code'],
          province: data.address?.province,
          country: data.address?.country,
        },
      }

      dispatch({
        type: PROFILE_ACTIONS.initialSetup,
        ...user
      })

      setMode(MODES.show)
    }).catch(e => {
      console.log(e)
      navigate("/profile/login")
    })
  }

  useEffect(() => {
    if(value) {
      getUserInfo(value)
    } else {
      navigate("/profile/login")
    }
  }, [])

  switch(mode) {
    case MODES.loading: {
      return null
    }

    case MODES.show: {
      return <Component {...rest} />
    }

    default: {
      return null
    }
  }
}

export default PrivateRoute
