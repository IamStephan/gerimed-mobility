import React from "react"

// Hooks
import { useInView } from 'react-intersection-observer'

// Components
import Layout from '../components/layout'
import SEO from '../components/seo'

// Constants
import { PAGES } from '../constants/pages'
import { MODE as NAVMODE } from '../constants/navbar'
import { MODE as FOOTERMODE } from '../constants/footer'

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
      navMode={inView ? NAVMODE.trans : NAVMODE.normal}
      footerMode={FOOTERMODE.normal}
    >
      <SEO
        title='Home'
        description='Gerimed Mobility Home'
      />
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
