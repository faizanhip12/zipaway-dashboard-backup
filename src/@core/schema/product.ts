import * as yup from 'yup'

export default {
  add: yup.object().shape({
    title: yup
      .string()
      .required('Title is a required field')
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be at most 100 characters'),
    description: yup
      .string()
      .required('Description is a required field')
      .min(3, 'Description must be at least 3 characters')
      .max(300, 'Description must be at most 100 characters'),
    size: yup.string().required('Size is a required field'),
    commission: yup.string().required('Commission is required'),
    // price: yup.string().required().min(1).max(10000),
    featured_image: yup.string().required('Image is required'),
    // categories: yup.array().of(yup.string()),
    // ingredients:yup.array().of(yup.string()),
    // useSteps:yup.array().of(yup.string()),
    // benifits:yup.array().of(yup.string()),
    variations: yup
      .array()
      .of(
        yup.object().shape({
          affiliate: yup.string().required(),
          quantity: yup.number().required('Quantity is required').typeError('').nullable(),
          price: yup.number().required('Price is required').typeError('').nullable()
        })
      )
      .required('Required')
  })
}
