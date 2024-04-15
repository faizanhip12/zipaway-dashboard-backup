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
import { fetchAllAction } from 'src/store/apps/product'
import CopyOption from 'src/@core/components/apps/product/components/CopyOption'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useContext } from 'react'
import { Tooltip } from '@mui/material'

interface CellType {
  row: ProductApi
}

const Option = ({ row }: { row: string }) => {
  const ability = useContext(AbilityContext)
  return <>{ability.can('itsHaveAccess', 'product-actions') ? <RowOptions id={row} /> : null}</>
}

const columns = [
  {
    flex: 0.2,
    minWidth: 250,
    field: 'title',
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip placement='bottom-start' title={row?.title}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <RenderClient imageUrl={row.featured_image} name={row.title} />
              {row.title}
            </Box>
          </Tooltip>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'description',
    headerName: 'description',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Tooltip placement='bottom-start' title={row?.description}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row.description}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'ingredients',
    headerName: 'ingredients',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip
              placement='bottom-start'
              title={row.ingredients?.map((item: any) => item.description.replace(',', '').trim()).join(', ')}
            >
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row.ingredients?.map((item: any) => item.description).join(',')}
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
    flex: 0.1,
    minWidth: 200,
    field: 'benifits',
    headerName: 'benifits',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip
              placement='bottom-start'
              title={row.benifits?.map((item: any) => item.description.replace(',', '').trim()).join(', ')}
            >
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row.benifits?.map((item: any) => item.description)}
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
    flex: 0.1,
    minWidth: 200,
    field: 'use step',
    headerName: 'use step',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Tooltip
              placement='bottom-start'
              title={row.useSteps?.map((item: any) => item.description.replace(',', '').trim()).join(', ')}
            >
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row.useSteps?.map((item: any) => item.description)}
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
    flex: 0.1,
    minWidth: 200,
    field: 'customer_pricing_quantity',
    headerName: 'customer pricing / quantity',
    renderCell: ({ row }: CellType) => {
      const variation = row.variations?.find(item => item.affiliate === 'CUSTOMER')
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {variation ? (
                <>
                  {variation.quantity} / ${variation.price}{' '}
                </>
              ) : (
                <>Variation Not Found</>
              )}
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
    minWidth: 200,
    field: 'wholesale_pricing_quantity',
    headerName: 'wholesale pricing / quantity',
    renderCell: ({ row }: CellType) => {
      const variation = row.variations?.find(item => item.affiliate === 'CUSTOMER_WHOLESALE')

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {variation ? (
                <>
                  {variation.quantity} / ${variation.price}{' '}
                </>
              ) : (
                <>Variation Not Found</>
              )}
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
    minWidth: 200,
    field: 'city_manger_pricing_quantity',
    headerName: 'city manager pricing / quantity',
    renderCell: ({ row }: CellType) => {
      const variation = row.variations?.find(item => item.affiliate === 'CITY_MANAGER')

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {variation ? (
                <>
                  {variation.quantity} / ${variation.price}{' '}
                </>
              ) : (
                <>Variation Not Found</>
              )}
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
    minWidth: 200,
    field: 'state_manager_pricing_quantity',
    headerName: 'state manager pricing / quantity',
    renderCell: ({ row }: CellType) => {
      const variation = row.variations?.find(item => item.affiliate === 'STATE_MANAGER')

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {variation ? (
                <>
                  {variation.quantity} / ${variation.price}{' '}
                </>
              ) : (
                <>Variation Not Found</>
              )}
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
    minWidth: 200,
    field: 'rigional_manager_pricing_quantity',
    headerName: 'rigional manager pricing /quantity',
    renderCell: ({ row }: CellType) => {
      const variation = row.variations?.find(item => item.affiliate === 'REGIONAL_MANAGER')

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {variation ? (
                <>
                  {variation.quantity} / ${variation.price}{' '}
                </>
              ) : (
                <>Variation Not Found</>
              )}
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
    minWidth: 200,
    field: 'national_manager_pricing_quantity',
    headerName: 'national manager pricing / quantity',
    renderCell: ({ row }: CellType) => {
      const variation = row.variations?.find(item => item.affiliate === 'NATIONAL_MANAGER')

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {variation ? (
                <>
                  {variation.quantity} / ${variation.price}{' '}
                </>
              ) : (
                <>Variation Not Found</>
              )}
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
    maxWidth: 120,
    field: 'size',
    headerName: 'size',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <Typography
              noWrap
              component='a'
              variant='subtitle2'
              sx={{ color: 'text.primary', textDecoration: 'none', textAlign: 'center' }}
            >
              {row.weight} {row.size}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'categories',
    headerName: 'categories',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography
              noWrap
              component='a'
              variant='subtitle2'
              display={'flex'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              sx={{ color: 'text.primary', textDecoration: 'none' }}
            >
              {row?.categories?.length
                ? row?.categories?.map(item => {
                    return <CustomChip key={item?.category?.id} label={item?.category?.name} />
                  })
                : ''}
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
    minWidth: 100,
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
  // ** Hooks
  const store = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch<AppDispatch>()

  const ability = useContext(AbilityContext)

  return (
    <DataGrid
      rows={store.entities}
      columns={[
        {
          flex: 0.2,
          // minWidth: 90,
          sortable: false,
          field: 'copy',
          headerName: '',
          headerClassName: ability.can('itsHaveAccess', 'copy-affiliate-link') ? '' : 'cell_display_hidden',
          cellClassName: ability.can('itsHaveAccess', 'copy-affiliate-link') ? '' : 'cell_display_hidden',
          renderCell: ({ row }: CellType) => <CopyOption product={row} />
        },
        ...columns,
        {
          flex: 0.1,
          minWidth: 90,
          sortable: false,
          field: 'actions',
          headerClassName: ability.can('itsHaveAccess', 'product-actions') ? '' : 'cell_display_hidden',
          cellClassName: ability.can('itsHaveAccess', 'product-actions') ? '' : 'cell_display_hidden',
          headerName: 'Actions',
          renderCell: ({ row }: CellType) => {
            // const ability = useContext(AbilityContext)
            // return <>{ability.can('itsHaveAccess', 'product-actions') ? <RowOptions id={row.id} /> : null}</>
            return <Option row={row.id} />
          },
          filterable: false
        }
      ]}
      loading={store.status === 'pending'}
      paginationModel={store.params.pagination}
      onPageSizeChange={newPageSize => dispatch(fetchAllAction({ query: { limit: `${newPageSize}` } }))}
      onPageChange={newPage => dispatch(fetchAllAction({ query: { page: `${newPage + 1}` } }))}
    />
  )
}

export default Table
