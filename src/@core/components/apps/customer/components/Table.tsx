// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DataGrid, CreatedAtCell } from 'src/@core/components/tables'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CustomerApi } from 'src/types/apps/customer'
import RenderClient from 'src/@core/components/common/RenderClient'
import { fetchAllAction } from 'src/store/apps/customer'
import { Tooltip } from '@mui/material'

interface CellType {
  row: CustomerApi
}

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            {/* @ts-ignore */}
            <RenderClient imageUrl={row.image} name={row.first_name} />
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.first_name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'affiliate',
    headerName: 'Affiliate',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.affiliate?.first_name} {row?.affiliate?.last_name}
            </Typography>
          </Box>
        </Box>
      )
    },
    filterable: false,
    sortable: false
  },
  {
    flex: 0.1,
    minWidth: 50,
    field: 'order',
    headerName: 'order',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.orders.length || 0}
            </Typography>
          </Box>
        </Box>
      )
    },
    filterable: false,
    sortable: false
  },
  {
    flex: 0.2,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip placement='bottom-start' title={`${row.createdAt || new Date()}`}>
          <CreatedAtCell createdAt={row.createdAt || new Date()} />
        </Tooltip>
      )
    },
    filterable: false,
    sortable: false
  }
]

const Table = () => {
  const store = useSelector((state: RootState) => state.customer)

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
