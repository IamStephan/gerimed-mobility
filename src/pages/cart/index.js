import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import CartView from '../../sections/cartView'

// SEO
import SEO from '../../molecules/seo'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.cart}
    >
      <SEO
        title='Your Cart'
        description='Gerimed Mobility Home'
      />
      <CartView />
    </Layout>
  )
}

export default TermConditions