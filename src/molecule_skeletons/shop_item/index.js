import React from 'react'

// Material
import { Typography, Chip, Link as Btn } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

// Styles
import styles from './styles.module.scss'

// Constants
const CHIP_ARRAY_LENGTH = 2

const Title = () => {
  return (
    <Typography>
      <Skeleton  />
      <Skeleton  />
    </Typography>
  )
}

const ShopItem = () => {

  const dummyChips = Array(CHIP_ARRAY_LENGTH).fill(1)

  return (
    <div
      className={styles['item']}
    >
      <div
        className={styles['imgContainer']}
      >
        <Skeleton
          className={styles['img']}
          variant='rect'
        />
      </div>
      
      <Title />

      <div
        className={styles['categoryContainer']}
      >
        {
          dummyChips.map((key, i) => (
            <Skeleton
              key={key + i}
              className={styles['category']}
            >
              <Chip
                label={'Dummy Data'}
                color='secondary'
                variant='outlined'
                size='small'
              />
            </Skeleton>
          ))
        }
      </div>

      <Typography
        className={styles['price']}
      >
        <Skeleton />
      </Typography>
    </div>
  )
}

export default ShopItem
