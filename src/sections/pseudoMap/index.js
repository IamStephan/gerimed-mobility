import React from 'react'

// Material
import { Typography } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'

// SVGs
import Map from '../../svg/psuedo_map.svg'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const PseudoMap = () => {
  return (
    <Section
      className={styles['mapSection']}
      isClamped={false}
      isPadded={false}
      gutter='none'
    >
      <div
        className={styles['mapContainer']}
      >
        <Map
          className={styles['map']}
          preserveAspectRatio="xMinYMin slice"
        />

        <div
          className={styles['content']}
        >
          <div
            className={styles['info']}
          >
            <Typography
              variant='h4'
              color='primary'
              className={styles['title']}
            >
              Come visit us!
            </Typography>
            <Typography
              className={styles['text']}
            >
              844@Oostewal Building,
            </Typography>
            <Typography
              className={styles['text']}
            >
              Oostewal Rd, Langebaan
            </Typography>
            <br />
            <Typography
              className={styles['text']}
            >
              Tel: 022 772 1273
            </Typography>
          </div>

          <LocationOn
            className={styles['icon']}
          />
        </div>      
      </div>

      <div
        className={styles['bottomDivider']}
      >
        <svg
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
            <path
              d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
              class={styles['shapeFill']}/>
        </svg>
      </div>
    </Section>
  )
}

export default PseudoMap
