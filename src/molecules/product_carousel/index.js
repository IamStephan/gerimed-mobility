import React, { useEffect, useCallback } from 'react'

// Hooks
import { useEmblaCarousel } from 'embla-carousel/react'

// Utils
import { strapiImageUrl } from '../../utils/js'

// Molecules
import AspectView from '../aspect_view'

// Styles
import styles from './styles.module.scss'

const ProductCarousel = (props) => {
  const {
    images = [],
    index = 0,
    setIndex
  } = props

  const [emblaRef, embla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'start',
  })

  const url = useCallback((url, formats) => {
    const preferedSize = 'small'
    const baseUrl = process.env.GATSBY_API_URL

    return strapiImageUrl(preferedSize, baseUrl, url, formats)
  }, [])

  /**
   * Stops the carousel freezing
   */
  useEffect(() => {
    if(!embla || !images) return

    embla.reInit()
  }, [images, embla])

  /**
   * Set the index on scroll
   */
  useEffect(() => {
    if(!embla || !images) return

    embla.on('select', () => {
      setIndex(embla.selectedScrollSnap())
    })
  }, [images, embla])

  /**
   * Updates the index based on an external event
   */
  useEffect(() => {
    if(!embla || !images) return

    embla.scrollTo(index)
  }, [index])

  return (
    <div
      className={styles['productRow']}
    >
      <div
        className={styles['rowViewport']}
        ref={emblaRef}
      >
        <div
          className={styles['rowContainer']}
        >
          {
            images.map((image, i) => (
              <AspectView
                ratio={1}
                key={image.url}
                className={styles['rowItem']}
              >
                <img
                  className={styles['img']}
                  src={url(images[i].url, images[i].formats)}
                />
              </AspectView>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel
