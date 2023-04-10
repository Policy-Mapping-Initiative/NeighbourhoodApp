import { Point } from 'geojson';

export interface ITTC {
  type: string;
  generator: string;
  copyright: string;
  timestamp: string;
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
  zonesWithin300M: number[]
  zonesWithin500M: number[]
  zonesWithin800M: number[]
  zonesWithin1000M: number[]
}
