import { combineReducers } from 'redux';
import { neighbourSlice } from './neighbourhoodSlice';
import { policySlice } from './policySlice';
import { ttcSlice } from './ttcSlice';
import { resultsSlice } from './resultsSlice';
import { zoneSlice } from './zoneSlice';


export const rootReducer = combineReducers({
  neighbourhoods: neighbourSlice.reducer,
  zones: zoneSlice.reducer,
  ttc: ttcSlice.reducer,
  policy: policySlice.reducer,
  results: resultsSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
