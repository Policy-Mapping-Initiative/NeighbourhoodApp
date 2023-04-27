import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CalculationConstants from '../utils/calculationConstants';

interface ResultsState {
  population: number
  isOpen: boolean
  calculationState: 'unstarted' | 'calculating' | 'finished'
}

const initialState = {
  population: CalculationConstants.TORONTO_POPULATION,
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
    setPopulation(state, action: PayloadAction<number>) {
      state.population = action.payload;
    }
  }
});

export const {
    openResultsScreen,
    closeResultsScreen,
    startCalculations,
    finishCalculations,
    setPopulation
} = resultsSlice.actions;
