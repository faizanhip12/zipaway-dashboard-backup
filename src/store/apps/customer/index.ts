// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { CustomerService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { CustomerApi, CustomerForm } from 'src/types/apps/customer'

// ** Initial State Of Slice

interface InitialState {
  entities: CustomerApi[] | []
  entity: CustomerApi | {}
  params: GetParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reasaon: string) => void) => {
  dispatch(CustomerSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  'customer/fetchOne',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerSlice.actions.handleStatus('pending'))
    try {
      const response = await CustomerService.getById(id)
      dispatch(CustomerSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All

export const fetchAllAction = createAppAsyncThunk(
  'customer/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerSlice.actions.handleStatus('pending'))
    try {
      dispatch(CustomerSlice.actions.handleQuery(params.query))
      const query = getState().customer.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(Slice.actions.handleQuery({ query }))
      const response = await CustomerService.getAll({ query })
      dispatch(CustomerSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'customer/add',
  async ({ data }: { data: CustomerForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerSlice.actions.handleStatus('pending'))
    try {
      const response = await CustomerService.add(data)
      const query = getState().customer.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Added Successfully!')
      dispatch(CustomerSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update
export const updateAction = createAppAsyncThunk(
  'customer/update',
  async ({ id, data }: { id: string; data: CustomerForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerSlice.actions.handleStatus('pending'))
    try {
      const response = await CustomerService.update(id, data)
      const query = getState().customer.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Updated successfully!')
      dispatch(CustomerSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete
export const deleteAction = createAppAsyncThunk(
  'customer/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerSlice.actions.handleStatus('pending'))
    try {
      const response = await CustomerService.delete(id)
      const query = getState().customer.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('deleted Successfully!')
      dispatch(CustomerSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const CustomerSlice = createSlice({
  name: 'customer',
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
      state.entities = data?.entities || []
      state.params.pagination = data?.pagination
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.customer
    })
  }
})

export default CustomerSlice.reducer
