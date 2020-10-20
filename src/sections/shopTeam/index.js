import React, { useEffect } from 'react'

// Material
import { Typography, Avatar } from '@material-ui/core'

// Gatbsy
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// Carousel
import { useEmblaCarousel } from 'embla-carousel/react'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

// Static Queries
const STATIC_QUERY = graphql`
  query {
    Team: strapiTeam {
      shopTeam {
        member {
          name
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

const TeamMember = props => {
  return (
    <div
      className={styles['member']}
    >
      {
        props.children
      }

      <Typography
        className={styles['name']}
      >
        <b>Stephan Burger</b>
      </Typography>

      <Typography
        className={styles['personTitle']}
      >
        CEO, Avvent Studio
      </Typography>
    </div>
  )
}

const ShopTeam = () => {
  const { Team: { shopTeam: { member } } } = useStaticQuery(STATIC_QUERY)

  const allMembers = [
    ...member,
    ...member,
    ...member,
    ...member,
    ...member,
    ...member,
    ...member,
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
      className={styles['teamSection']}
    >
      <Typography
        className={styles['title']}
        variant='h3'
      >
        Meet the team
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
            {allMembers.map((person, i) => (
              <div
                className={styles['slide']}
                key={i}
              >
                <TeamMember
                  name={person.name}
                  title={person.title}
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
                </TeamMember>
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

export default ShopTeam
