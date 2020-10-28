import React, { useState, useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'

// Global Controller
import { CartService } from '../../organisms/provider'

// Material
import {
  Divider,
  Typography
} from '@material-ui/core'

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

  function _handleProductSet(productList) {
    send('SET_PRODUCTS', {
      products: productList
    })
  }

  const products = current.context.cartData?.cart?.products || []
  const loading = current.matches('loading') || current.matches('ready')

  useEffect(() => {
    if(loading) {
      setIsEditing(false)
    }

  }, [loading])

  function CartStateView() {
    const loading = current.matches('loading') && !products.length || current.matches('ready')
    const loadingPartial = current.matches('loading') && !!products.length
    const ready = current.matches('idle') && !!products.length && !isEditing
    const editMode = current.matches('idle') && !!products.length && isEditing
    const empty = current.matches('idle') && !products.length

    switch(true) {
      // case true: {
      //   return <CommingSoom />
      // }
      case loading: {
        return <Loading />
      }

      case ready: {
        return (
          <ReadyView
            products={products}
            
            setIsEditing={setIsEditing}
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

      {/* <Divider /> */}

      { CartStateView() }
      
    </Section>
  )
}

export default CartView
