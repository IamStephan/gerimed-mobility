import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import ReturnDetails from '../../sections/returnDetails'

// SEO
import SEO from '../../molecules/seo'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.returnPolicy}
    >
      <SEO
        title='Return Policy'
        description='Gerimed Mobility Home'
      />
      <ReturnDetails />
    </Layout>
  )
}

export default TermConditions
