import React from 'react'

// Hooks
import { useInView } from 'react-intersection-observer'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE } from '../../constants/navbar'
import { MODE as FOOTERMODE } from '../../constants/footer'

// Sections
import Catalog from '../../sections/catalog'
import ShopItems from '../../sections/shopItems'

const Shop = () => {
  const [ref, inView] = useInView({
    threshold: 1
  })

  return (
    <Layout
      page={PAGES.shop}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <Catalog />
      <ShopItems />
    </Layout>
  )
}

export default Shop
