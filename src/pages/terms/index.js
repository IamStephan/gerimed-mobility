import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import TermsDetails from '../../sections/termsDetails'

const TermConditions = () => {
  return (
    <Layout
      page={PAGES.terms}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <TermsDetails />
    </Layout>
  )
}

export default TermConditions
