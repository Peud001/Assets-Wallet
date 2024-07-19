import { firebaseDb } from "@/services/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore";


type HistoryType = {
    amount: string
    bank: string
    date: string 
    firstName: string 
    image: string
    lastName: string
}

export const fetchTransferHistory = createAsyncThunk(
    'transfer/stat', 
    async() => {
        try{
            const querySnapshot = await getDocs(collection(firebaseDb, "statData"));
            const data = querySnapshot.docs.map((doc) => doc.data() as HistoryType);
            return data? data : []
        }catch(error){
            throw new Error
        }
    }
)

interface InitialStateType {
    transferHistory: HistoryType[]
    isLoading: boolean
    error: string | null
}

const initialState: InitialStateType = {
    transferHistory: [],
    isLoading: false,
    error: null
}

const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchTransferHistory.pending, (state) => {
            state.isLoading = true
        })
         .addCase(fetchTransferHistory.fulfilled, (state, action: PayloadAction<HistoryType[]>) => {
                state.isLoading = false;
                state.transferHistory = action.payload;
            })
        .addCase(fetchTransferHistory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'failed to load items'
        })
    },
})

export default statSlice.reducer