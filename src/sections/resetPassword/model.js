import * as yup from 'yup'

const resetPasswordSchema = yup.object().shape({
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*\d)/g, 'Password must contain at least one number')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
})

export {
  resetPasswordSchema
}