import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import PolicyDetails from '../../sections/policyDetails'

// SEO
import SEO from '../../molecules/seo'

const Policies = () => {
  return (
    <Layout
      page={PAGES.policies}
    >
      <SEO
        title='Privacy Policy'
        description='Gerimed Mobility Home'
      />
      <PolicyDetails />
    </Layout>
  )
}

export default Policies
