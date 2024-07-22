import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from "../slice/apiSlice";
import statReducer, { fetchTransferHistory } from "../slice/statSlice";
import balanceReducer, { fetchBalance } from "../slice/balanceSlice";



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        stat: statReducer,
        balance: balanceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware)
})
setupListeners(store.dispatch)

store.dispatch(fetchTransferHistory())
store.dispatch(fetchBalance())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch