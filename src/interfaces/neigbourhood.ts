import { MultiPolygon } from 'geojson';

export interface INeighbourhoodCollection {
  type: string;
  crs: CRS;
  features?: INeighbourhood[] | null;
}

export interface CRS {
  type: string;
  properties: CRSProps;
}

interface CRSProps {
  name: string;
}

export interface INeighbourhood {
  type: string;
  properties: NeigbourhoodProps;
  geometry: MultiPolygon;
}

export interface NeigbourhoodProps {
  id: number;
  name: string;
  population: number;
  area: number;
  residenceCount: number;
  singleFamilyCount: number;
  midHighRiseCount: number;
  otherAttachedCount: number;
  semiDetachedCount: number;
  rowHouseCount: number;
  duplexCount: number;
  lowRiseCount: number;
  density: number;
  zones?: number[] | null;
  residentialArea: number;
  nonResidentialArea: number;
  mixedUseArea: number;
  openSpaceArea: number;
  singleFamilyArea: number;
}
