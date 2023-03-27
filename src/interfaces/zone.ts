import { MultiPolygon } from 'geojson';

export interface IZoneCollection {
  type: string;
  features?: IZone[] | null;
}

export interface IZone {
  type: string;
  properties: ZoneProperties;
  geometry: MultiPolygon;
}

export interface ZoneProperties {
  landUse: string;
  id: number;
  area: number;
  type: string;
  neighbourhoodId: number;
}
