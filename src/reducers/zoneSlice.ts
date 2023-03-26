import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils/utils';
import { IZone } from '../interfaces/zone';

interface ZoneState {
  data: IZone | null;
  initialisationComplete: boolean;
}

const initialState = {
  initialisationComplete: false,
  data: null,
} as ZoneState;

export const fetchZoneData = createAsyncThunk('fetch/neighbourhoods', async () => {
  return await fetchZippedJsonFile<IZone>('neighbourhoods.zip');
});


export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {
    // updateZoning(state, action) {
    //   state.data.getZone(action.payload.id).updateZoning(action.payload.newZoning);
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchZoneData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.initialisationComplete = true;
    });
  },
});
