// @ts-nocheck

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DataGrid } from 'src/@core/components/tables'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import RenderClient from 'src/@core/components/common/RenderClient'
import { fetchAllAction } from 'src/store/apps/comissions'
import { ComissionsApi } from 'src/types/apps/comissions'

interface CellType {
  row: ComissionsApi
}
const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'order.orderNo',
    headerName: 'Order',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              #{row.order.orderNo}
            </Typography>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              Status {row.order.status}
            </Typography>
          </Box>
        </Box>
      )
    },
    sortable: false,
    filterable: false
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'order.user.id',
    headerName: 'Buyer',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <RenderClient
              imageUrl={row?.affiliate?.profile_picture}
              name={row?.order?.user?.first_name + ' ' + row?.order?.user?.last_name}
            />
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.order?.user?.first_name + ' ' + row?.order?.user?.last_name}
            </Typography>
          </Box>
        </Box>
      )
    },
    sortable: false,
    filterable: false
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: 'Commission Affiliate',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <RenderClient
              imageUrl={row?.affiliate?.profile_picture}
              name={row?.affiliate?.first_name + ' ' + row?.affiliate?.last_name}
            />
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.affiliate?.first_name} {row?.affiliate?.last_name}
            </Typography>
          </Box>
        </Box>
      )
    },
    sortable: false,
    filterable: false
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'order.product.title',
    headerName: 'Product',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.product.title}
            </Typography>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.product.size}
            </Typography>
          </Box>
        </Box>
      )
    },
    sortable: false,
    filterable: false
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'order.variation.price',
    headerName: 'Variation',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              ${row.variation.price} / {row.variation.quantity} Qunatity
            </Typography>
            <Typography noWrap variant='caption' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.variation.affiliate}
            </Typography>
          </Box>
        </Box>
      )
    },
    sortable: false,
    filterable: false
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Paymet',
    headerName: 'Commission Amount',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              ${(+row.payment).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      )
    },
    sortable: false,
    filterable: false
  }
]

const Table = () => {
  const store = useSelector((state: RootState) => state.comissions)

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
