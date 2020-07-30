import React from "react"

// Hooks
import { useInView } from 'react-intersection-observer'

// Components
import Layout from '../components/layout'

// Constants
import { PAGES } from '../constants/pages'
import { MODE } from '../constants/navbar'

// Sections
import Hero from '../sections/hero'
import AlertSec from '../sections/alert'
import Catalog from '../sections/catalog'
import Featured from '../sections/featured'
import CTA from '../sections/cta'
import Benefit from '../sections/benefit'
import Testimonials from '../sections/testimonials'

// Styles
import styles from './styles.module.scss'

const IndexPage = () => {
  /**
   * NOTE:
   * ======
   * Used for switching navbar style
   */
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.45,
  })

  return (
    <Layout
      page={PAGES.home}
      mode={inView ? MODE.trans : MODE.normal}
    >
      <div
        ref={ref}
        className={styles['transDetecter']}
      />
      <Hero />
      <AlertSec />
      <Catalog />
      <Featured />
      <Benefit />
      <Testimonials />
      <CTA />
    </Layout>
  )
}

export default IndexPage
