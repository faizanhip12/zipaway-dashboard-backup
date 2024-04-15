import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required('Name is a required field').min(3).max(100),
    order: yup.number().required('Order is a required field').min(1).max(5).typeError(''),
    // title: yup.string().optional().min(3).max(100),
    iamge: yup.string().optional()
  })
}
