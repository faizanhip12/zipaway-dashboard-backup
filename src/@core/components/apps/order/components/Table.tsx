// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DataGrid, CreatedAtCell } from 'src/@core/components/tables'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { IOrderApi } from 'src/types/apps/order'

import { fetchAllAction } from 'src/store/apps/order'
import Chip from '@mui/material/Chip'
import { FormControl, MenuItem, Select, Tooltip } from '@mui/material'
import { useOrder } from 'src/@core/hooks/apps/useOrder'
import Link from 'next/link'

interface CellType {
  row: IOrderApi
}

const UpdateOrderRow = ({ row }: { row: CellType['row'] }) => {
  const { updateOrder } = useOrder(null)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
        <FormControl fullWidth>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={row?.status}
            label='Status'
            // @ts-ignore
            onChange={e => updateOrder(row.id, { status: e.target.value })}
          >
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='dispatch'>Dispatch</MenuItem>
            <MenuItem value='reject'>Reject</MenuItem>
            <MenuItem value='cancel'>Cancel</MenuItem>
            <MenuItem value='approved'>Approved</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 100,
    field: 'orderNo',
    headerName: 'Order No',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Link href={`/dashboard/order/order-detail/?order_id=${row.id}`}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row.orderNo}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.4,
    minWidth: 300,
    field: 'User Name',
    headerName: 'User Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.user?.first_name} {row?.user?.last_name}
            </Typography>
            <Chip label={row?.user?.role?.code} sx={{ marginLeft: '10px' }} />
          </Box>
        </Box>
      )
    },
    filterable: false,
    sortable: false
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip placement='bottom-start' title={row?.user?.email}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row?.user?.email}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      )
    },
    filterable: false,
    sortable: false
  },

  {
    flex: 0.2,
    minWidth: 100,
    field: 'Price',
    headerName: 'Price',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.invoice?.price}
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
    minWidth: 100,
    field: 'ShippingPrice',
    headerName: 'Shipping Price',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.invoice?.shippingPrice}
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
    minWidth: 100,
    field: 'addressLine1',
    headerName: 'Address Line 1',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip placement='bottom-start' title={row?.ShippingAddress?.addressLine1}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row?.ShippingAddress?.addressLine1}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      )
    },
    filterable: false,
    sortable: false
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'addressLine2',
    headerName: 'Address Line 2',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip placement='bottom-start' title={row?.ShippingAddress?.addressLine2}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row?.ShippingAddress?.addressLine2}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      )
    },
    filterable: false,
    sortable: false
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'country',
    headerName: 'Country',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.ShippingAddress?.country}
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
    minWidth: 100,
    field: 'state',
    headerName: 'State',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.ShippingAddress?.state}
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
    minWidth: 100,
    field: 'city',
    headerName: 'City',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.ShippingAddress?.city}
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
    minWidth: 100,
    field: 'postalCode',
    headerName: 'Postal Code',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.ShippingAddress?.postalCode}
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
    minWidth: 120,
    field: 'quantity',
    headerName: 'Total Items',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.items?.length}
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
    minWidth: 200,
    field: 'action',
    headerName: 'Update Order',
    renderCell: ({ row }: CellType) => <UpdateOrderRow row={row} />,
    filterable: false,
    sortable: false
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: ({ row }: CellType) => {
      return <CreatedAtCell createdAt={row.createdAt || new Date()} />
    },
    filterable: false,
    sortable: false
  }
]

const Table = () => {
  const store = useSelector((state: RootState) => state.order)

  const dispatch = useDispatch<AppDispatch>()

  console.log(store.entities)

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
