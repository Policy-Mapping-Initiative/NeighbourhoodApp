import { Polygon } from 'geojson';

export interface IZoneCollection {
  type: string;
  features?: IZone[] | null;
}

export interface IZone {
  type: string;
  properties: ZoneProperties;
  geometry: Polygon;
}

export interface ZoneProperties {
  landUse: string;
  id: number;
  area: number;
  type: string;
  neighbourhoodId: number;
}
