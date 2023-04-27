import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchZippedJsonFile } from '../utils';
import { INeighbourhoodCollection, INeighbourhood } from '../interfaces/neigbourhood';
import L from 'leaflet';
import type { PayloadAction } from '@reduxjs/toolkit';

interface updateZone {
  neighbourhoodId: string;
  newZoning: string;
}

interface nameToId {
  [key: string]: number;
}

export interface neighbourhoodCenter {
  [key: number]: [number, number];
}

interface NeighbourhoodState {
  data: INeighbourhood[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  userSetZoning: Array<updateZone>;
  neighbourhoodCenters: neighbourhoodCenter;
  nameMap: nameToId;
  selectedId: number;
}

const initialState = {
  data: [],
  status: 'idle',
  userSetZoning: [],
  neighbourhoodCenters: {},
  nameMap: {},
  selectedId: 0,
} as NeighbourhoodState;

export const fetchNeighbourhoodData = createAsyncThunk('neighbourhood/getData', async () => {
  return await fetchZippedJsonFile<INeighbourhoodCollection>('neighbourhoods.zip');
});

export const neighbourSlice = createSlice({
  name: 'neighbourhood',
  initialState: initialState,
  reducers: {
    addNeighbourhoodLocation(state, action: PayloadAction<INeighbourhood>) {
      const coords = action.payload.geometry.coordinates[0] as L.LatLngTuple[];
      const temp = L.polygon(coords).getBounds().getCenter();
      const value: [number, number] = [temp.lng, temp.lat];
      state.neighbourhoodCenters[action.payload.properties.id] = value;
    },
    updateUserSetZoning(state, action: PayloadAction<{ neighbourhoodId: string; newZoning: string }>) {
      const temp = {
        neighbourhoodId: action.payload.neighbourhoodId,
        newZoning: action.payload.newZoning,
      } as updateZone;
      state.userSetZoning = state.userSetZoning.filter(item => item.neighbourhoodId !== temp.neighbourhoodId);
      state.userSetZoning.push(temp);
    },
    updateSelectedId(state, action: PayloadAction<number>) {
      state.selectedId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNeighbourhoodData.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchNeighbourhoodData.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(fetchNeighbourhoodData.fulfilled, (state, action: PayloadAction<INeighbourhoodCollection>) => {
      const temp = action.payload;
      if (temp.features) {
        for (const neighbourhood of temp.features) {
          state.data.push(neighbourhood);
          state.nameMap[neighbourhood.properties.name] = neighbourhood.properties.id;
        }
        state.status = 'succeeded';
      } else {
        state.status = 'failed';
      }
    });
  },
});

export const { addNeighbourhoodLocation, updateUserSetZoning, updateSelectedId } = neighbourSlice.actions;
