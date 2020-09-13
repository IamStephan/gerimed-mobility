/**
 * Get the latest products
 * by update date
 */

const FeaturedProducts = `
  query(
    $limit: Int!
  ) {
    products(
      sort: "updatedAt:desc",
      limit: $limit,
      start: 0
    ) {
      id
      name
      price
      categories {
        id
        name
      }
      showcase {
        url
        formats
      }
    }
  }
`

export {
  FeaturedProducts
}