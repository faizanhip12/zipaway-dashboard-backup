import * as yup from 'yup'

export default {
  add: yup.object().shape({
    last_name: yup.string().required().min(3).max(50),
    first_name: yup.string().required().min(3).max(50),
    phone: yup.string().optional().min(3).max(15),
    email: yup.string().required().min(3).max(50),
    password: yup.string().required().min(6).max(20),
  })
}
