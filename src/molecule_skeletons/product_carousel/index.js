import React from 'react'

// Material
import { Skeleton } from '@material-ui/lab'

// Styles
import styles from './styles.module.scss'

const ProductCarousel = () => {

  return (
    <div
      className={styles['skeletonContainer']}
    >
      <Skeleton
        variant='rect'
        className={styles['skeleton']}
      />
    </div>
  )
}

export default ProductCarousel
