import { Margin, Padding } from '@mui/icons-material'
import { Box, Icon, Typography } from '@mui/material'
import PendingIcon from '@mui/icons-material/Pending'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CancelIcon from '@mui/icons-material/Cancel'
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension'
import FunctionsIcon from '@mui/icons-material/Functions'
import BlockIcon from '@mui/icons-material/Block'
import React from 'react'
import Card from 'src/@core/components/apps/dashboard/Card'
import useAsync from 'src/@core/hooks/useAsync'
import { DashboardService } from 'src/services'

const Page = () => {
  const { data, status } = useAsync(DashboardService.getAll)

  return (
    <>
      <Box component={'div'} display={'flex'} flexWrap={'wrap'} gap={'45px'}>
        <Card
          icon={
            <CheckBoxIcon
              sx={{
                color: 'white'
              }}
            />
          }
          title='Approved Order'
          count={data?.data?.approved}
        />
        <Card
          icon={
            <CancelIcon
              sx={{
                color: 'white'
              }}
            />
          }
          title='Cancel Order'
          count={data?.data?.cancel}
        />
        <Card
          icon={
            <BlockIcon
              sx={{
                color: 'white'
              }}
            />
          }
          title='Rejected Orders'
          count={data?.data?.reject}
        />
        <Card
          icon={
            <SendTimeExtensionIcon
              sx={{
                color: 'white'
              }}
            />
          }
          title='Dispatch Order'
          count={data?.data?.dispatch}
        />
        <Card
          icon={
            <PendingIcon
              sx={{
                color: 'white'
              }}
            />
          }
          title='Pending Order'
          count={data?.data?.pending}
        />
        <Card
          icon={
            <FunctionsIcon
              sx={{
                color: 'white'
              }}
            />
          }
          title='Total Order'
          count={data?.data?.total}
        />
      </Box>
    </>
  )
}
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'dashboard-page'
}
export default Page
