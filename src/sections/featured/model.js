/**
 * Get the latest products
 * by update date
 */

const FeaturedProducts = `
  query(
    $limit: Int!
  ) {
    products(
      sort: "updatedAt:asc",
      limit: $limit,
      start: 0
    ) {
      name
      price
      categories {
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