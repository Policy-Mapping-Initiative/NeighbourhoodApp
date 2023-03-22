import { combineReducers } from 'redux'
import { neighbourSlice } from './neighbourhoodSlice'
import { zoneSlice } from './zoneSlice'

const rootReducer = combineReducers({
  neighbourhoods: neighbourSlice.reducer,
  zones: zoneSlice.reducer
})

export default rootReducer