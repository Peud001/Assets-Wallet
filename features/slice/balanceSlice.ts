import { firebaseDb } from "@/services/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore"

export const fetchBalance = createAsyncThunk("fetchBalance", async() => {
  try {
    const querySnapshot = await getDocs(collection(firebaseDb, "balance"));
            const data = querySnapshot.docs.map((doc) => doc.data() as BalanceType);
            return data
  } catch (error) {
    throw new Error 
  }
})

export type BalanceType = {
    balance: number
}

interface InitialStateType {
    balance ?: BalanceType[]
    isLoading : boolean
    error : string | null
}

const initialState: InitialStateType = {
    balance : [],
    isLoading : false,
    error : null
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true
    })
    .addCase(fetchBalance.fulfilled, (state, action: PayloadAction<BalanceType[]>) => {
        state.balance = action.payload
        state.isLoading = false
    })
    .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.error.message || 'failed to load'
        state.isLoading = false
    })
  },
});
export default balanceSlice.reducer