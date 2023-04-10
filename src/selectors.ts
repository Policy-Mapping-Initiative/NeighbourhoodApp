import { RootState } from './reducers/rootReducer';

// Neighbourhoods
export const isNeighbourhoodInitComplete = (state: RootState) => state.neighbourhoods.initialisationComplete;
export const getNeighbourhoods = (state: RootState) => state.neighbourhoods.data;
export const getNeighbourhoodLocs = (state: RootState) => state.neighbourhoods.neighbourhoodLocations;
export const getSearchValue = (state: RootState) => state.neighbourhoods.searchValue;

// Zones
export const isZoneInitComplete = (state: RootState) => state.zones.initialisationComplete;
export const getNeighbourhoodMapping = (state: RootState) => state.zones.neighbourMap;
export const getZones = (state: RootState) => state.zones.data;

// TTC
export const isSupplementInitComplete = (state: RootState) => state.supplement.initialisationComplete;
export const getTTCData = (state: RootState) => state.supplement.ttcData;

// Policies
export const isPolicyModalOpen = (state: RootState) => state.policy.isModalOpen;
export const displayedPolicy = (state: RootState) => state.policy.displayedPolicy;
export const subwayPolicy = (state: RootState) => state.policy.subwayPolicy;

// Other Selectors Down Here, please keep it neat !
