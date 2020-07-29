import React from "react"

// Hooks
import { useInView } from 'react-intersection-observer'

// Material
//import { Button } from '@material-ui/core'

// Components
import Layout from '../components/layout'

// Constants
import { PAGES } from '../constants/pages'
import { MODE } from '../constants/navbar'

// Sections
import Hero from '../sections/hero'
import Catalog from '../sections/catalog'
import Featured from '../sections/featured'
import CTA from '../sections/cta'
import Benefit from '../sections/benefit'

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
      <Catalog />
      <Featured />
      <Benefit />
      <CTA />
    </Layout>
  )
}

export default IndexPage
