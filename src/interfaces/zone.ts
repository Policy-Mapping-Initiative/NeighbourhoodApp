import { MultiPolygon } from 'geojson';

export interface IZone {
  type: string;
  features?: FeaturesEntity[] | null;
}

export interface FeaturesEntity {
  type: string;
  properties: ZoneProperties;
  geometry: MultiPolygon;
}

export interface ZoneProperties {
  landUse: string;
  id: string;
  area: number;
  type: string;
  neighbourhoodId: number;
}
