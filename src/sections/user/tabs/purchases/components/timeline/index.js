import React, { useEffect } from 'react'

// Material
import { Chip, IconButton } from '@material-ui/core'
import { EventOutlined, NavigateNext, NavigateBefore } from '@material-ui/icons'

// Components
import AspectView from '../../../../../../components/aspectView'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Styles
import styles from './styles.module.scss'


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date) {
  const dateObj = new Date(date)

  const day = dateObj.getDate()
  const month = MONTHS[dateObj.getMonth()]
  const year = dateObj.getFullYear()

  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  return `${day > 9 ? day : '0' + day} ${month} ${year}, ${hours}:${minutes > 9 ? minutes : '0' + minutes}`
}

const A4_ASPECT_RATIO = 0.7
const BASE_ITEM_WIDTH = 225

const TimelineItem = props => {
  const {
    previewImage,
    date,
    site: {
      siteMetadata: {
        protocol,
        server,
        port
      }
    }
  } = props

  return (
    <div
      className={styles['timelineItem']}
    >
      <div
        className={styles['preview']}
      >
        <div
          className={styles['dateView']}
        >
          <Chip
            icon={<EventOutlined />}
            label={formatDate(date)}
            variant='default'
            color='secondary'
          />
        </div>

        <AspectView
          className={styles['previewItem']}
          ratio={A4_ASPECT_RATIO}
          style={{
            width: BASE_ITEM_WIDTH
          }}
        >
          <img
            className={styles['img']}
            src={`${protocol}://${server}:${port}${previewImage}`}
          />
        </AspectView>
      </div>
    </div>
  )
}

/**
 * NOTE:
 * =====
 * only show the first image from preview and show the rest
 * in a modal 
 */
const Timeline = props => {
  const {
    loadOlder,
    loadNewer,
    totalPages,
    currentPage,
    invoices,
    site
  } = props

  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: 'keepSnaps',
    align: 'center'
  })

  useEffect(() => {
    if (!embla) return
    // Added Function

  }, [embla])


  return (
    <div
      className={styles['timeline']}
    >
      <EmblaCarouselReact
        className={styles['viewport']}
      >
        <div
          className={styles['container']}
        >
          {
            currentPage <= 1 ? null : (
              <div
                className={styles['loadAction']}
              >
                <IconButton
                  color='secondary'
                  className={styles['button']}
                  onClick={loadNewer}
                >
                  <NavigateBefore
                    fontSize='36px'
                  />
                </IconButton>
              </div>
            )
          }

          {
            invoices ? (
              invoices.map((item) => (
                <TimelineItem
                  key={item.id}
                  id={item.id}
                  date={item['updated_at']}
                  site={site}
                  previewImage={item.preview[0].formats.small.url}
                />
              ))
            ) : null
          }

          {
            currentPage >= totalPages ? null : (
              <div
                className={styles['loadAction']}
              >
                <IconButton
                  color='secondary'
                  className={styles['button']}
                  onClick={loadOlder}
                >
                  <NavigateNext
                    fontSize='36px'
                  />
                </IconButton>
              </div>
            )
          }

        </div>
      </EmblaCarouselReact>
    </div>
  )
}

export default Timeline
