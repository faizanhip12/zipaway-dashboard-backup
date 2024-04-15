import { useEffect } from 'react'
import AffialtesTable from 'src/@core/components/apps/affialtes/components/Table'
import TableHeader from 'src/@core/components/apps/affialtes/components/TableHeader'
import AffialtesDrawer from 'src/@core/components/apps/affialtes/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useAffialtes } from 'src/@core/hooks/apps/useAffialtes'
import { useDispatch } from 'react-redux'
import { Slice } from 'src/store/apps/affialtes'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const { getAffialtess, deleteAffialtes, exportAffialtess } = useAffialtes(serviceId)
  const dispatch = useDispatch()

  useEffect(() => {
    getAffialtess({ query: {} })
    return () => {
      dispatch(Slice.actions.resetQuery())
    }
  }, [])

  const handleDeleteProduct = () => {
    serviceId && deleteAffialtes(serviceId)
  }

  return (
    <>
      <TableHeader
        value={''}
        handleFilter={() => {
          console.log('')
        }}
        toggle={() => handleDrawer(null)}
        exportTable={() => exportAffialtess()}
      />
      <AffialtesTable />
      <AffialtesDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='affiliates' type={ModalType.DEFAULT} onAgree={() => handleDeleteProduct()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'affialtes-page'
}

export default Page
