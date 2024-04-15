import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'

// ** Third Party Imports

import Form from 'src/@core/components/apps/order/components/Form'

// ** import form support components

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close';


// ** Types Imports
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'


interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const OrderDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  const handleClose = () => {
    // form.reset()
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
        <Typography variant='h6'>{!serviceId ? 'Add Order' : 'Update Order'}</Typography>
        <CloseIcon fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DrawerHeader>
      <Form serviceId={serviceId} />
    </Drawer>
  )
}

export default OrderDrawer
