import { useEffect } from 'react'
import ProductTable from 'src/@core/components/apps/product/components/Table'
import TableHeader from 'src/@core/components/apps/product/components/TableHeader'
import ProductDrawer from 'src/@core/components/apps/product/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useProduct } from 'src/@core/hooks/apps/useProduct'
import { useDispatch } from 'react-redux'
import { ProductSlice } from 'src/store/apps/product'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const { store, getProducts, deleteProduct, exportProducts } = useProduct(serviceId)
  const dispatch = useDispatch()

  useEffect(() => {
    getProducts({ query: {} })
    return () => {
      dispatch(ProductSlice.actions.resetQuery())
    }
  }, [])

  const handleDeleteProduct = () => {
    serviceId && deleteProduct(serviceId)
  }

  return (
    <>
      <TableHeader
        value={''}
        handleFilter={() => {
          console.log('')
        }}
        toggle={() => handleDrawer(null)}
        exportTable={() => exportProducts()}
      />
      <ProductTable />
      <ProductDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='product' type={ModalType.DEFAULT} onAgree={() => handleDeleteProduct()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'product-page'
}

export default Page
