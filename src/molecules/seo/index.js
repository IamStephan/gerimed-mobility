import React from 'react'

// React Helmet
import { Helmet } from "react-helmet"

// Gatsby
import { useStaticQuery, graphql } from "gatsby"

const STATIC_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

const SEO = props => {
  const {
    description,
    lang = 'en',
    meta = [],
    title 
  } = props
  
  const { site } = useStaticQuery(STATIC_QUERY)

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
