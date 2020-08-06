import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections

const ProfileTemplate = () => {
  return (
    <Layout
      page={PAGES.profile}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      asd
    </Layout>
  )
}

export default ProfileTemplate
