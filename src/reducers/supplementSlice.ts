import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { ITTC } from '../interfaces/ttc';

interface SupplementState {
  ttcData: ITTC | null;
  initialisationComplete: boolean;
}

const initialState = {
  ttcData: null,
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
      state.ttcData = action.payload;
      state.initialisationComplete = true;
    });
  },
});
