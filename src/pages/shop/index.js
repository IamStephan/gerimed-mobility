import React from 'react'

// Template
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import FeaturedProducts from '../../sections/featured'
import ShopItems from '../../sections/shopItems'

const Shop = () => {
  return (
    <Layout
      page={PAGES.shop}
    >
      <ShopItems />

      <FeaturedProducts />
    </Layout>
  )
}

export default Shop
