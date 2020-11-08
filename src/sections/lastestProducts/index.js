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
import { LatestProducts } from './model'

// Molecules
import ShopItemRow from '../../molecules/shop_item_row'

// Molecule Skeletons
import ShopItemRowSkeleton from '../../molecule_skeletons/shop_item_row'

// Styles
import styles from './styles.module.scss'

const Latest = () => {
  const ref = useRef(null)
  const [current, send] = useMachine(FetchGraphqlData, {
    id: 'LatestProducts',
    context: {
      containerRef: ref,
      shouldStartIdle: true,
      graphqlQuery: LatestProducts,
      graphqlVariables: {
        limit: 5
      }
    }
  })

  const retry = useCallback(() => {
    send('RESET')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const ShopRowTitle = 'Our Latest Products'
  const products = current.context.data?.products

  const StateToShow = useCallback(() => {
    const loading = current.matches('loading') || current.matches('retry') || current.matches('idle')
    const error = current.matches({fail: 'idle'}) || current.matches({fail: 'reset'})
    const success = current.matches('success') || current.matches('success_final')

    switch(true) {
      case loading: {
        return (
          <ShopItemRowSkeleton
            title={ShopRowTitle}
          />
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
              <b>Could not load Latest Products</b>
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
              <b>Could not load Latest Products</b>
            </AlertTitle>
            There seems to be a technical error. Please, retry or contact us.
          </Alert>
        )
      }
    }
  }, [current.value, current.matches]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Section
      className={styles['latestSection']}
    >
      <div
        ref={ref}
        className={styles['latestContainer']}
      >
        { StateToShow() }
      </div>
    </Section>
  )
}

export default Latest
