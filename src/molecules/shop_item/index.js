import React, { useCallback } from 'react'

// Material
import { Typography, Chip, Link as Btn } from '@material-ui/core'

// Gatsby
import { Link, navigate } from 'gatsby'

// URL
import { stringify } from 'qs'

// Truncate
import TruncateText from 'react-text-truncate'

// Utils
import { strapiImageUrl, Rand } from '../../utils/js'

// Styles
import styles from './styles.module.scss'

const Title = props => {
  const {
    productID,
    title
  } = props

  return (
    <Typography
      className={styles['titleContainer']}
      component='div'
    >
      <Btn
        color='inherit'
        className={styles['title']}
        component={Link}
        to={`/product?id=${productID}`}
      >
        <TruncateText
          text={title}
          truncateText='...'
          line={2}
        />
      </Btn>
    </Typography>
  )
}

/**
 * BADGES
 */

const ShopOnlyBadge = () => (
  <Chip
    className={`${styles['badge']} ${styles['danger']}`}
    label='Shop Only'
    size='small'
  />
)

const OutOfStockBadge = () => (
  <Chip
    className={`${styles['badge']} ${styles['danger']}`}
    label='Out of Stock'
    size='small'
  />
)

const OnSaleBadge = ({ discountAmount=30 }) => (
  <div
    className={styles['salesBadge']}
  >
    <Typography
      className={styles['text']}
    >
      -<b>{discountAmount}%</b>
    </Typography>
  </div>
)

/**
 * TODO:
 * ======
 *  - show when an item is depleted
 *  - show when an item is on sale
 *  - Show add to cart on hover
 */

const ShopItem = props => {
  const {
    id,
    name,
    price,
    showcase,
    quantity = -10,
    isLimited = false,
    shopOnly = false,
    sale = false,
    categories
  } = props

  function _categoryFilter(category) {
    let filter = {
      categories: [category]
    }

    let queryString = stringify(filter)
    console.log(queryString)

    navigate(`/shop?${queryString}`)
  }

  const url = useCallback(() => {
    const preferedSize = 'small'
    const baseUrl = process.env.GATSBY_API_URL
    const url = showcase[0].url
    const formats = showcase[0].formats

    return strapiImageUrl(preferedSize, baseUrl, url, formats)
  }, [])

  /**
   * This is based on props and the data is not realtime
   * 
   * therefore it makes sense to run this only once
   */
  const badgeDisplay = useCallback(() => {
    const shopOnlyI = shopOnly
    const isLimitedI = isLimited
    const outOfStockI = (Number(quantity) < 1)
    const onSaleI = false

    if(shopOnlyI) {
      return <ShopOnlyBadge />
    } else {
      if(isLimitedI) {
        if(outOfStockI) {
          return <OutOfStockBadge />
        } else if(onSaleI) {
          return <OnSaleBadge />
        } else {
          return null
        }
      } else {
        if(onSaleI) {
          return <OnSaleBadge />
        } else {
          return null
        }
      }
    }
  }, [])

  return (
    <div
      className={styles['item']}
    >
      <div
        className={styles['imgContainer']}
      >
        {
          /**
           * Badges to display
           */

          badgeDisplay()
        }
        <Link
          to={`/product?id=${id}`}
        >
          <img
            className={styles['img']}
            src={url()}
          />
        </Link>
      </div>
      
      <Title
        title={name}
        productID={id}
      />

      <div
        className={styles['categoryContainer']}
      >
        {
          categories.length ? categories.map((category, i) => (
            <Chip
              key={category.id}
              className={styles['category']}
              label={category.name}
              color='secondary'
              variant='outlined'
              onClick={() => _categoryFilter(category.name)}
              size='small'
              clickable
            />
          )) : (
            <Chip
              className={styles['category']}
              label={'Unsorted'}
              color='secondary'
              variant='outlined'
              size='small'
              clickable
            />
          )
        }
      </div>

      <Typography
        className={styles['price']}
      >
        {Rand(price).format()}
      </Typography>
    </div>
  )
}

export default ShopItem
