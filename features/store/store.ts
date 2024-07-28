import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import statReducer, { fetchTransferHistory } from "../slice/statSlice";
import balanceReducer, { fetchBalance } from "../slice/balanceSlice";



export const store = configureStore({
    reducer: {
        stat: statReducer,
        balance: balanceReducer
    },
})
setupListeners(store.dispatch)

store.dispatch(fetchTransferHistory())
store.dispatch(fetchBalance())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch