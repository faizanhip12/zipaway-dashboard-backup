import Button from '@mui/material/Button'
import Search from 'src/@core/components/common/Search'
import { TableHeaderBox } from 'src/@core/components/common/TableHeaderBox'
import clipboard from 'clipboard-copy'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useContext } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { toggle } = props

  const ability = useContext(AbilityContext)
  const { user } = useAuth()

  function copyUrl() {
    clipboard(`https://zipaway.info/our-products?affiliate=${user?.id}`)
  }

  return <TableHeaderBox>{/* <Search placeholder='by first name..' module='product' /> */}</TableHeaderBox>
}

export default TableHeader
