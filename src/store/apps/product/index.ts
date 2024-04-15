// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { ProductService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { ProductApi, ProductForm } from 'src/types/apps/product'

// ** Initial State Of Slice

interface InitialState {
  entities: ProductApi[] | []
  entity: ProductApi
  params: GetParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reasaon: string) => void) => {
  dispatch(ProductSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  'product/fetchOne',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(ProductSlice.actions.handleStatus('pending'))
    try {
      const response = await ProductService.getById(id)
      dispatch(ProductSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'product/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(ProductSlice.actions.handleStatus('pending'))
    try {
      dispatch(ProductSlice.actions.handleQuery(params.query))
      const query = getState().product.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(ProductSlice.actions.handleQuery({ query }))
      const response = await ProductService.getAll({ query })
      dispatch(ProductSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'product/add',
  async ({ data }: { data: ProductForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(ProductSlice.actions.handleStatus('pending'))
    try {
      const response = await ProductService.add(data)
      const query = getState().product.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Added Successfully!')
      dispatch(ProductSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update
export const updateAction = createAppAsyncThunk(
  'product/update',
  async ({ id, data }: { id: string; data: ProductForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(ProductSlice.actions.handleStatus('pending'))
    try {
      const response = await ProductService.update(id, data)
      const query = getState().product.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Updated successfully!')
      dispatch(ProductSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete
export const deleteAction = createAppAsyncThunk(
  'product/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(ProductSlice.actions.handleStatus('pending'))
    try {
      const response = await ProductService.delete(id)
      const query = getState().product.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('deleted Successfully!')
      dispatch(ProductSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const ProductSlice = createSlice({
  name: 'product',
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

export default ProductSlice.reducer
