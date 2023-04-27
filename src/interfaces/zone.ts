import { LandUse, ZoneType } from '../models/enums';
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
  landUse: LandUse;
  id: number;
  area: number;
  type: ZoneType;
  neighbourhoodId: number;
}

export interface AreaDelta {
  zoneId: number,
  delta: number
}
