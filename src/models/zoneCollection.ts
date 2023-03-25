import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';
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
    crs: CRS | undefined;
    features: Zone[];
    private zoneHashMap: Map<string, Zone>      // Allows for faster o(1) retrieval of zones

    constructor() {
        this.type = 'FeatureCollection';
        this.features = [];
        this.zoneHashMap = new Map<string, Zone>();
    }

    initialise(zoneData: any) {
        this.crs = zoneData.crs;

        for (const feature of zoneData.features){
            const newZone = new Zone(feature);
            this.zoneHashMap.set(newZone.id, newZone);
            this.features.push(newZone);
        }
    }



    /**
     * 
     * @param id The UUID of the zone that we want to return
     * @returns A reference to the zone object that can be modified as necessary
     */
    getZone(id: string) : Zone {
        let zoneToReturn = this.zoneHashMap.get(id);

        if (zoneToReturn) return zoneToReturn;

        // Implicit Else: No zone found with ID.
        console.error(`No Zone found matching id ${id}`);
        throw Error(`No Zone found matching id ${id}`);
        
    }

    getZones(ids: Array<string>) : Array<Zone> {
        let zones : Array<Zone> = [];

        let zoneToPush : Zone | undefined;
        for (const id of ids) {
            zoneToPush = this.zoneHashMap.get(id);

            if (zoneToPush) zones.push(zoneToPush);

            // Implicit Else: No Zone
            console.error(`No Zone found matching id ${id}`);
        }

        return zones;
    }

    // Note: an addZone function might be necessary later on in development. It would add a Zone object to both the features list as well as the hashtable for O(1)
    // retrieval.

}