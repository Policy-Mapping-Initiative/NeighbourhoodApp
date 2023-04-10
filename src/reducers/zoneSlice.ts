import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { IZoneCollection, IZone } from '../interfaces/zone';

type zoneMapping = {
  [key: string]: IZone;
};

type neighbourhoodMapping = {
  [key: string]: string[];
};

interface ZoneState {
  data: zoneMapping;
  neighbourMap: neighbourhoodMapping;
  initialisationComplete: boolean;
}

const initialState = {
  initialisationComplete: false,
  neighbourMap: {},
  data: {},
} as ZoneState;

export const fetchZoneData = createAsyncThunk('fetch/zones', async () => {
  return await fetchZippedJsonFile<IZoneCollection>('zones.zip');
});

export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchZoneData.fulfilled, (state, action) => {
      if (action.payload.features) {
        for (const zone of action.payload.features) {
          let temp = state.neighbourMap[zone.properties.neighbourhoodId];
          if (temp) {
            temp.push(zone.properties.id.toString());
          } else {
            temp = [zone.properties.id.toString()];
          }
          state.neighbourMap[zone.properties.neighbourhoodId] = temp;
          state.data[zone.properties.id] = zone;
        }
      }
      state.initialisationComplete = true;
    });
  },
});
