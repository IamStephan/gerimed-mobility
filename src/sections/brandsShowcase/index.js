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

    brandEight: file(relativePath: {eq: "gallery/brands/brand8.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandNine: file(relativePath: {eq: "gallery/brands/brand9.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandTen: file(relativePath: {eq: "gallery/brands/brand10.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandEleven: file(relativePath: {eq: "gallery/brands/brand11.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandTwelve: file(relativePath: {eq: "gallery/brands/brand12.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandThirdteen: file(relativePath: {eq: "gallery/brands/brand13.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440, grayscale: true) {
          ...GatsbyImageSharpFluid
        } 
      }
    }

    brandFourteen: file(relativePath: {eq: "gallery/brands/brand14.png"}) {
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
    brandEight,
    brandNine,
    brandTen,
    brandEleven,
    brandTwelve,
    brandThirdteen,
    brandFourteen,
  } = useStaticQuery(STATIC_QUERY)

  const images = [
    brandOne,
    brandTwo,
    brandThree,
    brandFour,
    brandFive,
    brandSix,
    brandSeven,
    brandEight,
    brandNine,
    brandTen,
    brandEleven,
    brandTwelve,
    brandThirdteen,
    brandFourteen,
    brandOne,
    brandTwo,
    brandThree,
    brandFour,
    brandFive,
    brandSix,
    brandSeven,
    brandEight,
    brandNine,
    brandTen,
    brandEleven,
    brandTwelve,
    brandThirdteen,
    brandFourteen,
  ]

  // console.log(brandFive)

  const [emblaRef, embla] = useEmblaCarousel({
    align: 'center',
    loop: true,
  })

  useEffect(() => {
    if(!embla) return

    let id = 0
    const tick = () => {
      embla.scrollNext()
      requestAnimationFrame(() => (id = setTimeout(tick, 1500)));
    }

    requestAnimationFrame(() => (id = setTimeout(tick, 1500)));

    return () => {
      if (id) clearTimeout(id);
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
