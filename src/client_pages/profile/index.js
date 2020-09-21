import React from 'react'

// Components
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import User from '../../sections/user'
import Showcase from '../../sections/userShowcase'

const ProfileTemplate = () => {
  return (
    <Layout
      page={PAGES.profile}
    >
      <User />
    </Layout>
  )
}

export default ProfileTemplate
