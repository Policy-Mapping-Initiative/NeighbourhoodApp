import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PROCESS_STATE } from '../models/enums';
import { ZoneCollection } from '../models/zoneCollection';
import { fetchZippedJsonFile } from '../utils/utils';


interface ZoneState {
  data: ZoneCollection;
}

const initialState = {
  initialisationStatus: PROCESS_STATE.NOT_STARTED,
  data: new ZoneCollection(),
}

export const fetchZoneData = createAsyncThunk("zones", async() => {
  return await fetchZippedJsonFile('zones.zip');
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
        .addCase(fetchZoneData.pending, (state, _) => {
          state.initialisationStatus = PROCESS_STATE.NOT_STARTED
        })
        .addCase(fetchZoneData.fulfilled, (state, action) => {
            state.data.initialise(action.payload);
            state.initialisationStatus = PROCESS_STATE.COMPLETE
        })
  }
});
