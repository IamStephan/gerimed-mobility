import React from 'react'

// Template
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import LatestProducts from '../../sections/lastestProducts'
import ShopGrid from '../../sections/shopGrid'

const Shop = () => {
  return (
    <Layout
      page={PAGES.shop}
    >
      <ShopGrid />

      <LatestProducts />
    </Layout>
  )
}

export default Shop
