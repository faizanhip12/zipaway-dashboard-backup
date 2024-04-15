import { useEffect } from 'react'
import ComissionTable from 'src/@core/components/apps/comission/components/Table'
import TableHeader from 'src/@core/components/apps/comission/components/TableHeader'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useComissions } from 'src/@core/hooks/apps/useComissions'
import { useDispatch } from 'react-redux'
import { Slice } from 'src/store/apps/comissions'

const Page = () => {
  const { serviceId, handleDrawer } = useToggleDrawer()

  const { exportComissions, getComissionss } = useComissions(serviceId)
  const dispatch = useDispatch()

  useEffect(() => {
    getComissionss({ query: {} })
    return () => {
      dispatch(Slice.actions.resetQuery())
    }
  }, [])

  return (
    <>
      <TableHeader
        value={''}
        handleFilter={() => {
          console.log('')
        }}
        toggle={() => handleDrawer(null)}
        exportTable={() => exportComissions()}
      />
      <ComissionTable />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'comission-page'
}

export default Page
