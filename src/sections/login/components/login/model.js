import * as yup from 'yup'

const LoginSchema = yup.object().shape({
  identifier: yup.string().email('Please provide a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  remember: yup.boolean()
})

const LoginMutation = `
  mutation($credentials: UsersPermissionsLoginInput!){
    login (input: $credentials){
      jwt
      user {
        confirmed
      }
    }
  }
`

export {
  LoginSchema,
  LoginMutation
}