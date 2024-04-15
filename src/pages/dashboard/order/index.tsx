import { useEffect } from 'react'
import Table from 'src/@core/components/apps/order/components/Table'
import TableHeader from 'src/@core/components/apps/order/components/TableHeader'
import Drawer from 'src/@core/components/apps/order/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useOrder } from 'src/@core/hooks/apps/useOrder'
import { OrderSlice } from 'src/store/apps/order'
import { useDispatch } from 'react-redux'

const Page = () => {

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const { getOrders, deleteOrder, exportOrders } = useOrder(serviceId)
  const dispatch = useDispatch()
  useEffect(() => {
    getOrders({ query: {} })
    return () => {
      dispatch(OrderSlice.actions.resetQuery());
    }
  }, [])


  const handleDeleteChannel = () => {
    serviceId && deleteOrder(serviceId)
  }

  return (
    <>
      <TableHeader value={''}  toggle={() => handleDrawer(null)} exportTable={() => exportOrders()} />
      <Table />
      <DeleteAlert title='order' type={ModalType.DEFAULT} onAgree={() => handleDeleteChannel()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'order-page'
}

export default Page
