import { useStaticQuery, graphql } from 'gatsby'

const queryToStrapiSingleType = graphql`
  query categories {
    backend {
      featured {
        categories {
          category {
            id
            name
          }
          showcase {
            formats
            url
          }
        }
      }
    }
  }
`

function properImageUrl(directUrl, formats) {
  let returnUrl = directUrl

  /**
   * just use the small variant
   */
  if(formats?.small) {
    returnUrl = formats.small.url
  }

  // if(formats?.medium) {
  //   returnUrl = formats.medium.url
  // }

  return returnUrl
}

export function useFeaturedCategories() {
  const { backend } = useStaticQuery(queryToStrapiSingleType)

  /**
   * Later assume that the values are not always present
   */
  const categoriesRaw = backend?.featured?.categories

  // Sanatize Products

  const categories = categoriesRaw.map(category => ({
    ...category,
    showcase: {
      // always get the smallest url that is not a thumbnail and is the first item
      url: properImageUrl(category.showcase.url, category.showcase.formats)
    }
  }))

  return {
    categories
  }
}