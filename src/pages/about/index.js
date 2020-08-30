import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import AboutSection from '../../sections/about'
import PsuedoMap from '../../sections/pseudoMap'
import ShopGallery from '../../sections/shopGallery'

const About = () => {
  return (
    <Layout
      page={PAGES.about}
      footerMode={FOOTERMODE.curve}
    >
      <PsuedoMap />
      <AboutSection />
      <ShopGallery />
    </Layout>
  )
}

export default About
