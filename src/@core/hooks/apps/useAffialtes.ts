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

import { affialtesSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { AffiliatesForm, AffiliatesKeys, AffiliatesApi } from 'src/types/apps/affiliates'
import { pick } from 'lodash'

// ** import API services
import { ExportList, csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/affialtes'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { payloadHandler } from 'src/@core/helper/payloadHandler'

const defaultValues: AffiliatesForm = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  referCode: ''
}

export const useAffialtes = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.affialtes)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(affialtesSchema.add)
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
      const test = pick(store.entity, ['first_name', 'last_name', 'email', 'phone'])

      setFormValues<AffiliatesKeys, AffiliatesApi>(
        // @ts-ignore
        test,
        (key, value) => {
          form.setValue(key, value)
        }
      )
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getAffialtes = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getAffialtess = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addAffialtes = async (data: AffiliatesForm) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const updateAffialtes = async (id: string, data: AffiliatesForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        form.reset()
        handleDrawer(null)
      })
    })
  }

  const deleteAffialtes = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      payloadHandler(payload, () => {
        handleModal(null)
      })
    })
  }

  const exportAffialtess = async () => {
    csvDownload(ExportList.affialtes, store.entities)
  }

  return {
    form,
    store,
    // variation_handler,
    getAffialtes,
    getAffialtess,
    addAffialtes,
    updateAffialtes,
    deleteAffialtes,
    exportAffialtess
  }
}
