// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// ** Reducers
import category from 'src/store/apps/category'
import product from 'src/store/apps/product'
import order from 'src/store/apps/order'
import customer from 'src/store/apps/customer'
import affialtes from 'src/store/apps/affialtes'
import comissions from 'src/store/apps/comissions'
import contacts from 'src/store/apps/contact'

export const store = configureStore({
  reducer: {
    category,
    product,
    order,
    customer,
    affialtes,
    comissions,
    contacts
    // Add the generated reducer as a specific top-level slice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// export interface Redux {
// getState: typeof store.getState
// dispatch: Dispatch<any>
// }

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState
//   dispatch: Dispatch<any>
//   rejectValue: string
//   extra: { s: string; n: number }
// }>()
