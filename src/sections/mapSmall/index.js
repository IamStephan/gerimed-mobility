import React from 'react'

// SVGs
import Map from '../../svg/psuedo_map.svg'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const MapSmall = () => {
  return (
    <Section
      className={styles['mapSmallSection']}
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
      </div>

      <div
        className={styles['topDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
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
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>
    </Section>
  )
}

export default MapSmall
