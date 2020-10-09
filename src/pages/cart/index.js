import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import CartView from '../../sections/cartView'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.cart}
    >
      <CartView />
    </Layout>
  )
}

export default TermConditions