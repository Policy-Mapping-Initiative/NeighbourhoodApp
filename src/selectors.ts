import { RootState } from './reducers/rootReducer';

// Neighbourhoods
export const isNeighbourhoodInitComplete = (state: RootState) => state.neighbourhoods.initialisationComplete;
export const getNeighbourhoods = (state: RootState) => state.neighbourhoods.data;

// Zones
export const isZoneInitComplete = (state: RootState) => state.zones.initialisationComplete;
export const getNeighbourhoodMapping = (state: RootState) => state.zones.neighbourMap;
export const getZones = (state: RootState) => state.zones.data;

// TTC
export const isSupplementInitComplete = (state: RootState) => state.supplement.initialisationComplete;
export const getTTCData = (state: RootState) => state.supplement.data;

// Other Selectors Down Here, please keep it neat !
