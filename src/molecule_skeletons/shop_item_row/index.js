import React from 'react'

// Molecule Skeletons
import ShopItemSkeleton from '../shop_item'

// Material
import { Typography, Divider } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

// Styles
import styles from './styles.module.scss'

// Constants
const dummyProducts = Array(5).fill(1)

const ShopRowItemSkeleton = () => {
  return (
    <div
      className={styles['shopItemRow']}
    >
      <Skeleton
        className={styles['titleContainer']}
      >
        <Typography
          variant='h3'
          color='secondary'
          className={styles['title']}
        >
          Loading title
        </Typography>
      </Skeleton>

      <Divider />

      <div
        className={styles['rowViewport']}
      >
        <div
          className={styles['rowContainer']}
        >
          <div
            className={styles['rowContainer']}
          >
            {
               dummyProducts.map((_key, i) => (
                <ShopItemSkeleton
                  key={i}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopRowItemSkeleton
