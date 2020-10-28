import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import CheckoutView from '../../sections/checkoutView'

// SEO
import SEO from '../../molecules/seo'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.checkout}
    >
      <SEO
        title='Checkout'
        description='Gerimed Mobility Home'
      />
      <CheckoutView />
    </Layout>
  )
}

export default TermConditions