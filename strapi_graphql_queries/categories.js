module.exports = `
  query {
    categories(
      sort: "name:asc"
    ) {
      name
      id
    }
  }
`