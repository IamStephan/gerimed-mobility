import React from 'react'

// Gatsby
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

// Hooks
import { useFeaturedCategories } from '../../hooks/useFeaturedCategories'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const GridItem = props => {
  return (
    <div
      className={styles['catalogItem']}
    >
      {props.children}

      <div
        className={styles['content']}
      >
        <Typography
          className={styles['title']}
          variant='h4'
          color='primary'
        >
          {props.title}
        </Typography>

        {/* <Typography
          className={styles['total']}
        >
          • {props.total} products
        </Typography> */}
      </div>
    </div>
  )
}

const Catalog = () => {
  const { categories } = useFeaturedCategories()

  return (
    <section
      className={styles['catalogContainer']}
    >
      <div
        className={styles['catalogContent']}
      >
        {
          categories.map(({ category, showcase }) => (
            <GridItem
              key={category.id}
              title={category.name}
            >
              <img
                src={`http://localhost:1337${showcase.url}`}
                className={styles['img']}
              />
            </GridItem>
          ))
        }
      </div>
    </section>
  )
}

export default Catalog
