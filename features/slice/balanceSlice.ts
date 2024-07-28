import { firebaseDb } from "@/services/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

// Define the BalanceType type
export type BalanceType = {
  balance: number;
};

// Define the initial state type
interface InitialStateType {
  balance?: BalanceType;
  isLoading: boolean;
  error: string | null;
}

// Initialize the initial state
const initialState: InitialStateType = {
  balance: undefined,
  isLoading: false,
  error: null,
};

// Define the fetchBalance async thunk
export const fetchBalance = createAsyncThunk<BalanceType, string>(
  "balance/fetchBalance",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(firebaseDb, "balance", uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as BalanceType | undefined;
      if (!data) {
        throw new Error("No balance data found");
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action: PayloadAction<BalanceType>) => {
        state.balance = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to load";
        state.isLoading = false;
      });
  },
});

export default balanceSlice.reducer;
