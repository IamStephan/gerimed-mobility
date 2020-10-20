import React from 'react'

// Constants
import { MODE as FOOTERMODE } from '../../constants/footer'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import NotFoundSection from '../../sections/notFound'

// Styles
import styles from './styles.module.scss'

// SEO
import SEO from '../../molecules/seo'

const NotFound = () => {
  return (
    <Layout
      page={PAGES.notfound}
      footerMode={FOOTERMODE.normal}
      className={styles['notFoundPage']}
    >
      <SEO
        title='Page Not Found'
        description='Gerimed Mobility Home'
      />
      <NotFoundSection />
    </Layout>
  )
}

export default NotFound
