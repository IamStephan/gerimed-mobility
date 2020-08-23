import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import PolicyDetails from '../../sections/policyDetails'

const Policies = () => {
  return (
    <Layout
      page={PAGES.policies}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <PolicyDetails />
    </Layout>
  )
}

export default Policies
