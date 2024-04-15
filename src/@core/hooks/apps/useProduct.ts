import { useEffect, useMemo, useRef } from 'react'

// ** Third Party Imports
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** import custom hooks
import { RootState, AppDispatch } from 'src/store'

import { productSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { ProductForm, ProductKeys, ProductApi } from 'src/types/apps/product'

// ** import API services
import { ExportList, csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/product'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { payloadHandler } from 'src/@core/helper/payloadHandler'
import { pick } from 'lodash'

// @ts-ignore
const defaultValues: ProductForm = {
  description: '',
  size: '',
  shippingWeight: '',

  // first_name:"",
  // last_name:"",
  // // @ts-ignore
  // title: "",
  // description: "",
  // // price: 1,
  // size:"",
  // featured_image: "",
  // categories: [],
  // benifits:[],
  // ingredients:[],
  // useSteps:[],
  variations: [
    {
      // @ts-ignore
      quantity: null,
      // @ts-ignore
      price: null,
      affiliate: 'CUSTOMER'
    },
    {
      // @ts-ignore
      quantity: null,
      // @ts-ignore
      price: null,
      affiliate: 'CUSTOMER_WHOLESALE'
    },
    {
      // @ts-ignore
      quantity: null,
      // @ts-ignore
      price: null,
      affiliate: 'CITY_MANAGER'
    },
    {
      // @ts-ignore
      quantity: null,
      // @ts-ignore
      price: null,
      affiliate: 'STATE_MANAGER'
    },
    {
      // @ts-ignore
      quantity: null,
      // @ts-ignore
      price: null,
      affiliate: 'REGIONAL_MANAGER'
    },
    {
      // @ts-ignore
      quantity: null,
      // @ts-ignore
      price: null,
      affiliate: 'NATIONAL_MANAGER'
    }
  ]
}

export const useProduct = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    resolver: yupResolver(productSchema.add)
  })
  const variation_handler = useFieldArray({
    control: form.control,
    name: 'variations'
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction({ id: serviceId }))
  }, [serviceId])

  useMemo(() => {
    if (serviceId && store.entity && 'id' in store.entity) {
      const values = pick(store.entity, [
        'title',
        'description',
        'size',
        'categories',
        'benifits',
        'ingredients',
        'useSteps',
        'featured_image',
        'commission',
        'weight',
        'shippingWeight'
      ])

      const formData = {
        ...values,
        variations: store.entity.variations.map(variation => ({ price: variation.price, quantity: variation.quantity }))
      }

      form.reset({
        ...form.getValues(),
        ...formData,
        variations: form.getValues('variations').map((el, i) => ({ ...el, ...formData.variations[i] }))
      })
    }
  }, [store.entity, serviceId])

  const getProduct = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getProducts = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addProduct = async (data: ProductForm) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const updateProduct = async (id: string, data: ProductForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const deleteProduct = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        handleModal(null)
      })
    })
  }

  const exportProducts = async () => {
    csvDownload(ExportList.product, store.entities)
  }

  return {
    form,
    store,
    variation_handler,
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    exportProducts
  }
}
