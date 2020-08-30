import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import AboutSection from '../../sections/about'
import PsuedoMap from '../../sections/pseudoMap'
import ShopGallery from '../../sections/shopGallery'

const About = () => {
  return (
    <Layout
      page={PAGES.about}
    >
      <PsuedoMap />
      <AboutSection />
      <ShopGallery />
    </Layout>
  )
}

export default About
