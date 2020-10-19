import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import AboutSection from '../../sections/about'
import PsuedoMap from '../../sections/pseudoMap'
import ShopGallery from '../../sections/shopGallery'
import ShopTeam from '../../sections/shopTeam'

const About = () => {
  return (
    <Layout
      page={PAGES.about}
    >
      <PsuedoMap />
      <AboutSection />
      <ShopTeam />
      <ShopGallery />
    </Layout>
  )
}

export default About
