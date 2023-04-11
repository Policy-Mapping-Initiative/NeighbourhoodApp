import { RootState } from './reducers/rootReducer';

// Neighbourhoods
export const getNeighbourhoodState = (state: RootState) => state.neighbourhoods.status;
export const getNeighbourhoods = (state: RootState) => state.neighbourhoods.data;
export const getNeighbourhoodCenters = (state: RootState) => state.neighbourhoods.neighbourhoodCenters;
export const getNameMap = (state: RootState) => state.neighbourhoods.nameMap;
export const getSelectedId = (state: RootState) => state.neighbourhoods.selectedId;

// Zones
export const getZoneState = (state: RootState) => state.zones.status;
export const getZones = (state: RootState) => state.zones.data;

// TTC
export const isSupplementInitComplete = (state: RootState) => state.supplement.initialisationComplete;
export const getTTCData = (state: RootState) => state.supplement.ttcData;

// Policies
export const isPolicyModalOpen = (state: RootState) => state.policy.isModalOpen;
export const displayedPolicy = (state: RootState) => state.policy.displayedPolicy;
export const subwayPolicy = (state: RootState) => state.policy.subwayPolicy;

// Results
export const isResultsScreenOpen = (state: RootState) => state.results.isScreenOpen;
export const populationResult = (state: RootState) => state.results.population;

// Other Selectors Down Here, please keep it neat !
