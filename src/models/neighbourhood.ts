import { ThirtyFpsSelect } from '@mui/icons-material';
import { 
    MultiPolygon,
    FeatureCollection,
    Feature,
    GeoJsonProperties 
} from 'geojson';

import {Zone} from './zone'

interface Props {
    name: string,
    id: number,
    area: number,
    population: number,
    density: number,
    residenceCount: number,
    singleFamilyCount: number,
    midHighRiseCount: number,
    otherAttachedCount: number,
    semiDetachedCount: number,
    rowHouseCount: number,
    duplexCount: number,
    lowRiseCount: number,
    zones: Array<string>,
    residentialArea: number,
    mixedUseArea: number,
    nonResidentialArea: number,
    openSpaceArea: number,
    singleFamilyArea: number
}

export class Neighbourhood implements Feature {

    type: 'Feature';
    properties: Props;
    geometry: MultiPolygon;

    constructor(feature: any) {
        this.type = 'Feature'
        this.properties = feature.properties
        this.geometry = feature.geometry
    }

    get name() {
        return this.properties.name;
    }

    get id() {
        return this.properties.id;
    }

    get area() {
        return this.properties.area;
    }

    get population() {
        return this.properties.population
    }

    private set population(newPopulation : number) {
        this.properties.population = newPopulation;
    }

    get density() {
        return this.properties.density;
    }

    private set density (newDensity : number) {
        this.properties.density = newDensity;
    }

    get residenceCount() {
        return this.properties.residenceCount;
    }

    get singleFamilyCount() {
        return this.properties.singleFamilyCount;
    }

    get midHighRiseCount() {
        return this.properties.midHighRiseCount;
    }

    get otherAttachedCount() {
        return this.properties.otherAttachedCount;
    }

    get semiDetachedCount() {
        return this.properties.semiDetachedCount;
    }

    get rowHouseCount() {
        return this.properties.rowHouseCount;
    }

    get duplexCount() {
        return this.properties.duplexCount;
    }

    get lowRiseCount() {
        return this.properties.lowRiseCount;
    }

    get zones() {
        return this.properties.zones;
    }

    get residentialArea() {
        return this.properties.residentialArea;
    }

    get nonResidentialArea() {
        return this.properties.nonResidentialArea;
    }

    get mixedUseArea() {
        return this.properties.mixedUseArea;
    }

    get openSpaceArea() {
        return this.properties.openSpaceArea;
    }

    get singleFamilyArea() {
        return this.properties.singleFamilyArea;
    }

    get residentialAreaDensity() {
        return this.population / this.residentialArea;
    }

    /**
     * Updates both the population for a neighbourhood as well as adjusting density
     * to reflect these new figures
     * @param newPopulation 
     */
    updatePopulation(newPopulation : number) {
        this.population = newPopulation;
        this.density = this.population / this.area;
    }
}
