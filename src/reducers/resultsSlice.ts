import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultsState {
  population: number
  isScreenOpen: boolean
}

const initialState = {
  population: 5000000,  // Dummy value for now
  isScreenOpen: false
} as ResultsState;

export const resultsSlice = createSlice({
  name: 'results',
  initialState: initialState,
  reducers: {
    openResultScreen(state) {
      state.isScreenOpen = true;
    },
    closeResultScreen(state) {
      state.isScreenOpen = false;
    }
  }
});

export const {
    openResultScreen,
    closeResultScreen
} = resultsSlice.actions;
