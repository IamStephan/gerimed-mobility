import React from 'react'

// Material
import { Skeleton } from '@material-ui/lab'

// Styles
import styles from './styles.module.scss'

const ProductCarouselThumbSkeleton = () => {
  return (
    <div
      className={styles['skeletonContainer']}
    >
      <Skeleton
        variant='rect'
        className={styles['skeleton']}
      />
      <Skeleton
        variant='rect'
        className={styles['skeleton']}
      />
    </div>
  )
}

export default ProductCarouselThumbSkeleton
