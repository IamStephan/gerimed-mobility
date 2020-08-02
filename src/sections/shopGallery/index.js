import React from 'react'

// Gatsby
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const ShopItem = props => {
  return (
    <div
      className={styles['shopItem']}
    >
      <Img
        className={styles['img']}
        fluid={props.img}
        alt={props.alt}
      />

      <div
        className={styles['more']}
      >
        <Typography
          variant='h4'
          color='primary'
          className={styles['header']}
        >
          {props.header}
        </Typography>

        <Typography
          className={styles['text']}
        >
          {props.text}
        </Typography>
      </div>
    </div>
  )
}

const ShopGallery = () => {
  const images = useStaticQuery(graphql`
  query {
    shop1: file(relativePath: {eq: "gallery/shop_gallery/shop1.jpg"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    shop2: file(relativePath: {eq: "gallery/shop_gallery/shop2.jpg"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    shop3: file(relativePath: {eq: "gallery/shop_gallery/shop3.jpg"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    shop4: file(relativePath: {eq: "gallery/shop_gallery/shop4.jpg"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        } 
      }
    }
  }
`)

  return (
    <section
      className={styles['shopGallerySection']}
    >
      <div
        className={styles['shopGalleryContainer']}
      >
        <Typography
          variant='h3'
          className={styles['title']}
        >
          Our local shop.
        </Typography>

        <div
          className={styles['shopGallery']}
        >
          <ShopItem
            img={images['shop1'].childImageSharp.fluid}
            alt='Gerimed Mobility Store'

            header='Local Storefront'
            text='Come and visit us locally and experience it for yourself.'
          />

          <ShopItem
            img={images['shop2'].childImageSharp.fluid}
            alt='Commodes and appliances'

            header='Showcase'
            text='Multitude of products on showcase.'
          />

          <ShopItem
            img={images['shop3'].childImageSharp.fluid}
            alt='Mobility'

            header='Mobility'
            text='All your mobility needs'
          />

          <ShopItem
            img={images['shop4'].childImageSharp.fluid}
            alt='Mobility and more products'

            header='Products'
            text='Your one stop medical supply shop'
          />
        </div>
      </div>
    </section>
  )
}

export default ShopGallery
