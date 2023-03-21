import { 
    MultiPolygon,
    FeatureCollection,
    Feature,
    GeoJsonProperties 
} from 'geojson';
import { Zone } from './zone';

interface CRS {
    type: string;
    properties: GeoJsonProperties;
}

export class ZoneCollection implements FeatureCollection {
    type: 'FeatureCollection';
    crs: CRS;
    features: Zone[];

    constructor(input: any) {
        this.type = 'FeatureCollection';
        this.crs = input.crs;
        const temp = [];
        for (const feature of input.features){
            temp.push(new Zone(feature))
        }
        this.features = temp;
    }
}