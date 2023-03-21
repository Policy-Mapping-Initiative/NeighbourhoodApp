import { 
    FeatureCollection,
    GeoJsonProperties 
} from 'geojson';
import { Neighbourhood } from './neighbourhood';


interface CRS {
    type: string;
    properties: GeoJsonProperties;
}

export class NeighbourhoodCollection implements FeatureCollection {
    type: 'FeatureCollection';
    crs: CRS;
    features: Neighbourhood[];

    constructor(input: any) {
        this.type = 'FeatureCollection';
        this.crs = input.crs;

        const temp = [];
        let i = 0;
        for (const feature of input.features){
            temp.push(new Neighbourhood(feature))
        }
        this.features = temp;
    }
}