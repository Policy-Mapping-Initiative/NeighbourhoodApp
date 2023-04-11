import { Point } from 'geojson';

export interface StationSet{
  type: string;
  features?: Station[];
}

export interface Station {
  type: string;
  properties: StationProperties;
  geometry: Point;
  id: string;
}

export interface StationProperties {
  name: string;
}

export interface IntersectSet {
  "300m": {[key: number]: number},
  "500m": {[key: number]: number},
  "800m": {[key: number]: number},
  "1000m": {[key: number]: number}
}
