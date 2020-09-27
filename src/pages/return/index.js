import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import ReturnDetails from '../../sections/returnDetails'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.returnPolicy}
    >
      <ReturnDetails />
    </Layout>
  )
}

export default TermConditions
