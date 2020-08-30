import React, { useEffect, useState, useCallback } from 'react'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Quesy string
import { parse } from 'qs'

// Gatbsy
import { navigate } from 'gatsby'

// Hooks
import { useFetch } from 'use-http'
import { usePreviousDistinct } from 'react-use'

// Router
import { useLocation } from '@reach/router'

// Styles
import styles from './styles.module.scss'

const QUERY = `
  query Product($id: ID!) {
    product(id: $id) {
      name
      description
      price
      showcase {
        url
        formats
      }
      
      categories {
        id
        name
      }
    }
  }
`

/**
 * TODO:
 * ======
 * - detect a change in id and do a full reset
 */

const ProductShowcase = () => {
  // Current ProductID (For full resets)
  const [productID, setProductID] = useState(null)
  // images for the product
  const [images, setImages] = useState([])
  // Carousel index
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Track the URL and the product ID (For full resets)
  const previousProductID = usePreviousDistinct(productID)
  
  // Query based operations based on URL
  const location = useLocation()

  // HTTP request for the product
  const { query, error } = useFetch('/graphql')

  // Carousels
  const [showcaseRef, emblaShowcase] = useEmblaCarousel()
  const [thumbRef, emblaThumb] = useEmblaCarousel({
    containScroll: 'keepSnaps'
  })

  // Thumb Clicks
  const onThumbClick = useCallback((index) => {
    if(!emblaShowcase || !emblaThumb) return

    if(emblaThumb.clickAllowed()) {
      emblaShowcase.scrollTo(index)
      setSelectedIndex(index)
    }
  }, [emblaShowcase, emblaThumb])

  // When the main showcase image gets scrolled
  const onSelect = useCallback(() => {
    if(!emblaShowcase || !emblaThumb) return

    setSelectedIndex(emblaShowcase.selectedScrollSnap())
    emblaThumb.scrollTo(emblaShowcase.selectedScrollSnap())
  }, [emblaShowcase, emblaThumb])

  // When the productID gets updated
  useEffect(() => {
    // if(!location.search) {
    //   // There is no item selected redirect
    //   navigate('/shop')
    // }
    const queryString = parse(location.search, {
      ignoreQueryPrefix: true
    })

    getProduct(queryString.product)

    console.log(queryString)
  }, [location.search])

  // Stops the carousels from freezing
  useEffect(() => {
    if(!images || !emblaShowcase || !emblaThumb) return

    emblaShowcase.reInit()
    emblaThumb.reInit()
  }, [images, emblaShowcase, emblaThumb])

  // When the main showcase carousel scrolls and selects an image
  useEffect(() => {
    if(!emblaShowcase) return 

    onSelect()
    emblaShowcase.on('select', onSelect)

    return () => {
      emblaShowcase.off('select', onSelect)
    }
  }, [emblaShowcase])

  // Get the Product based on the URL
  async function getProduct(id) {
    console.log(id)
    const { data: { product } } = await query(QUERY, {
      id
    })

    if(!product) {
      // Product not found
      return
    }

    console.log(product.showcase)

    setImages(product.showcase)
  }

  function SelectPreferedImageMain(directURL, formats) {
    // select the prefered image size (if the image is to small just use the direct url)
    let url = directURL

    if(formats?.small) {
      url = formats.small.url
    }

    return `${process.env.PROTOCOL}://${process.env.SERVER}:${process.env.PORT}${url}`
  }

  function SelectPreferedImageThumb(directURL, formats) {
    // select the prefered image size (if the image is to small just use the direct url)
    let url = directURL

    if(formats?.thumbnail) {
      url = formats.thumbnail.url
    }

    return `${process.env.PROTOCOL}://${process.env.SERVER}:${process.env.PORT}${url}`
  }

  return (
    <section
      className={styles['productSection']}
    >
      <div
        className={styles['productContainer']}
      >
        <div
          className={styles['productShowcase']}
        >
          <div
            className={styles['main']}
            ref={showcaseRef}
          >
            <div
              className={styles['mainContainer']}
            >
              {
                images.map(image => (
                  <div
                    className={styles['mainImageSlide']}
                  >
                    <img
                      className={styles['mainImage']}
                      src={SelectPreferedImageMain(image.url, image.formats)}
                    />
                  </div>
                ))
              }
            </div>
          </div>

          <div
            className={styles['thumb']}
            ref={thumbRef}
          >
            <div
              className={styles['thumbContainer']}
            >
              {
                images.map((image, i) => (
                  <div
                    className={styles['thumbImageSlide']}
                    onClick={() => onThumbClick(i) }
                    style={{
                      opacity: selectedIndex == i ? 1 : 0.25
                    }}
                  >
                    <img
                      className={styles['thumbImage']}
                      src={SelectPreferedImageThumb(image.url, image.formats)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default ProductShowcase
