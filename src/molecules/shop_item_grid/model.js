const ProductsQuery = `
  query(
    $limit: Int!,
    $offset: Int!,
    $filter: JSON!
  ) {
    products(
      limit: $limit,
      start: $offset,
      where: $filter,
      sort: "name:asc"
    ) {
      id
      name
      price
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
    }

    productsConnection(
      where: $filter
    ) {
      aggregate {
        count
      }
    }
  }
`

export {
  ProductsQuery
}