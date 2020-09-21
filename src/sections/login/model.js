import * as yup from 'yup'

const FormModel = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
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
  FormModel,
  LoginMutation
}