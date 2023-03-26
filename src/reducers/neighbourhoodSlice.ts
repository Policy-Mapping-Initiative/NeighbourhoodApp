import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { NeighbourhoodCollection } from '../models/neighbourhoodCollection';
import { fetchZippedJsonFile } from '../utils/utils';
import { INeighbourhoodCollection } from '../interfaces/neigbourhood';
// import type { PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    // This is just an example to tie it all together. Perhaps not the recommended way of doing things
    // updatePopulation(state, action: PayloadAction<>) {
    //     state.data.getNeighbourhoodById(action.payload.neighbourhoodId).updatePopulation(action.payload.newPopulation);
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchNeighbourhoodData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.initialisationComplete = true;
    });
  },
});
