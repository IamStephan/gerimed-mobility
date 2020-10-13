import React, { useEffect } from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Styles
import styles from './styles.module.scss'

// Static query

const STATIC_QUERY = graphql`
  query {
    brandOne: file(relativePath: {eq: "gallery/brands/brand1.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandTwo: file(relativePath: {eq: "gallery/brands/brand2.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandThree: file(relativePath: {eq: "gallery/brands/brand3.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandFour: file(relativePath: {eq: "gallery/brands/brand4.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandFive: file(relativePath: {eq: "gallery/brands/brand5.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandSix: file(relativePath: {eq: "gallery/brands/brand6.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandSeven: file(relativePath: {eq: "gallery/brands/brand7.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }
  }
`

const BrandShowcase = () => {
  const {
    brandOne,
    brandTwo,
    brandThree,
    brandFour,
    brandFive,
    brandSix,
    brandSeven,
  } = useStaticQuery(STATIC_QUERY)

  const images = [
    brandOne,
    brandTwo,
    brandThree,
    brandFour,
    brandFive,
    brandSix,
    brandSeven,
    brandOne,
    brandTwo,
    brandThree,
    brandFour,
    brandFive,
    brandSix,
    brandSeven,
    brandTwo,
    brandThree,
    brandFour,
    brandFive,
    brandSix,
    brandSeven,
  ]

  // console.log(brandFive)

  const [emblaRef, embla] = useEmblaCarousel({
    align: 'center',
    loop: true,
  })

  useEffect(() => {
    if(!embla) return

    const intervals = setInterval(() => {
      embla.scrollNext()
    }, 1500)

    return () => {
      clearInterval(intervals)
    }
  }, [embla])

  return (
    <Section
      isClamped={false}
      isPadded={false}
      className={styles['brands']}
      gutter='bottom'
      gutterSize='xs'
    >
      <div
        className={styles['leftFade']}
      />
      <div
        className={styles['brandsViewPort']}
        ref={emblaRef}
      >
        <div
          className={styles['rowContainer']}
        >
          {images.map((image, i) => (
            <div
              className={styles['slide']}
              key={i}
            >
              <Img
                className={styles['img']}
                objectFit="contain"
                fluid={image.childImageSharp.fluid}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={styles['rightFade']}
      />
    </Section>
  )
}

export default BrandShowcase
