/**
 * Get the latest products
 * by update date
 */

 const PRODUCT_FRAGMENT = `
  id
  name
  price
  isLimited
  shopOnly
  quantity

  product_discount {
    discounted_price
  }

  showcase(
    limit: 1,
    start: 0
  ) {
    id
    url
    formats
  }
  
  categories {
    id
    name
  }
 `

const FeaturedProducts = `
  query(
    $limit: Int!
  ) {
    products(
      sort: "updatedAt:desc",
      limit: $limit,
      start: 0
    ) {
      ${PRODUCT_FRAGMENT}
    }

    promotions(
      limit: 1,
      start: 0,
      sort: "createdAt:desc"
    ) {
      promotion_name
      product_discounts {
        product {
          ${PRODUCT_FRAGMENT}
        }
      }
    }
  }
`

export {
  FeaturedProducts
}