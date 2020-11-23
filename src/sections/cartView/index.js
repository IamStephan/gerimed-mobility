import React, { useState, useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'

// Global Controller
import { CartService } from '../../organisms/provider'

// Material
import {
  Typography
} from '@material-ui/core'

// Gatsby
import { navigate } from 'gatsby'

// Templates
import { Section } from '../../templates/content_layout'

// Views
import Loading from './views/loading'
import Empty from './views/empty'
import ReadyView from './views/ready'
import EditView from './views/edit'

// Styles
import styles from './styles.module.scss'

const CartView = () => {
  const [current, send] = useService(CartService)

  const [isEditing, setIsEditing] = useState(false)
  const [initial, setInitial] = useState(true)

  function _handleProductSet(productList) {
    send('SET_PRODUCTS', {
      products: productList
    })
  }

  function _setShippingOption(value) {
    send('SET_SHIPPING_OPTION', {
      option: value
    })
  }

  function _saveShippingOption() {
    send('SET_CART_SHIPPING_OPTION')
    setInitial(false)
  }

  const products = current.context.cartData?.cart?.products || []
  const loading = current.matches('loading') || current.matches('ready')

  useEffect(() => {
    if(loading) {
      setIsEditing(false)
    }

  }, [loading])

  /**
   * Handle Save Shipping option
   * 
   * NOTE:
   * =====
   * 
   * Since the proceed button and the action of saving the shipping option
   * act as the same action, navigate to the checkout page
   */
  useEffect(() => {
    function checkSuccessfulSubmit(state) {
      if(!initial && state.changed && state.event.type === 'done.invoke.loading.setCartShippingOption') {
        navigate('/checkout')
      }
    }

    CartService.onTransition(checkSuccessfulSubmit)

    return () => {
      CartService.off(checkSuccessfulSubmit)
    }
  }, [initial])  // eslint-disable-line react-hooks/exhaustive-deps

  function CartStateView() {
    const loading = (current.matches('loading') && !products.length) || current.matches('ready')
    const loadingPartial = current.matches('loading') && !!products.length
    const ready = current.matches('idle') && !!products.length && !isEditing
    const editMode = current.matches('idle') && !!products.length && isEditing
    const empty = current.matches('idle') && !products.length

    const shippingOption = current.context.shippingOption

    

    switch(true) {
      case loading: {
        return <Loading />
      }

      case ready: {
        return (
          <ReadyView
            products={products}
            setIsEditing={setIsEditing}
            shippingOption={shippingOption}
            setShippingOption={_setShippingOption}
            saveShippingOption={_saveShippingOption}
          />
        )
      }

      case loadingPartial:
      case editMode: {
        return (
          <EditView
            products={products}
            loading={loadingPartial}
            setIsEditing={setIsEditing}
            setProducts={_handleProductSet}
            shippingOption={shippingOption}
            setShippingOption={_setShippingOption}
          />
        )
      }

      case empty:
      default: {
        return <Empty />
      }
    }
  }

  return (
    <Section
      className={styles['cartContainer']}    
    >
      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Your Cart</b>
      </Typography>

      {/* <Alert
        iconMapping={{
          success: <InfoOutlined />
        }}
      >
        <AlertTitle>
          <b>Note: </b>
        </AlertTitle>

        Only the manual payment options is currently available.<br />
        To <b>Learn More</b>, go to our contact page and see our FAQ.
      </Alert> */}

      { CartStateView() }
      
    </Section>
  )
}

export default CartView
