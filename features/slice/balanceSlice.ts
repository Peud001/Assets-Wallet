import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '@/services/auth';

export type BalanceType = {
  balance: number;
};

interface InitialStateType {
  phoneNumber: string | null;
  balance?: BalanceType;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  phoneNumber: null,
  balance: undefined,
  isLoading: false,
  error: null,
};

export const fetchBalance = createAsyncThunk<BalanceType, string>(
  'balance/fetchBalance',
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(firebaseDb, 'balance', uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as BalanceType | undefined;
      if (!data) {
        throw new Error('No balance data found');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchPhoneNumber = createAsyncThunk<string | null, string>(
  'balance/fetchPhoneNumber',
  async (uid, { rejectWithValue }) => {
    try {
      const userDoc = await getDoc(doc(firebaseDb, 'users', uid));
      const phoneNumber = userDoc.data()?.phoneNumber || null;
      return phoneNumber;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const balanceSlice = createSlice({
  name: 'balance',
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
        state.error = action.payload as string || 'Failed to load';
        state.isLoading = false;
      })
      .addCase(fetchPhoneNumber.fulfilled, (state, action: PayloadAction<string | null>) => {
        state.phoneNumber = action.payload;
      })
      .addCase(fetchPhoneNumber.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to load phone number';
      });
  },
});

export default balanceSlice.reducer;
