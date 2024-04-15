import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'
import toast from 'react-hot-toast'
import { ContactService } from 'src/services'
import { GetParams } from 'src/types/api'
import { ProductApi } from 'src/types/apps/product'
import { IContact } from 'src/types/apps/contact'

// ** Initial State Of Slice

interface InitialState {
  entities: IContact[] | []
  entity: ProductApi
  params: GetParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reasaon: string) => void) => {
  dispatch(ContactSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'contact/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(ContactSlice.actions.handleStatus('pending'))
    try {
      dispatch(ContactSlice.actions.handleQuery(params.query))
      const query = getState().contacts.params.query
      const response = await ContactService.getAll({ query })
      dispatch(ContactSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const ContactSlice = createSlice({
  name: 'contact',
  initialState: {
    entities: [],
    entity: {},
    params: {}
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      const prev_query = state.params.query || {}
      state.params.query = { ...prev_query, ...action.payload }
    },
    resetQuery: state => {
      state.params.query = {}
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data?.contacts || []
      state.params.pagination = data?.pagination
    })
  }
})

export default ContactSlice.reducer
