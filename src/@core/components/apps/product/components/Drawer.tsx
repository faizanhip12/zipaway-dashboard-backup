import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Form from 'src/@core/components/apps/product/components/Form'
import CloseIcon from '@mui/icons-material/Close'
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const ProductDrawer = (props: SidebarAddUserType) => {
  const { open, toggle, serviceId } = props

  const handleClose = () => {
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: false }}
      sx={{ '& .MuiDrawer-paper': { width: 700 } }}
    >
      <DrawerHeader>
        <Typography variant='h6'>{!serviceId ? 'Add Product' : 'Update Product'}</Typography>
        <CloseIcon fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DrawerHeader>
      <Form serviceId={serviceId} />
    </Drawer>
  )
}

export default ProductDrawer
