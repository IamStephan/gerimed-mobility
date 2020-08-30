import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Sections
import ContactSection from '../../sections/contact'
import MapSmall from '../../sections/mapSmall'
import FAQ from '../../sections/faq'

// Constants
import { PAGES } from '../../constants/pages'

const Contact = () => {
  return (
    <Layout
      page={PAGES.contact}
    >
      <ContactSection />
      <MapSmall />
      <FAQ />
    </Layout>
  )
}

export default Contact
