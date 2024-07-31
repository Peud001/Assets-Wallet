import { firebaseDb } from "@/services/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, DocumentData, getDocs, orderBy, query } from "firebase/firestore";

// Define the HistoryType type
type HistoryType = {
  amount: string;
  date: string;
  iconColor: string;
  iconName: string;
  time: string;
  title: string;
  uid: string;
  timestamp: string;
};

// Define the fetchTransferHistory async thunk
export const fetchTransferHistory = createAsyncThunk<HistoryType[], string>(
  "transfer/stat",
  async (uid, { rejectWithValue }) => {
    try {
      const q = query(collection(firebaseDb, "users", uid, "transactions"), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('No recent transactions');
      } else {
        const data = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            ...docData,
            timestamp: docData.timestamp.toDate().toISOString()
          } as HistoryType;
        });
        return data;
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface InitialStateType {
  totalIncome: DocumentData[]
  totalExpense: DocumentData[]
  transferHistory: HistoryType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  totalIncome: [],
  totalExpense: [],
  transferHistory: [],
  isLoading: false,
  error: null,
};

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {
    getTotalIncome(state, action: PayloadAction<DocumentData[]>){
      state.totalIncome = action.payload
    },
    getTotalExpense(state, action: PayloadAction<DocumentData[]>){
      state.totalExpense = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTransferHistory.fulfilled,
        (state, action: PayloadAction<HistoryType[]>) => {
          state.isLoading = false;
          state.transferHistory = action.payload;
        }
      )
      .addCase(fetchTransferHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to load items";
      });
  },
});

// Export the reducer
export default statSlice.reducer;
export const {getTotalExpense, getTotalIncome} = statSlice.actions
