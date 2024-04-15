import * as yup from 'yup'

export default {
  add: yup.object().shape({
    link: yup.string().required(),
    order: yup.number().required().min(1).max(1000),
    image: yup.string().required(),
  }),
}
