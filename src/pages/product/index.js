import React from 'react'

// Components
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import ProductShowcase from '../../sections/productShowcase'
import FeaturedProducts from '../../sections/featured'

const Product = () => {
  return (
    <Layout
      page={PAGES.product}
    >
      <ProductShowcase />
      <FeaturedProducts />
    </Layout>
  )
}

export default Product
