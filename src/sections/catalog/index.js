import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

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
    <Section
      className={styles['catalogSection']}
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
    </Section>
  )
}

export default Catalog
