import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import PolicyDetails from '../../sections/policyDetails'

const Policies = () => {
  return (
    <Layout
      page={PAGES.policies}
    >
      <PolicyDetails />
    </Layout>
  )
}

export default Policies
