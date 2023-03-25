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
    crs: CRS | undefined;       // TODO: This should be done in a better way
    features: Neighbourhood[];


    constructor() {
        this.type = 'FeatureCollection';
        this.features = [];
    }

    initialise(neighbourhoodData: any) {
        this.crs = neighbourhoodData.crs;

        for (const feature of neighbourhoodData.features){
            this.features.push(new Neighbourhood(feature));
        }

        this.features.sort((neighbourhoodA, neighbourhoodB) => neighbourhoodA.neighbourhoodId - neighbourhoodB.neighbourhoodId);
    }

    /**
     * Fetches a reference in O(1) to a neighbourhood. 
     * @param id The id corresponding to the neighbourhood in question
     * @returns A reference to the neighbourhood matching the id
     */
    getNeighbourhoodById(id : number) : Neighbourhood {
        return this.features[id - 1];   // Neighbourhood IDs start at 1, array indexing is 0 based. So subtract one
    }
}