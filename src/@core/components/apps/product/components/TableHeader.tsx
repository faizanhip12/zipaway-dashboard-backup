// ** MUI Imports
import Button from '@mui/material/Button'

// ** Icons Imports
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined'
import Search from 'src/@core/components/common/Search'
import { TableHeaderBox } from 'src/@core/components/common/TableHeaderBox'
import clipboard from 'clipboard-copy'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { useAuth } from 'src/hooks/useAuth'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
  exportTable: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, toggle, exportTable } = props

  // ** Hooks
  const ability = useContext(AbilityContext)
  const { user } = useAuth()

  function copyUrl() {
    clipboard(`https://zipaway.info/our-products?affiliate=${user?.id}`)
  }

  return (
    <TableHeaderBox>
      {/* <Button
        sx={{ mr: 4 }}
        color='secondary'
        variant='outlined'
        startIcon={<IosShareOutlinedIcon fontSize='small' />}
        onClick={exportTable}
      >
        Export
      </Button> */}
      {ability.can('itsHaveAccess', 'copy-affiliate-link') ? (
        <>
          {user ? (
            <Button sx={{ mr: 4 }} onClick={() => copyUrl()} variant='outlined'>
              Copy Affiliate Link
            </Button>
          ) : null}
        </>
      ) : null}
      {ability.can('itsHaveAccess', 'product-add') ? (
        <Button sx={{ mr: 4 }} onClick={toggle} variant='contained'>
          Add Product
        </Button>
      ) : null}
      <Search placeholder='by product title..' module='product' />
    </TableHeaderBox>
  )
}

export default TableHeader
