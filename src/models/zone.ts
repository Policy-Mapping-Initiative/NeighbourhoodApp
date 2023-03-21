import { 
    MultiPolygon,
    FeatureCollection,
    Feature,
    GeoJsonProperties 
} from 'geojson';
import { LandUse, ZoneType } from './enums';
import { Neighbourhood } from './neighbourhood';

interface Props {
    neighbourhoodId: number,
    area: number,
    zoneType: ZoneType,
    landUse: LandUse,
    id: string
}

export class Zone implements Feature {
    type: 'Feature';
    properties: Props;
    geometry: MultiPolygon;
    // neighbourhood: Neighbourhood;
    imputedPopulation: Map<Number, Number>;

    constructor(feature: any) {
        
        this.properties = feature.properties;
        this.geometry = feature.geometry;
        this.type = "Feature";


        // TODO: Figure out where to store neighbourhoods stored by id so we can fetch a reference.
        // this.neighbourhood = null; 
        this.imputedPopulation = new Map(); 

        // TODO: Make this more evergreen
        // this.imputedPopulation.set(2023, (this.neighbourhood.density * this.area ))

    }

    get area() { 
        return this.properties.area;
    }

    get zoneType() { 
        return this.properties.zoneType;
    }

    get landUse() { 
        return this.properties.landUse;
    }

    get id() { 
        return this.properties.id;
    }
}