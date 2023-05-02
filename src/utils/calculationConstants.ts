import { SubwayPolicyState, ZoneType } from "../models/enums";

export default class CalculationConstants {

    static TORONTO_POPULATION : number = 2794356;

    // TODO: FIX ME
    static POPULATION_DENSITY_ASSUMPTIONS_BY_ZONE : {[key: string] : number} = {
        [ZoneType.RESIDENTIAL_LOW]: 3000,
        [ZoneType.RESIDENTIAL]: 7000,
        [ZoneType.RESIDENTIAL_MID_HIGH]: 17000,
        [ZoneType.MIXED_USE]: 12000
    };

    static POPULATION_DENSITY_ASSUMPTIONS_BY_SUBWAY_POLICY : {[key: string] : number} = {
        [SubwayPolicyState.LOW_DENSITY]: 3000,
        [SubwayPolicyState.HIGH_DENSITY]: 21000
    };
}