import { combineReducers } from 'redux';
import { neighbourSlice } from './neighbourhoodSlice';
import { policySlice } from './policySlice';
import { zoneSlice } from './zoneSlice';

export const rootReducer = combineReducers({
  neighbourhoods: neighbourSlice.reducer,
  zones: zoneSlice.reducer,
  policy: policySlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
