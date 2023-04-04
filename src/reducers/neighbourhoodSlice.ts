import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { INeighbourhoodCollection } from '../interfaces/neigbourhood';
import L from 'leaflet';
import type { PayloadAction } from '@reduxjs/toolkit';

interface updateZone {
  neighbourhoodId: string;
  newZoning: string;
}

export interface neighbourhoodLoc {
  [key: string]: [number, number];
}

interface NeighbourhoodState {
  data: INeighbourhoodCollection | null;
  userSetZoning: Array<updateZone>;
  neighbourhoodLocations: neighbourhoodLoc;
  searchValue: string;
  initialisationComplete: boolean;
}

const initialState = {
  data: null,
  userSetZoning: [],
  neighbourhoodLocations: {},
  searchValue: '',
  initialisationComplete: false,
} as NeighbourhoodState;

export const fetchNeighbourhoodData = createAsyncThunk('fetch/neighbourhoods', async () => {
  return await fetchZippedJsonFile<INeighbourhoodCollection>('neighbourhoods.zip');
});

export const neighbourSlice = createSlice({
  name: 'neighbourhood',
  initialState: initialState,
  reducers: {
    updateUserSetZoning(state, action: PayloadAction<{ neighbourhoodId: string; newZoning: string }>) {
      const temp = {
        neighbourhoodId: action.payload.neighbourhoodId,
        newZoning: action.payload.newZoning,
      } as updateZone;
      state.userSetZoning = state.userSetZoning.filter(item => item.neighbourhoodId !== temp.neighbourhoodId);
      state.userSetZoning.push(temp);
    },
    updateSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNeighbourhoodData.fulfilled, (state, action: PayloadAction<INeighbourhoodCollection>) => {
      state.data = action.payload;
      if (action.payload.features) {
        for (const elem of action.payload.features) {
          const key = elem.properties.name;
          if (!Object.keys(state.neighbourhoodLocations).includes(key)) {
            const coords = elem.geometry.coordinates[0] as L.LatLngTuple[];
            const temp = L.polygon(coords).getBounds().getCenter();
            const value: [number, number] = [temp.lng, temp.lat];
            state.neighbourhoodLocations[key] = value;
          }
        }
      }
      state.initialisationComplete = true;
    });
  },
});

export const { updateUserSetZoning, updateSearchValue } = neighbourSlice.actions;
