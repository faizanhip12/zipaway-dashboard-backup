import { useEffect, useState } from 'react'
import CategoryTable from 'src/@core/components/apps/category/components/Table'
import TableHeader from 'src/@core/components/apps/category/components/TableHeader'
import CategoryDrawer from 'src/@core/components/apps/category/components/Drawer'
import SelectOne from 'src/@core/components/apps/category/components/SelectOne'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useCategory } from 'src/@core/hooks/apps/useCategory'
import MultipleInput from 'src/@core/components/common/MultipleInput'
import { CategorySlice } from 'src/store/apps/category'
import { useDispatch } from 'react-redux'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const [fieldArray, setFieldArray] = useState<string[]>([])

  const { store, getCategories, deleteCategory, exportCategories } = useCategory(serviceId)
  const dispatch = useDispatch()
  useEffect(() => {
    getCategories({ query: {} })
    return () => {
      dispatch(CategorySlice.actions.resetQuery())
    }
  }, [])

  const handleDeleteChannel = () => {
    serviceId && deleteCategory(serviceId)
  }

  return (
    <>
      <TableHeader
        value={''}
        handleFilter={() => {
          console.log('')
        }}
        toggle={() => handleDrawer(null)}
        exportTable={() => exportCategories()}
      />
      <CategoryTable />
      <CategoryDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='category' type={ModalType.DEFAULT} onAgree={() => handleDeleteChannel()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'category-page'
}

export default Page
