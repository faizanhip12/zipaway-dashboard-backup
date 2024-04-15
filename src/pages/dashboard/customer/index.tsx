import { useEffect, useState } from 'react'
import CustomerTable from 'src/@core/components/apps/customer/components/Table'
import TableHeader from 'src/@core/components/apps/customer/components/TableHeader'
import CustomerDrawer from 'src/@core/components/apps/customer/components/Drawer'
import SelectOne from 'src/@core/components/apps/category/components/SelectOne'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useCustomer } from 'src/@core/hooks/apps/useCustomer'
import MultipleInput from 'src/@core/components/common/MultipleInput'
import { useDispatch } from 'react-redux'
import { CustomerSlice } from 'src/store/apps/customer'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const [fieldArray, setFieldArray] = useState<string[]>([])

  const { store, getCustomers, deleteCustomer, exportCustomers } = useCustomer(serviceId)
  const dispatch = useDispatch()

  useEffect(() => {
    getCustomers({ query: {} })
    return () => {
      dispatch(CustomerSlice.actions.resetQuery())
    }
  }, [])

  const handleDeleteChannel = () => {
    serviceId && deleteCustomer(serviceId)
  }

  return (
    <>
      <TableHeader
        value={''}
        handleFilter={() => {
          console.log('')
        }}
        toggle={() => handleDrawer(null)}
        exportTable={() => exportCustomers()}
      />
      <CustomerTable />
      <CustomerDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='customer' type={ModalType.DEFAULT} onAgree={() => handleDeleteChannel()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'customer-page'
}

export default Page
