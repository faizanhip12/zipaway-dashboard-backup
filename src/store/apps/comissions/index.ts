// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { ComissionsService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { ComissionsApi, ComissionsForm } from 'src/types/apps/comissions'

// ** Initial State Of Slice

interface InitialState {
  entities: ComissionsApi[] | []
  entity: ComissionsApi
  params: GetParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reasaon: string) => void) => {
  dispatch(Slice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  'comissions/fetchOne',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await ComissionsService.getById(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'comissions/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      dispatch(Slice.actions.handleQuery(params.query))
      const query = getState().comissions.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(Slice.actions.handleQuery({ query }))
      const response = await ComissionsService.getAll({ query })
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'comissions/add',
  async ({ data }: { data: ComissionsForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await ComissionsService.add(data)
      const query = getState().comissions.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Added Successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update
export const updateAction = createAppAsyncThunk(
  'comissions/update',
  async ({ id, data }: { id: string; data: ComissionsForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await ComissionsService.update(id, data)
      const query = getState().comissions.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Updated successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete
export const deleteAction = createAppAsyncThunk(
  'comissions/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await ComissionsService.delete(id)
      const query = getState().comissions.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('deleted Successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const Slice = createSlice({
  name: 'comissions',
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
      state.entities = data?.commission || []
      state.params.pagination = data?.pagination
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.comissions
    })
  }
})

export default Slice.reducer
