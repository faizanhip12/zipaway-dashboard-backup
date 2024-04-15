// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'

// ** Custom components Imports
import Form from 'src/@core/components/apps/affialtes/components/Form'

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close';

// ** Types Imports
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'


interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const AffialtesDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  const handleClose = () => {
    // reset()
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: false }}
      sx={{ '& .MuiDrawer-paper': { width: 700 } }}
    >
      <DrawerHeader>
        <Typography variant='h6'>{!serviceId ? 'Add Affiliate' : 'Update Affiliate'}</Typography>
        <CloseIcon fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DrawerHeader>
      <Form serviceId={serviceId} />
    </Drawer>
  )
}

export default AffialtesDrawer
