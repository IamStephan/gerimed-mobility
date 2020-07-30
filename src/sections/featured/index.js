import React from 'react'

// Material
import { Typography, Card, CardHeader, CardMedia, CardActions, IconButton } from '@material-ui/core'
import { VisibilityOutlined, FavoriteOutlined, ShoppingCartOutlined } from '@material-ui/icons'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// Styles
import styles from './styles.module.scss'

/**
 * NOTE:
 * =====
 * These images and entire section imports images ineffeciently
 * these images will be loaded dynamically but this is just a show case
 */

const PRUDUCT_LIST = [
  {
    name: 'Wheelchair – Classique',
    price: 'R1 500',
    img: 'product1'
  },
  {
    name: 'Electric Wheelchair – Explorer',
    price: 'R26 500',
    img: 'product2'
  },
  {
    name: 'Drive Medical – R8 Aluminium',
    price: 'R3 000',
    img: 'product3'
  },
  {
    name: 'Hospital bed – Manual',
    price: 'R12 000',
    img: 'product4'
  }
]

 const Product = props => {
    return (
      <div
        className={styles['product']}
      >
        <Card
          style={{
            boxShadow: 'none'
          }}
        >
          <CardHeader
            title={props.name}
            subheader={props.price}
          />

          <CardMedia
            component={() => (
              <div
                className={styles['imgContainer']}
              >
                <Img
                  className={styles['img']}
                  fluid={props.img}
                />
              </div>
            )}
          />

          <CardActions>
            <IconButton>
              <ShoppingCartOutlined />
            </IconButton>

            <IconButton>
              <FavoriteOutlined />
            </IconButton>
            
            <IconButton
              className={styles['action']}
            >
              <VisibilityOutlined />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
 }

const Featured = () => {
  const images = useStaticQuery(graphql`
    query {
      product1: file(relativePath: {eq: "gallery/temp_products/product_1.png"}) {
        childImageSharp {
          fluid (maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      product2: file(relativePath: {eq: "gallery/temp_products/product_2.png"}) {
        childImageSharp {
          fluid (maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      product3: file(relativePath: {eq: "gallery/temp_products/product_3.png"}) {
        childImageSharp {
          fluid (maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      product4: file(relativePath: {eq: "gallery/temp_products/product_4.png"}) {
        childImageSharp {
          fluid (maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <section
      className={styles['featuredSection']}
    >
      <div
        className={styles['topDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>
      
      <div
        className={styles['featuredContainer']}
      >
        <Typography
          className={styles['title']}
          variant='h3'
          color='secondary'
        >
          Our popular products
        </Typography>

        <div
          className={styles['showcase']}
        >
          {
            PRUDUCT_LIST.map((item, i) => (
              <Product
                key={i}
                name={item.name}
                price={item.price}
                img={images[item.img].childImageSharp.fluid}
              />
            ))
          }
        </div>
      </div>

      <div
        className={styles['bottomDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>
    </section>
  )
}

export default Featured
