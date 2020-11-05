import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Constants
import { PAGES } from '../../constants/pages'

// Sections
import ResultsShowcase from '../../sections/resultsShowcase'
import ResultSection from '../../sections/results'

// SEO
import SEO from '../../molecules/seo'

const Results = () => {
  return (
    <Layout
      page={PAGES.results}
      enableTransMode={true}
    >
      <SEO
        title='Order Results'
        description='Gerimed Mobility Home'
      />
      <ResultsShowcase />
      <ResultSection />
    </Layout>
  )
}

export default Results
