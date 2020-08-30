import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import TermsDetails from '../../sections/termsDetails'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.terms}
    >
      <TermsDetails />
    </Layout>
  )
}

export default TermConditions
