import { combineReducers } from 'redux';
import { neighbourSlice } from './neighbourhoodSlice';
import { policySlice } from './policySlice';
import { zoneSlice } from './zoneSlice';
import { supplementSlice } from './supplementSlice';

export const rootReducer = combineReducers({
  neighbourhoods: neighbourSlice.reducer,
  zones: zoneSlice.reducer,
  supplement: supplementSlice.reducer,
  policy: policySlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
