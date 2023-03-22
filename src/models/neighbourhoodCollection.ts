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
        // Sort the array to help for O(1) retrieval
        this.features = temp.sort((neighbourhoodA, neighbourhoodB) => neighbourhoodA.neighbourhoodId - neighbourhoodB.neighbourhoodId);
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