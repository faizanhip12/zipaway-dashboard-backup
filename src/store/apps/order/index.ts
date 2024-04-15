// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { OrderService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { IOrderApi, IOrderForm } from 'src/types/apps/order'

// ** Initial State Of Slice

interface InitialState {
  entities: IOrderApi[] | []
  entity: IOrderApi | {}
  params: GetParams
  items: string | any
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reasaon: string) => void) => {
  dispatch(OrderSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  'order/fetchOne',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(OrderSlice.actions.handleStatus('pending'))
    try {
      const response = await OrderService.getById(id)
      dispatch(OrderSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'order/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(OrderSlice.actions.handleStatus('pending'))
    try {
      dispatch(OrderSlice.actions.handleQuery(params.query))
      const query = getState().order.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(OrderSlice.actions.handleQuery({ query }))
      const response = await OrderService.getAll({ query })
      dispatch(OrderSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'order/add',
  async ({ data }: { data: IOrderForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(OrderSlice.actions.handleStatus('pending'))
    try {
      const response = await OrderService.add(data)
      const query = getState().order.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Added Successfully!')
      dispatch(OrderSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update
export const updateAction = createAppAsyncThunk(
  'order/update',
  async ({ id, data }: { id: string; data: IOrderForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(OrderSlice.actions.handleStatus('pending'))
    try {
      const response = await OrderService.update(id, data)
      const query = getState().order.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Updated successfully!')
      dispatch(OrderSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete
export const deleteAction = createAppAsyncThunk(
  'order/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(OrderSlice.actions.handleStatus('pending'))
    try {
      const response = await OrderService.delete(id)
      const query = getState().order.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('deleted Successfully!')
      dispatch(OrderSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const OrderSlice = createSlice({
  name: 'order',
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
      state.entity = data.entity
    })
  }
})

export default OrderSlice.reducer
