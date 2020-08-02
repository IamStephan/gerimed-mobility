import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import AboutSection from '../../sections/about'
import PsuedoMap from '../../sections/pseudoMap'
import ShopGallery from '../../sections/shopGallery'

// Styles
import styles from './styles.module.scss'

const About = () => {
  return (
    <Layout
      page={PAGES.about}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <PsuedoMap />
      <AboutSection />
      <ShopGallery />
    </Layout>
  )
}

export default About
