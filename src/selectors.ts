import { RootState } from './reducers/rootReducer';

// Neighbourhoods
export const getNeighbourhoodState = (state: RootState) => state.neighbourhoods.status;
export const getNeighbourhoods = (state: RootState) => state.neighbourhoods.data;
export const getUserSetZoning = (state: RootState) => state.neighbourhoods.userSetZoning;
export const getNeighbourhoodCenters = (state: RootState) => state.neighbourhoods.neighbourhoodCenters;
export const getNameMap = (state: RootState) => state.neighbourhoods.nameMap;
export const getSelectedId = (state: RootState) => state.neighbourhoods.selectedId;

// Zones
export const getZoneState = (state: RootState) => state.zones.status;
export const getZones = (state: RootState) => state.zones.data;

// TTC
export const getTTCState = (state: RootState) => state.ttc.status;
export const getTTCStations = (state: RootState) => state.ttc.stations;
export const getTTCIntersects = (state: RootState) => state.ttc.intersectSet;
export const getTTCIntersects800m = (state: RootState) => state.ttc.intersectSet?.['800m'];


// Policies
export const isPolicyModalOpen = (state: RootState) => state.policy.isModalOpen;
export const displayedPolicy = (state: RootState) => state.policy.displayedPolicy;
export const subwayPolicy = (state: RootState) => state.policy.policyDecisions.subwayPolicy;
export const getPolicyDecisions = (state: RootState) => state.policy.policyDecisions;

// Results
export const isResultsScreenOpen = (state: RootState) => state.results.isOpen
export const populationResult = (state: RootState) => state.results.population;
export const resultsCalculationState = (state: RootState) => state.results.calculationState;

// Other Selectors Down Here, please keep it neat !
