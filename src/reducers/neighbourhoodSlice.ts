import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PROCESS_STATE } from '../models/enums';
import { NeighbourhoodCollection } from '../models/neighbourhoodCollection';
import { fetchZippedJsonFile } from '../utils/utils';


interface NeighbourhoodState {
  data: NeighbourhoodCollection;
}

// Fix this
const initialState = {
  initialisationStatus: PROCESS_STATE.NOT_STARTED,
  data: new NeighbourhoodCollection()
}

export const fetchNeighbourhoodData = createAsyncThunk("fetch/neighbourhoods", async() => {
    return await fetchZippedJsonFile('neighbourhoods.zip');
});

export const neighbourSlice = createSlice({
  name: 'neighbourhoodData',
  initialState: initialState,
  reducers: {
    // This is just an example to tie it all together. Perhaps not the recommended way of doing things 
    updatePopulation(state, action) {
        state.data.getNeighbourhoodById(action.payload.neighbourhoodId).updatePopulation(action.payload.newPopulation); 
    },
  },
  extraReducers: builder => {
    builder
        .addCase(fetchNeighbourhoodData.pending, (state, _) => {
          console.log("Here");
          state.initialisationStatus = PROCESS_STATE.NOT_STARTED
        })
        .addCase(fetchNeighbourhoodData.fulfilled, (state, action) => {
            state.data.initialise(action.payload);
            state.initialisationStatus = PROCESS_STATE.COMPLETE
        })
  }
});


