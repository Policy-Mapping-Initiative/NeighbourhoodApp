import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { IntersectSet, StationSet } from '../interfaces/ttc';

interface TTCState {
  stations: StationSet | null;
  intersectSet: IntersectSet | null
}

const initialState = {
  stations: null,
  intersectSet: null
} as TTCState;

export const fetchStationData = createAsyncThunk('fetch/ttc_stations', async () => {
  return await fetchZippedJsonFile<StationSet>('ttc_stations.zip');
});

export const fetchIntersectData = createAsyncThunk('fetch/ttc_intersects', async () => {
  return await fetchZippedJsonFile<IntersectSet>('ttc_intersects.zip');
});

export const ttcSlice = createSlice({
  name: 'ttc',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchStationData.fulfilled, (state, action) => {
      state.stations = action.payload;
    })
    .addCase(fetchIntersectData.fulfilled, (state, action) => {
      state.intersectSet = action.payload
    });
  },
});
