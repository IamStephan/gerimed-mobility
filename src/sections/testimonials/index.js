import React, { useEffect } from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Avatar, Typography } from '@material-ui/core'

// Gatbsy
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Styles
import styles from './styles.module.scss'

// Static Queries
const STATIC_QUERY = graphql`
  query {
    Testimonials: strapiTestimonials {
      data: testimonial {
        testimonials {
          statement
          title
          profile {
            remoteImage {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                } 
              }
            }
          }
        }
      }
    }
  }
`

const CustomerItem = props => {
  return (
    <div
      className={styles['customer']}
    >
      {
        props.children
      }

      <Typography
        className={styles['text']}
      >
        {props.testimonial}
      </Typography>

      <Typography
        className={styles['person']}
        variant='caption'
      >
        {props.person}
      </Typography>
    </div>
  )
}

const Testimonials = () => {
  const { Testimonials: { data: { testimonials } } } = useStaticQuery(STATIC_QUERY)

  const allTestimonies = [
    ...testimonials,
    ...testimonials,
  ]

  const [emblaRef, embla] = useEmblaCarousel({
    align: 'center',
    loop: true,
  })

  useEffect(() => {
    if(!embla) return

    let id = 0
    const tick = () => {
      embla.scrollNext()
      requestAnimationFrame(() => (id = setTimeout(tick, 6000)));
    }

    requestAnimationFrame(() => (id = setTimeout(tick, 6000)));

    return () => {
      if (id) clearTimeout(id);
    }
  }, [embla])

  return (
    <Section
      className={styles['testimonialSection']}
    >
      <Typography
        className={styles['title']}
        variant='h3'
        color='secondary'
      >
        Customer Satisfaction
      </Typography>

      <div
        className={styles['container']}
      >
        <div
          className={styles['leftFade']}
        />

        <div
          className={styles['itemsViewport']}
          ref={emblaRef}
        >
          <div
            className={styles['itemsRow']}
          >
            {allTestimonies.map((person, i) => (
              <div
                className={styles['slide']}
                key={i}
              >
                <CustomerItem
                  testimonial={person.statement}
                  person={person.title}
                >
                  {
                    person.profile ? (
                      <Avatar
                        className={styles['avatar']}>
                        <Img
                          fluid={person.profile.remoteImage.childImageSharp.fluid}
                          className={styles['img']}
                        />
                      </Avatar>
                    ) : (
                      <Avatar
                        className={styles['avatar']}
                      />
                    )
                  }
                </CustomerItem>
              </div>
            ))}
          </div>
        </div>

        <div
          className={styles['rightFade']}
        />
      </div>

      
    </Section>
  )
}

export default Testimonials
