import { Point } from 'geojson';

export interface ITTC {
  type: string;
  generator: string;
  copyright: string;
  timestamp: string;
  features?: FeaturesEntity[] | null;
}

export interface FeaturesEntity {
  type: string;
  properties: Properties;
  geometry: Point;
  id: string;
}

export interface Properties {
  name: string;
  wikidata?: string | null;
  wikipedia?: string | null;
}
