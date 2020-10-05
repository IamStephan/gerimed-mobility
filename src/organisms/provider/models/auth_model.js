const REGISTER = `
  mutation(
    $username: String!,
    $email: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
  ) {
    signup(input: {
      username: $username,
      email: $email,
      password: $password,
      first_name: $firstName,
      last_name: $lastName
    }) {
      jwt
    }
  }
`

const LOGIN = `
  mutation(
    $email: String!,
    $password: String!,
  ) {
    signin(input: {
      identifier: $email,
      password: $password,
    }) {
      jwt
      user {
        email
        first_name
        last_name
        phone
        address {
          suburb
          country
          province
          post_code
          addressLineOne
          addressLineTwo
        }
        settings {
          news_letter
        }
      }
    }
  }
`

const FORGOT = `
  mutation(
    $email: String!
  ) {
    forgotPassword(
      email: $email
    ) {
      ok
    }
  }
`

const RESET_PASSWORD = `
  mutation(
    $password: String!
    $confirmPassword: String!
    $code: String!
  ) {
    resetPassword(
      password: $password,
      passwordConfirmation: $confirmPassword,
      code: $code
    ) {
      jwt
    }
  }
`

const GET_USER = `
  query {
    getMe {
      email
      first_name
      last_name
      phone
      address {
        suburb
        country
        province
        post_code
        addressLineOne
        addressLineTwo
      }
      settings {
        news_letter
      }
    }
  }
`

const UPDATE_ME = `
  mutation(
    $data: editUserInput
  ) {
    updateMe(
      data: $data
    ) {
      email
        first_name
        last_name
        phone
        address {
          suburb
          country
          province
          post_code
          addressLineOne
          addressLineTwo
        }
        settings {
          news_letter
        }
    }
  }
`

export {
  REGISTER,
  LOGIN,
  FORGOT,
  RESET_PASSWORD,
  GET_USER,
  UPDATE_ME
}