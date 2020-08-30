import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import ProductShowcase from '../../sections/productShowcase'
import FeaturedProducts from '../../sections/featured'

const Product = () => {
  return (
    <Layout
      page={PAGES.product}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <ProductShowcase />
      <FeaturedProducts />
    </Layout>
  )
}

export default Product
