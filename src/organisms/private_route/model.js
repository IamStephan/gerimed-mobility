const GET_USER_INFO = `
  query {
    meMore {
      first_name
      last_name
      email
      phone
      confirmed
      settings {
        news_letter
      }
      address {
        addressLineOne
        addressLineTwo
        suburb
        post_code
        province
        country
      }
    }
  }
`

const GET_USER_PURCHASE_HISTORY = ''

export {
  GET_USER_INFO
}