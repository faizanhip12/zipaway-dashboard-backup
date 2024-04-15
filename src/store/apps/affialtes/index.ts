// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { AffiliateService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { AffiliatesApi, AffiliatesForm } from 'src/types/apps/affiliates'

// ** Initial State Of Slice

interface InitialState {
  entities: AffiliatesApi[] | []
  entity: AffiliatesApi
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
  'affialtes/fetchOne',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await AffiliateService.getById(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'affialtes/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      dispatch(Slice.actions.handleQuery(params.query))
      const query = getState().affialtes.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(Slice.actions.handleQuery({ query }))
      const response = await AffiliateService.getAll({ query })
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'affialtes/add',
  async ({ data }: { data: AffiliatesForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await AffiliateService.add(data)
      const query = getState().affialtes.params.query
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
  'affialtes/update',
  async ({ id, data }: { id: string; data: AffiliatesForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await AffiliateService.update(id, data)
      const query = getState().affialtes.params.query
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
  'affialtes/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await AffiliateService.delete(id)
      const query = getState().affialtes.params.query
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
  name: 'affialtes',
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
      state.entity = data.user
    })
  }
})

export default Slice.reducer
