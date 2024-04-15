// ** MUI Imports
import Button from '@mui/material/Button'

// ** Icons Imports
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import Search from 'src/@core/components/common/Search'
import { TableHeaderBox } from 'src/@core/components/common/TableHeaderBox'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter?: (val: string) => void
  exportTable: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, toggle, exportTable } = props

  return (
    <TableHeaderBox>
      <Button sx={{ mr: 4 }} color='secondary' variant='outlined' startIcon={<IosShareOutlinedIcon fontSize='small' />} onClick={exportTable}>
        Export
      </Button>
      
      {/* <Search placeholder='by Order No:..' module='order' /> */}
    </TableHeaderBox>
  )
}

export default TableHeader
