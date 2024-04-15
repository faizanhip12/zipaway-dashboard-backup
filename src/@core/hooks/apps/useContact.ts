import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'
import { GetParams } from 'src/services/service'
import { fetchAllAction } from 'src/store/apps/contact'

export const useContact = () => {
  const store = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  const getContacts = async () => {
    dispatch(fetchAllAction({}))
  }

  return {
    store,
    getContacts
  }
}
