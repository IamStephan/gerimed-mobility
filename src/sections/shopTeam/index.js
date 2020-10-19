import React from 'react'

// Material
import { Typography, Avatar } from '@material-ui/core'

// Gatbsy
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

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

const ShopTeam = () => {
  const { Team: { shopTeam: { member } } } = useStaticQuery(STATIC_QUERY)

  return (
    <Section
      className={styles['shopTeamSection']}
    >
      <Typography
        variant='h3'
        className={styles['title']}
      >
        Meet the team...
      </Typography>

      <div
        className={styles['teamContainer']}
      >
        {
          member.map((member, i) => (
            <div
              className={styles['member']}
              key={i}
            >
              <div
                className={styles['avatarContainer']}
              >
                {
                  member.profile ? (
                    <Avatar
                      className={styles['avatar']}>
                      <Img
                        fluid={member.profile.remoteImage.childImageSharp.fluid}
                        className={styles['img']}
                      />
                    </Avatar>
                  ) : (
                    <Avatar
                      className={styles['avatar']}
                    />
                  )
                }
              </div>

              <div
                className={styles['nameContainer']}
              >
                <Typography
                  className={styles['name']}
                >
                  <b>{member.name}</b>
                </Typography>
              </div>

              <div
                className={styles['titleContainer']}
              >
                <Typography
                  className={styles['name']}
                  variant='caption'
                >
                  {member.title}
                </Typography>
              </div>
            </div>
          ))
        }
      </div>
    </Section>
  )
}

export default ShopTeam
