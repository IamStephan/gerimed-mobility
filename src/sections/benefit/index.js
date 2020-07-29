import React, { useState } from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// React Spring
import { useSprings, animated } from 'react-spring'

// Styles
import styles from './styles.module.scss'

// Item Constants
/**
 * NOTE:
 * =====
 * Make sure the images are named named in the order they appear
 */
const ITEMS = [
  {
    imgRelativePath: 'gallery/benefit/benefit_1.jpg',
    imgName: 'benefit_1.jpg',
    alt: 'asd',
  },
  {
    imgRelativePath: 'gallery/benefit/benefit_2.jpg',
    imgName: 'benefit_2.jpg',
    alt: 'asd',
  },
  {
    imgRelativePath: 'gallery/benefit/benefit_3.jpg',
    imgName: 'benefit_3.jpg',
    alt: 'asd',
  }
]

const Benefit = () => {
  const [index, setIndex] = useState(0)

  /**
   * NOTE:
   * =====
   * values to take into account:
   *  - index of the carousel
   *  - i of the item in the list
   *  - the length of ITEMS
   * 
   * Index should be used as the offset value
   */
  const items = useSprings(ITEMS.length, ITEMS.map((_, i) => ({
    transform: `translateX(${(i - index) * 100}%)`
  })))

  const images = useStaticQuery(graphql`
    query {
      allFile(filter: {relativePath: {regex: "/gallery/benefit/*/"}}) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)


  function setCarouselIndex(i) {
    setIndex(i)
  }

  return (
    <section
      className={styles['benefitSection']}
    >
      <div
        className={styles['benefitContainer']}
      >
        <div
          className={styles['images']}
        >
          {
            items.map((props, i) => (
              <animated.div
                style={props}
                className={styles['itemContainer']}
              >
                <div
                  className={styles['item']}
                >
                  <Img
                    className={styles['img']}
                    alt={ITEMS[i].alt}
                    fluid={images.allFile.nodes[i].childImageSharp.fluid}
                  />
                </div>
              </animated.div>
            ))
          }
        </div>

        <div
          className={styles['controls']}
        >
          <button
            onClick={() => {
              setCarouselIndex(index - 1)
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              setCarouselIndex(index + 1)
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Benefit
