import React, { useRef, useCallback } from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

// Hooks
import { useMachine } from '@xstate/react'

// Controller
import { FetchGraphqlData } from '../../controllers/fetchGraphqlData'

// Model
import { FeaturedProducts } from './model'

// Molecules
import ShopItemRow from '../../molecules/shop_item_row'

// Molecule Skeletons
import ShopItemRowSkeleton from '../../molecule_skeletons/shop_item_row'

// Styles
import styles from './styles.module.scss'

const Featured = () => {
  const ref = useRef(null)
  const [current, send] = useMachine(FetchGraphqlData, {
    id: 'FeaturedProducts',
    context: {
      containerRef: ref,
      shouldStartIdle: true,
      graphqlQuery: FeaturedProducts,
      graphqlVariables: {
        limit: 5
      }
    }
  })

  const retry = useCallback(() => {
    send('RESET')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const productList = useCallback(() => {
    const productListData = {
      products: current.context.data?.products || [],
      title: 'Our Featured Products'
    }

    if(current.context.data?.promotions?.[0]?.product_discounts?.length > 0) {
      return {
        products: current.context.data?.promotions[0].product_discounts.map(item => item.product),
        title: current.context.data?.promotions[0].promotion_name
      }
    } else {
      return productListData
    }
  }, [current.context.data])
  
  const ShopRowTitle = productList().title
  const products = productList().products

  const StateToShow = useCallback(() => {
    const loading = current.matches('loading') || current.matches('retry') || current.matches('idle')
    const error = current.matches({fail: 'idle'}) || current.matches({fail: 'reset'})
    const success = current.matches('success') || current.matches('success_final')

    switch(true) {
      case loading: {
        return (
          <ShopItemRowSkeleton />
        )
      }

      case error: {
        return (
          <Alert
            severity='error'
            variant='outlined'
            action={(
              <Button
                color='inherit'
                size='small'
                onClick={retry}
              >
                Retry
              </Button>
            )}
          >
            <AlertTitle>
              <b>Could not load Featured Products</b>
            </AlertTitle>
            There seems to be a technical error. Please, retry or contact us.
          </Alert>
        )
      }

      case success: {
        return (
          <ShopItemRow
            title={ShopRowTitle}
            products={products}
          />
        )
      }

      default: {
        return (
          <Alert
            severity='error'
            variant='outlined'
            action={(
              <Button
                color='inherit'
                size='small'
                onClick={retry}
              >
                Retry
              </Button>
            )}
          >
            <AlertTitle>
              <b>Could not load Featured Products</b>
            </AlertTitle>
            There seems to be a technical error. Please, retry or contact us.
          </Alert>
        )
      }
    }
  }, [current.value, current.matches, ShopRowTitle]) // eslint-disable-line react-hooks/exhaustive-deps

  

  return (
    <Section
      className={styles['featuredSection']}
      isClamped={false}
    >
      <div
        className={styles['topDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>


      <div
        ref={ref}
        className={styles['featuredContainer']}
      >
        { StateToShow() }
      </div>

      <div
        className={styles['bottomDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>
    </Section>
  )
}

export default Featured
