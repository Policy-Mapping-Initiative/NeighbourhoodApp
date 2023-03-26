import { MultiPolygon } from 'geojson';
import { LandUse, ZoneType } from '../models/enums';

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
  landUse: LandUse;
  id: number;
  area: number;
  type: ZoneType;
  neighbourhoodId: number;
}
