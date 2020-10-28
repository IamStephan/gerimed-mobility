// From schema
import * as yup from 'yup'

const provinces = ['EC', 'FS', 'GP', 'KZN', 'LP', 'MP', 'NC', 'NW', 'WC']
const provincesSemantic = ['Eastern Cape', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo', 'Mpumlanga', 'Northern Cape', 'North West', 'Western Cape']

const countries = ['ZA']
const countriesSemantic = ['South Africa']

const FormSchema = yup.object().shape({
  // Address
  addressLineOne: yup.string().required('Address Line is required.'),
  addressLineTwo: yup.string().required('Street is required.'),
  suburb: yup.string().required('Suburb is required.'),
  postCode: yup.number().required('Postal Code is required.'),
  province: yup.string().oneOf([...provinces]).required('Province is required.'),
  country: yup.string().oneOf([...countries]).required('Country is required.'),

  // Contact
  email: yup.string().email().required('Email Is Required.'),
  phone: yup.string()
})

export {
  FormSchema,
  provinces,
  provincesSemantic,
  countries,
  countriesSemantic
}