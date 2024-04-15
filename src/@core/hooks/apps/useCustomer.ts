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

import { customerSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { CustomerForm, CustomerKeys, CustomerApi } from 'src/types/apps/customer'

// ** import API services
import { ExportList, csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/customer'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { payloadHandler } from 'src/@core/helper/payloadHandler'

const defaultValues: CustomerForm = {
  title: '',
  name: '',
  order: 1,
  image: '',
  first_name: '',
  email: '',
  gender: '',
  orders: []
}

export const useCustomer = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.customer)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(customerSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction({ id: serviceId }))
  }, [serviceId])

  useMemo(() => {
    if ('id' in store.entity && store.entity && serviceId) {
      setFormValues<CustomerKeys, CustomerApi>(store.entity, (key, value) => {
        form.setValue(key, value)
      })
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getCustomer = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getCustomers = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addCustomer = async (data: CustomerForm) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const updateCustomer = async (id: string, data: CustomerForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const deleteCustomer = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        handleModal(null)
      })
    })
  }

  const exportCustomers = async () => {
    csvDownload(ExportList.customer, store.entities)
  }

  return {
    form,
    store,
    getCustomer,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    exportCustomers
  }
}
