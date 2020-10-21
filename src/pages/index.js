import React from "react"

// Templates
import Layout from '../templates/content_layout'

// Components
import SEO from '../molecules/seo'

// Constants
import { PAGES } from '../constants/pages'
import { MODE as FOOTERMODE } from '../constants/footer'

// Sections
import Hero from '../sections/hero'
import BrandShowcase from '../sections/brandsShowcase'
import Catalog from '../sections/catalog'
import Featured from '../sections/featured'
import CTA from '../sections/cta'
import Benefit from '../sections/benefit'
import Testimonials from '../sections/testimonials'
import Latest from '../sections/lastestProducts'

const IndexPage = () => {
  return (
    <Layout
      page={PAGES.home}
      enableTransMode={true}
      footerMode={FOOTERMODE.normal}
    >
      <SEO
        title='Home'
        description='Gerimed Mobility Home'
      />
      <Hero />
      <BrandShowcase />
      <Catalog />
      <Featured />
      <Benefit />
      {/* <Testimonials /> */}
      <Latest />
      <CTA />
    </Layout>
  )
}

export default IndexPage
