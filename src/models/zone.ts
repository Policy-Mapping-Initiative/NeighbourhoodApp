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

    private set zoneType(newZoneType) {
        this.zoneType = newZoneType
    }

    get landUse() { 
        return this.properties.landUse;
    }

    private set landUse(newLandUse) {
        this.landUse = newLandUse;
    }

    get id() { 
        return this.properties.id;

    }

    /**
     * Updates the zoning for an area and sunres that the landUse for the area reflects this new zoning.
     * @param newZoning The new zoning we want to apply to the area
     */
    updateZoning(newZoning: ZoneType) {
        this.zoneType = newZoning;

        switch (newZoning) {
            case ZoneType.RESIDENTIAL:
            case ZoneType.RESIDENTIAL_LOW:
            case ZoneType.RESIDENTIAL_MID_HIGH:
                this.landUse = LandUse.RESIDENTIAL;
                break;
            case ZoneType.MIXED_USE:
                this.landUse = LandUse.MIXED_USE;
                break;
            case ZoneType.EMPLOYMENT:
            case ZoneType.COMMERCIAL:
            case ZoneType.OPEN_SPACE:
                this.landUse = LandUse.NON_RESIDENTIAL;
                break;
            case ZoneType.OTHER:
                this.landUse = LandUse.OTHER;
                break;
        }
    }
}