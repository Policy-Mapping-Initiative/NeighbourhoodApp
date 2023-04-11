import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { IntersectSet, StationSet } from '../interfaces/ttc';

interface TTCState {
  stations: StationSet | null;
  intersectSet: IntersectSet | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

interface ITTCData {
  stations: StationSet | null,
  intersects: IntersectSet | null
}

const initialState = {
  status: 'idle',
  stations: null,
  
  intersectSet: null
} as TTCState;

export const fetchTTCData = createAsyncThunk('fetch/ttc_intersects', async () => {
  let data : ITTCData = {stations: null, intersects: null};
  
  data.stations = await fetchZippedJsonFile<StationSet>('ttc_stations.zip');
  data.intersects = await fetchZippedJsonFile<IntersectSet>('ttc_intersects.zip');

  return data;

});

export const ttcSlice = createSlice({
  name: 'ttc',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => { builder
    .addCase(fetchTTCData.pending, state => {
      state.status = 'loading';
    })
    .addCase(fetchTTCData.rejected, state => {
      state.status = 'failed';
    })
    .addCase(fetchTTCData.fulfilled, (state, action) => {
      state.intersectSet = action.payload.intersects;
      state.stations = action.payload.stations
      state.status = 'succeeded';
    });
  },
});
