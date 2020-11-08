import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import AboutSection from '../../sections/about'
import PsuedoMap from '../../sections/pseudoMap'
import ShopGallery from '../../sections/shopGallery'
// import ShopTeam from '../../sections/shopTeam'

// SEO
import SEO from '../../molecules/seo'

const About = () => {
  return (
    <Layout
      page={PAGES.about}
    >
      <SEO
        title='About Us'
        description='Gerimed Mobility Home'
      />
      <PsuedoMap />
      <AboutSection />
      {/* <ShopTeam /> */}
      <ShopGallery />
    </Layout>
  )
}

export default About
