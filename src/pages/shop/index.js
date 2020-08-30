import React from 'react'

// Template
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import Catalog from '../../sections/catalog'
import ShopItems from '../../sections/shopItems'

const Shop = () => {
  return (
    <Layout
      page={PAGES.shop}
    >
      <Catalog />
      <ShopItems />
    </Layout>
  )
}

export default Shop
