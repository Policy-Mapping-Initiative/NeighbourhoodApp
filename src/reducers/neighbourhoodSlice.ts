import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils/utils';
import { INeighbourhoodCollection } from '../interfaces/neigbourhood';

interface NeighbourhoodState {
  data: INeighbourhoodCollection | null;
  initialisationComplete: boolean;
}

const initialState = {
  data: null,
  initialisationComplete: false,
} as NeighbourhoodState;

export const fetchNeighbourhoodData = createAsyncThunk('fetch/neighbourhoods', async () => {
  return await fetchZippedJsonFile<INeighbourhoodCollection>('neighbourhoods.zip');
});

export const neighbourSlice = createSlice({
  name: 'neighbourhood',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNeighbourhoodData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.initialisationComplete = true;
    });
  },
});
