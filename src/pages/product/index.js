import React from 'react'

// Components
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import ProductShowcase from '../../sections/productShowcase'
import LatestProducts from '../../sections/lastestProducts'

// SEO
import SEO from '../../molecules/seo'

const Product = () => {
  return (
    <Layout
      page={PAGES.product}
    >
      <SEO
        title='Product'
        description='Gerimed Mobility Home'
      />
      <ProductShowcase />
      <LatestProducts />
    </Layout>
  )
}

export default Product
