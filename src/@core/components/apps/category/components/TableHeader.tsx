// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined'
import Search from 'src/@core/components/common/Search'
import { TableHeaderBox } from 'src/@core/components/common/TableHeaderBox'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
  exportTable: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, toggle, exportTable } = props

  return (
    <TableHeaderBox>
      <Button
        sx={{ mr: 4 }}
        color='secondary'
        variant='outlined'
        startIcon={<IosShareOutlinedIcon fontSize='small' />}
        onClick={exportTable}
      >
        Export
      </Button>

      <Button sx={{ mr: 4 }} onClick={toggle} variant='contained'>
        Add Category
      </Button>
      <Search placeholder='by name...' module='category' />
    </TableHeaderBox>
  )
}

export default TableHeader
