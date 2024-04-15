import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** import custom hooks
import { RootState, AppDispatch } from 'src/store'

import { comissionsSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { ComissionsForm, ComissionsKeys, ComissionsApi } from 'src/types/apps/comissions'

// ** import API services
import { ExportList, csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/comissions'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { payloadHandler } from 'src/@core/helper/payloadHandler'

// @ts-ignore
const defaultValues: ComissionsForm = {
  orderId: '',
  payment: '',
  status: '',
  affiliate: {
    first_name: '',
    last_name: '',
    email: '',
    commisionPercentage: 50
  },

}

export const useComissions = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.comissions)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(comissionsSchema.add)
  })
  // const variation_handler = useFieldArray({
  //   control: form.control,
  //   name: 'variations'
  // })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction({ id: serviceId }))
  }, [serviceId])

  useMemo(() => {
    if ('id' in store.entity && store.entity && serviceId) {
      setFormValues<ComissionsKeys, ComissionsApi>(store.entity, (key, value) => {
        form.setValue(key, value)
      })
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getComissions = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getComissionss = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addComissions = async (data: ComissionsForm) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const updateComissions = async (id: string, data: ComissionsForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const deleteComissions = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        handleModal(null)
      })
    })
  }

  const exportComissions = async () => {
    csvDownload(ExportList.affialtes, store.entities)
  }

  return {
    form,
    store,
    // variation_handler,
    getComissions,
    getComissionss,
    addComissions,
    updateComissions,
    deleteComissions,
    exportComissions
  }
}
