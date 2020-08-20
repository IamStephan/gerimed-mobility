import React, { useState, useEffect } from "react"

// Hooks
import { useLocalStorage, useTimeoutFn } from 'react-use'
import { useSnackbar } from 'notistack'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Pages
import Loader from '../../pages/loader'

// API
import { GetUser } from '../../api/user'

// Constants
import { KEYS } from '../../constants/localStorage'
import { MODES } from '../../constants/profile'
import { PROFILE_ACTIONS } from '../../constants/state'

// State
import { dispatch } from '../../state/profile'

// Gatsby
import { navigate } from "gatsby"

const STALE_LOAD_TIMEOUT = 2000

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            protocol
            server
            port
          }
        }
      }
    `
  )

  const { enqueueSnackbar } = useSnackbar()
  const [mode, setMode] = useState(MODES.loading)
  const [token] = useLocalStorage(KEYS.jwt)

  const [checkForStaleLoad, cancelStaleLoadCheck] = useTimeoutFn(staleLoading, STALE_LOAD_TIMEOUT)

  function staleLoading() {
    setMode(MODES.staleLoad)
  }

  async function init(token) {
    const results = await GetUser({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      token
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      cancelStaleLoadCheck()
      const { data } = results

      const user = {
        auth: {
          token,
          id: data.id
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
    } else {
      navigate("/profile/login")
    }
  }

  useEffect(() => {
    if(token) {
      init(token)
      checkForStaleLoad()
    } else {
      navigate("/profile/login")
    }
  }, [])

  switch(mode) {
    case MODES.loading: {
      return null
    }

    case MODES.staleLoad: {
      return <Loader />
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
