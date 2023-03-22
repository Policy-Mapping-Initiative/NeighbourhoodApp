import { createSlice } from '@reduxjs/toolkit';
import { ZoneCollection } from '../models/zoneCollection';
import { fetchZippedJsonFile } from '../utils/utils';


interface ZoneState {
  data: ZoneCollection;
}

const initialState = {
  data: new ZoneCollection(fetchZippedJsonFile('zones.zip')),
}

export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {
    updateZoning(state, action) {
        state.data.getZone(action.payload.id).updateZoning(action.payload.newZoning);
    }
  },
});
