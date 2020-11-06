import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import TrackerShowcase from '../../sections/trackerShowcase'
import TrackerSection from '../../sections/tracker'

// SEO
import SEO from '../../molecules/seo'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.tracker}
      enableTransMode={true}
    >
      <SEO
        title='Track Your Order'
        description='Gerimed Mobility Home'
      />
      <TrackerShowcase />
      <TrackerSection />
    </Layout>
  )
}

export default TermConditions
