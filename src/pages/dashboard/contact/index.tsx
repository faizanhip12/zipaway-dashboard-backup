import { useEffect } from 'react'
import ContactTable from 'src/@core/components/apps/contact/components/Table'
import TableHeader from 'src/@core/components/apps/contact/components/TableHeader'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useContact } from 'src/@core/hooks/apps/useContact'

const Page = () => {
  const { handleDrawer } = useToggleDrawer()

  const { getContacts } = useContact()

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <>
      <TableHeader
        value={''}
        handleFilter={() => {
          console.log('')
        }}
        toggle={() => handleDrawer(null)}
      />
      <ContactTable />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'contact-requests'
}

export default Page
