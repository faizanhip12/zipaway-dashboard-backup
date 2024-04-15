import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** import custom hooks
import { RootState, AppDispatch } from 'src/store'

import { orderSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { IOrderForm, IOrderKeys, IOrderApi } from 'src/types/apps/order'

// ** import API services
import { ExportList, csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/order'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { payloadHandler } from 'src/@core/helper/payloadHandler'

const defaultValues: IOrderForm = {
  company_name: '',
  fullname: '',
  email: '',
  phone: 0,
  address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  sub_total: 0,
  total: 0,
  price: 0,
  quantity: 0,
  productId: '',
  orderNo: '',
  status: '',
  user: {
    first_name: '',
    last_name: '',
    email: '',
    role: {
      code: ''
    }
  },
  invoice: {
    price: 1,
    shippingPrice: 0
  },
  items: {
    length: ''
  },
  ShippingAddress: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    postalCode: '',
    state: ''
  }
}

export const useOrder = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.order)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(orderSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction({ id: serviceId }))
  }, [serviceId])

  useMemo(() => {
    if ('id' in store.entity && store.entity && serviceId) {
      setFormValues<IOrderKeys, IOrderApi>(store.entity, (key, value) => {
        form.setValue(key, value)
      })
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getOrder = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getOrders = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addOrder = async (data: IOrderForm) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const updateOrder = async (id: string, data: IOrderForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        // form.reset()
        // handleDrawer(null)
      })
    })
  }

  const deleteOrder = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        handleModal(null)
      })
    })
  }

  const exportOrders = async () => {
    csvDownload(ExportList.order, store.entities)
  }

  return {
    form,
    store,
    getOrder,
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    exportOrders
  }
}
