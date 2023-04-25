import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultsState {
  population: number
  isOpen: boolean
  calculationState: 'unstarted' | 'calculating' | 'finished'
}

const initialState = {
  population: 5000000,  // Dummy value for now
  isOpen: false,
  calculationState: 'unstarted' 
} as ResultsState;

export const resultsSlice = createSlice({
  name: 'results',
  initialState: initialState,
  reducers: {
    openResultsScreen(state) {
      state.isOpen = true
    },
    startCalculations(state) {
      state.calculationState = 'calculating'
    },
    finishCalculations(state) {
      state.calculationState = 'finished'
    },
    closeResultsScreen(state) {
      state.isOpen = false
      state.calculationState = 'unstarted'  // NOTE: We might cache results if we can tell no changes have been made but... that will be done in business logic, not here
    },
    setPopulation(state, action: PayloadAction<{population: number}>) {
      state.population = action.payload.population;
    }
  }
});

export const {
    openResultsScreen,
    closeResultsScreen,
    startCalculations,
    finishCalculations
} = resultsSlice.actions;
