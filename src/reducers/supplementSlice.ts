import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { ITTC } from '../interfaces/ttc';

interface SupplementState {
  data: ITTC | null;
  initialisationComplete: boolean;
}

const initialState = {
  data: null,
  initialisationComplete: false,
} as SupplementState;

export const fetchSupplementalData = createAsyncThunk('fetch/supplement', async () => {
  return await fetchZippedJsonFile<ITTC>('ttc.zip');
});

export const supplementSlice = createSlice({
  name: 'supplement',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchSupplementalData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.initialisationComplete = true;
    });
  },
});
