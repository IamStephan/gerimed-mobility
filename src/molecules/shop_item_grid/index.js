import React, { useEffect } from 'react'

// Material
import {
  Divider,
  Typography,
  Button
} from '@material-ui/core'
import {
  Pagination,
  Skeleton,
  Alert,
  AlertTitle
} from '@material-ui/lab'
import { InfoOutlined } from '@material-ui/icons'

// Hooks
import { useMachine } from '@xstate/react'

// Controller
import { LocalController } from './controller'

// Molecules
import ShopItem from '../shop_item'

// Gatsby
import { useLocation } from '@reach/router'

// Molecule Skeletons
import ShopItemSkeleton from '../../molecule_skeletons/shop_item'

// Styles
import styles from './styles.module.scss'
import { actions } from 'xstate'

/**
 * NOTE:
 * =====
 * Used to avoid the weird last ow spacing
 * The total of items is based on the max total items that
 * can fit inside a row (roughly, clamp_width / (item_size + margin * 2))
 * but scss variables cannot be reliably imported into javascript (Gatsby)
 */
const PlaceholderItems = () => Array(4).fill(1).map((key, i) => <div key={key + i} className={styles['placeholderItem']} />)

const PAGE_ITEM_LIMIT = 12

const ShopItemGrid = () => {
  const LoadingItems = Array(PAGE_ITEM_LIMIT).fill(1)

  const location = useLocation()

  const [current, send] = useMachine(LocalController, {
    context: {
      page_item_limit: PAGE_ITEM_LIMIT
    }
  })

  const loading = current.matches('ready') || current.matches('loading') || current.matches('retry')
  const show = current.matches('idle')
  const error = current.matches('fail')
  
  function _retry() {
    send('RESET')
  }

  function _setPage(_e, value) {
    send('SET_PAGE', {
      page: value
    })
  }

  function ProductMeta() {
    const startProductOffset = (PAGE_ITEM_LIMIT * Number(current.context?.page)) - (PAGE_ITEM_LIMIT - current.context?.products?.length)
    const startProduct = startProductOffset - current.context?.products?.length + 1
    const totalProducts = current.context?.productCount
    const multipleProducts = current.context?.productCount > 1 ? 's' : ''

    if(loading) {
      return (
        <Skeleton>
          <Typography
            gutterBottom
            variant='overline'
          >
            Showing 1 - 12 of 12 Products
          </Typography>
        </Skeleton>
      )
    }

    if(show && current.context.productCount) {
      return (
        <Typography
          gutterBottom
          variant='overline'
        >
          Showing {startProduct} - {startProductOffset} of {totalProducts} Product{multipleProducts}
        </Typography>
      )
    }

    return null
  }

  function ProductGrid() {
    if(loading) {
      return (
        <div
          className={styles['shopItems']}
        >
          {
            LoadingItems.map((key, i) => (
              <ShopItemSkeleton
                key={key + i}
              />
            ))
          }
          <PlaceholderItems />
        </div>
      )
    }

    if(show) {
      if(current.context.productCount) {
        return (
          <div
            className={styles['shopItems']}
          >
            {
              current.context.products.map((product) => (
                <ShopItem
                  key={product.id}
                  product={product}
                />
              ))
            }
            <PlaceholderItems />
          </div>
        )
      } else {
        return (
          <Alert
            iconMapping={{
              success: <InfoOutlined fontSize="inherit" />
            }}
          >
            <AlertTitle>
              <b>No Products were found</b>
            </AlertTitle>

            This could be an result of your filters being to specific.
          </Alert>
        )
      }
    }

    if(error) {
      return (
        <Alert
          severity='error'
          action={
            <Button
              color="inherit"
              size="small"
              onClick={_retry}
            >
              Retry
            </Button>
          }
        >
          <AlertTitle>
            <b>Could not load Products</b>
          </AlertTitle>

          There seems to be a technical error. Please, retry or contact us.
        </Alert>
      )
    }

    return null
  }

  function PagePagination() {
    if(loading) {
      return (
        <div
          className={styles['pagination']}
        >
          <Skeleton>
            <Pagination
              variant='outlined'
              color='secondary'
              siblingCount={0} boundaryCount={1}

              count={30}
            />
          </Skeleton>
        </div>
      )
    }

    if(show && current.context.productCount > PAGE_ITEM_LIMIT) {
      return (  
        <div
          className={styles['pagination']}
        >
          <Pagination
            variant='outlined'
            color='secondary'
            siblingCount={0} boundaryCount={1}
            page={Number(current.context.page)}
            onChange={_setPage}
            count={Math.ceil(current.context.productCount / PAGE_ITEM_LIMIT)}
          />
        </div>
      )
    }

    return null
  }

  useEffect(() => {
    send('FILTER_CHECK')
  }, [location.search])

  return (
    <div
      className={styles['shopItemGrid']}
    >
      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Products</b>
      </Typography>

      { ProductMeta() }
      
      <Divider/>

      { ProductGrid() }
      

      <Divider/>

      { PagePagination() }
    </div>
  )
}

export default ShopItemGrid
