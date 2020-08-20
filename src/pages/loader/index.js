import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE } from '../../constants/navbar'
import { MODE as FOOTERMODE } from '../../constants/footer'

// Sections
import FullPageLoader from '../../sections/fullPageLoader'

const Loader = () => {
  return (
    <Layout
      page={PAGES.loader}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <FullPageLoader />
    </Layout>
  )
}

export default Loader