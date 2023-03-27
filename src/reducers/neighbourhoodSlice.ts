import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { INeighbourhoodCollection } from '../interfaces/neigbourhood';
import type { PayloadAction } from '@reduxjs/toolkit';

interface updateZone {
  neighbourhoodId: string;
  newZoning: string;
}

interface NeighbourhoodState {
  data: INeighbourhoodCollection | null;
  userSetZoning: Array<updateZone>;
  initialisationComplete: boolean;
}

const initialState = {
  data: null,
  userSetZoning: [],
  initialisationComplete: false,
} as NeighbourhoodState;

export const fetchNeighbourhoodData = createAsyncThunk('fetch/neighbourhoods', async () => {
  return await fetchZippedJsonFile<INeighbourhoodCollection>('neighbourhoods.zip');
});

export const neighbourSlice = createSlice({
  name: 'neighbourhood',
  initialState: initialState,
  reducers: {
    updateUserSetZoning(state, action: PayloadAction<{ neighbourhoodId: string; newZoning: string }>) {
      const temp = {
        neighbourhoodId: action.payload.neighbourhoodId,
        newZoning: action.payload.newZoning,
      } as updateZone;
      state.userSetZoning = state.userSetZoning.filter(item => item.neighbourhoodId !== temp.neighbourhoodId);
      state.userSetZoning.push(temp);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNeighbourhoodData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.initialisationComplete = true;
    });
  },
});

export const { updateUserSetZoning } = neighbourSlice.actions;
