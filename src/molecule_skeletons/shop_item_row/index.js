import React from 'react'

// Molecule Skeletons
import ShopItemSkeleton from '../shop_item'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Material
import { Typography, Divider } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const ShopRowItemSkeleton = props => {
  const {
    title,
    productCount = 5
  } = props

  const [emblaRef] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'start',
  })

  const dummyProducts = Array(productCount).fill(1)

  return (
    <div
      className={styles['shopItemRow']}
    >
      <Typography
        variant='h3'
        color='secondary'
        className={styles['title']}
      >
        {title}
      </Typography>

      <Divider />

      <div
        className={styles['rowViewport']}
      >
        <div
          ref={emblaRef}
          style={{
            overflow: 'hidden'
          }}
        >
          <div
            className={styles['rowContainer']}
          >
            {
               dummyProducts.map((key, i) => (
                <div
                  key={key + i}
                  className={styles['rowItem']}
                >
                  <ShopItemSkeleton />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopRowItemSkeleton
