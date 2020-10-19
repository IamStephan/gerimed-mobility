import React, { useEffect } from 'react'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Material
import { Typography, Divider } from '@material-ui/core'

// Components
import ShopItem from '../shop_item'

// Styles
import styles from './styles.module.scss'

const ShopItemRow = props => {
  const {
    products,
    title
  } = props


  const [emblaRef, embla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'start',
  })

  useEffect(() => {
    if(!embla || !products) return

    /**
     * The data of the carousel changed and embla does not pick it up
     * Reinit the component
     */
    embla.reInit()
  }, [products, embla])

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
              products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex'
                  }}
                >
                  <ShopItem
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    categories={product.categories}
                    showcase={product.showcase}
                    shopOnly={product.shopOnly}
                    isLimited={product.isLimited}
                    quantity={product.quantity}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopItemRow
