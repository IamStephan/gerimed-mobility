import React from 'react'

// Template
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import LatestProducts from '../../sections/lastestProducts'
import ShopGrid from '../../sections/shopGrid'

// SEO
import SEO from '../../molecules/seo'

const Shop = () => {
  return (
    <Layout
      page={PAGES.shop}
    >
      <SEO
        title='Shop'
        description='Gerimed Mobility Home'
      />
      <ShopGrid />
      <LatestProducts />
    </Layout>
  )
}

export default Shop
