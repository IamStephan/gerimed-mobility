import React from 'react'

// Material
import { Typography } from '@material-ui/core'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const AboutSec = () => {
  return (
    <Section
      className={styles['aboutSection']}
    >
      <Logo
        className={styles['logo']}
      />

      <Typography
        variant='h2'
        className={styles['title']}
      >
        This is our business
      </Typography>

      <div
        className={styles['content']}
      >
        <Typography>
          Gerimed is a family run business since 2001.
          We guarantee excellent care for the elderly in the two Private Homes for the aged in Langebaan and Kleinmond.
        </Typography>

        <br />

        <Typography>
          In our efforts to achieve this we further endeavour to make mobility for the elderly possible for as long as they are able to move with assisted aids.
          With the demand for aids in this regard, Gerimed Mobility was founded.
        </Typography>

        <br />

        <Typography>
          We strive to target the mobility needs of the elderly and to offer high quality products and good service at the best possible price.
          Our service ranges from the supply and distribution of various medical, mobility, health and hygiene products; allowing us to offer a wide array of options as far as medical aids are concerned.
        </Typography>

        <br />

        <Typography>
          Gerimed Mobility is situated in Langebaan, however we do supply customers all over the West Coast of South Africa.
        </Typography>
      </div>
    </Section>
  )
}

export default AboutSec
