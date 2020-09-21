import React, { useEffect } from 'react'

// Material
import { Chip } from '@material-ui/core'
import { EventOutlined, CloudDownloadOutlined } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'

// Gatsby
import { Link } from 'gatsby'

// Components
import AspectView from '../../../../../../molecules/aspect_view'

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
    pdfURL,
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
        className={styles['dateView']}
      >
        <Chip
          icon={<EventOutlined />}
          label={formatDate(date)}
          variant='outlined'
          color='secondary'
        />
      </div>
      <div
        className={styles['preview']}
      >
        <AspectView
          className={styles['previewItem']}
          ratio={A4_ASPECT_RATIO}
          style={{
            width: BASE_ITEM_WIDTH
          }}
        >
          <img
            className={styles['img']}
            // Only render the first page (The PDF will contain the rest)
            src={`${protocol}://${server}:${port}${previewImage[0].formats.small.url}`}
          />
        </AspectView>

        <div
          className={styles['chipView']}
        >
          <Chip
            icon={<CloudDownloadOutlined />}
            label='Download PDF'
            className={styles['customChip']}
            variant='default'
            color='secondary'
            clickable
            component={Link}
            target='_blank'
            download
            to={`${protocol}://${server}:${port}${pdfURL}`}
          />
        </div>
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
    handlePageChange,
    totalPages,
    currentPage,
    invoices,
    site
  } = props

  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: 'keepSnaps',
    align: 'start'
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
            invoices ? (
              invoices.map((item) => (
                <TimelineItem
                  key={item.id}
                  id={item.id}
                  date={item['updated_at']}
                  site={site}
                  previewImage={item.preview}
                  pdfURL={item.pdf.url}
                />
              ))
            ) : null
          }
        </div>
      </EmblaCarouselReact>
      <div
        className={styles['pagination']}
      >
        <Pagination
          color='secondary'
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}

          siblingCount={1}
          boundaryCount={1}
        />
      </div>
    </div>
  )
}

export default Timeline
