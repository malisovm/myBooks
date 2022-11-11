import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { firestoreApi } from './firestoreApi'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
