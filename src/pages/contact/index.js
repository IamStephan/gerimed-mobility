import React from 'react'

// Components
import Layout from '../../components/layout'

// Sections
import MapSmall from '../../sections/mapSmall'
import ContactSection from '../../sections/contact'
import FAQ from '../../sections/faq'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE } from '../../constants/navbar'
import { MODE as FOOTERMODE } from '../../constants/footer'

const Contact = () => {
  return (
    <Layout
      page={PAGES.contact}

      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <ContactSection />
      <MapSmall />
      <FAQ />
    </Layout>
  )
}

export default Contact
