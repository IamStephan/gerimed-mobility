import * as yup from 'yup'

// Schema Definition
const registerShema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*\d)/g, 'Password must contain at least one number')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .required(),
  terms: yup.boolean().equals([true])
})

export {
  registerShema
}