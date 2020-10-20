import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import TermsDetails from '../../sections/termsDetails'

// SEO
import SEO from '../../molecules/seo'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.terms}
    >
      <SEO
        title='Terms & Conditions'
        description='Gerimed Mobility Home'
      />
      <TermsDetails />
    </Layout>
  )
}

export default TermConditions
