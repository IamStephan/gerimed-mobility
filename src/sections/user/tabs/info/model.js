import * as yup from 'yup'

const InfoSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  phone: yup.string()
})

export {
  InfoSchema
}