import { combineReducers } from 'redux'
import { neighbourSlice } from './neighbourhoodSlice'
import { zoneSlice } from './zoneSlice'

export const rootReducer = combineReducers({
  neighbourhoods: neighbourSlice.reducer,
  zones: zoneSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;