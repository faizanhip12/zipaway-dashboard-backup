// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DataGrid, RowOptions } from 'src/@core/components/tables'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { fetchAllAction } from 'src/store/apps/affialtes'
import { AffiliatesApi } from 'src/types/apps/affiliates'

interface CellType {
  row: AffiliatesApi
}

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'first_name',
    headerName: 'name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.first_name} {row?.last_name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'email',
    headerName: 'email',
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
    minWidth: 200,
    field: 'phone',
    headerName: 'phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.phone}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'affiliate',
    headerName: 'Affiliated By',
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
    minWidth: 90,
    filterable: false,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} deleteAction={true} updateAction={true} />
  }
]

const Table = () => {
  // ** Hooks
  const store = useSelector((state: RootState) => state.affialtes)

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
