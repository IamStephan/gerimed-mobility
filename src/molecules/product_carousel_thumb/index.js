import React, { useEffect, useCallback } from 'react'

// Hooks
import { useEmblaCarousel } from 'embla-carousel/react'

// Utils
import { strapiImageUrl } from '../../utils/js'

// Molecules
import AspectView from '../aspect_view'

// Styles
import styles from './styles.module.scss'

const ProductCarouselThumb = (props) => {
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
    const preferedSize = 'thumbnail'
    const baseUrl = process.env.GATSBY_API_URL

    return strapiImageUrl(preferedSize, baseUrl, url, formats)
  }, [])

  const imageSelect = useCallback((i) => {
    setIndex(i)
  }, [setIndex])

  useEffect(() => {
    if(!embla || !images) return

    embla.reInit()
  }, [images, embla])


  useEffect(() => {
    if(!embla || !images) return

    embla.scrollTo(index)
  }, [index, embla, images])

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
                className={`${styles['rowItem']} ${i === index ? styles['active'] : styles['inactive']}`}
              >
                <img // eslint-disable-line
                  className={styles['img']}
                  src={url(images[i].url, images[i].formats)}
                  alt='Product Showcase'
                  onClick={imageSelect.bind(this, i)}
                />
              </AspectView>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductCarouselThumb
