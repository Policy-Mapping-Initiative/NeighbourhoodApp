import { RootState } from "./reducers/rootReducer";

// Neighbourhoods
export const isNeighbourhoodInitComplete = (state: RootState) => state.neighbourhoods.initialisationComplete


// Zones
export const isZoneInitComplete = (state: RootState) => state.zones.initialisationComplete

// Other Selectors Down Here, please keep it neat !