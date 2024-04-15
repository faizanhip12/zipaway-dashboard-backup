// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DataGrid, RowOptions, CreatedAtCell } from 'src/@core/components/tables'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ProductApi } from 'src/types/apps/product'
import RenderClient from 'src/@core/components/common/RenderClient'
import CopyOption from 'src/@core/components/apps/product/components/CopyOption'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useContext } from 'react'
import { IContact } from 'src/types/apps/contact'
import { fetchAllAction } from 'src/store/apps/contact'
import { Tooltip } from '@mui/material'

interface CellType {
  row: IContact
}

const Option = ({ row }: { row: string }) => {
  const ability = useContext(AbilityContext)
  return <>{ability.can('itsHaveAccess', 'product-actions') ? <RowOptions id={row} /> : null}</>
}

const columns = [
  {
    flex: 0.2,
    minWidth: 250,
    field: 'first_name',
    headerName: 'First Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>{row.first_name}</Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'last_name',
    headerName: 'Last Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.last_name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.phone}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'message',
    headerName: 'Message',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip placement='bottom-start' title={row.message}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row.message}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      )
    }
  }
]

const Table = () => {
  // ** Hooks
  const store = useSelector((state: RootState) => state.contacts)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <DataGrid
      rows={store.entities}
      columns={columns}
      loading={store.status === 'pending'}
      paginationModel={store.params.pagination}
      onPageSizeChange={newPageSize => dispatch(fetchAllAction({ query: { limit: `${newPageSize}` } }))}
      onPageChange={newPage => dispatch(fetchAllAction({ query: { page: `${newPage + 1}` } }))}
    />
  )
}

export default Table
