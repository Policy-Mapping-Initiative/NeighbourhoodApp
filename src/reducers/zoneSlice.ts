import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { IZoneCollection, IZone } from '../interfaces/zone';

type neighbourhoodMapping = {
  [key: number]: number[];
};

interface ZoneState {
  data: IZone[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  neighbourMap: neighbourhoodMapping;
}

const initialState = {
  status: 'idle',
  neighbourMap: {},
  data: {},
} as ZoneState;

export const fetchZoneData = createAsyncThunk('zone/getData', async () => {
  return await fetchZippedJsonFile<IZoneCollection>('zones.zip');
});

export const zoneSlice = createSlice({
  name: 'zone',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchZoneData.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchZoneData.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(fetchZoneData.fulfilled, (state, action) => {
      if (action.payload.features) {
        state.data = action.payload.features;
        for (const zone of action.payload.features) {
          let temp = state.neighbourMap[zone.properties.neighbourhoodId];
          if (temp) {
            temp.push(zone.properties.id);
          } else {
            temp = [zone.properties.id];
          }
          state.neighbourMap[zone.properties.neighbourhoodId] = temp;
        }
        state.status = 'succeeded';
      }
    });
  },
});
