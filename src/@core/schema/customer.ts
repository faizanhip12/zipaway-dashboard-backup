import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required().min(3).max(100),
    order: yup.number().required().min(1).max(5),
    title: yup.string().optional().min(3).max(100),
    iamge: yup.string().optional(),
    first_name: yup.string().required(),
    email: yup.string().required(),
    gender: yup.string().required(),

  })
}
