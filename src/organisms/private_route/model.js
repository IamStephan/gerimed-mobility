const GET_USER_INFO = `
  query {
    meDepth {
      first_name
      last_name
      email
      phone
      confirmed
      settings {
        news_letter
      }
      address {
        street
        suburb
        post_code
        province
        country
      }
    }
  }
`

export {
  GET_USER_INFO
}