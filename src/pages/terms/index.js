import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import LegalDetails from '../../sections/legalDetails'

const Terms = () => {
  return (
    <Layout
      page={PAGES.terms}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <LegalDetails />
    </Layout>
  )
}

export default Terms
