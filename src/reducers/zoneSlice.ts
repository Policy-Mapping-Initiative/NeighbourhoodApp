import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ZoneCollection } from '../models/zoneCollection';
import { fetchZippedJsonFile } from '../utils/utils';


interface ZoneState {
  data: ZoneCollection;
}

const initialState = {
  initialisationComplete: false,
  data: new ZoneCollection(),
}

export const fetchZoneData = createAsyncThunk("fetch/zones", async() => {
  let test = await fetchZippedJsonFile('zones.zip');
  console.log(test);
  return test;
})

export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {
    updateZoning(state, action) {
        state.data.getZone(action.payload.id).updateZoning(action.payload.newZoning);
    }
  },
  extraReducers: builder => {
    builder
        .addCase(fetchZoneData.fulfilled, (state, action) => {
          console.log('here2')
          state.initialisationComplete = true
          //state.data.initialise(action.payload);
        })
  }
});
