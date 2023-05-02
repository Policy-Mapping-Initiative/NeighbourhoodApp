
import { IZone } from "../interfaces/zone";
import { LandUse, SubwayPolicyState } from "../models/enums";
import CalculationConstants from "../utils/calculationConstants";
import { INeighbourhood } from "../interfaces/neigbourhood";
import { PolicyDecisionSet } from "../interfaces/policy";

export interface ICalculateResultsEvent {
    neighbourhoods: INeighbourhood[],
    ttcIntersects: {[key: number]: number},
    zones: IZone[],
    policyDecisions: PolicyDecisionSet
}

export interface CalculationFinishedMessage {
    newPopulation: number
}


function handlePolicies(neighbourhoodDeltas: Array<number>, state: ICalculateResultsEvent) {
    console.log("Handling Policies");
    const subwayPolicyChoice = state.policyDecisions.subwayPolicy;

    if (subwayPolicyChoice !== SubwayPolicyState.NOT_SET) {
        neighbourhoodDeltas = handleSubwayPolicy(state, neighbourhoodDeltas);
    }

    return neighbourhoodDeltas;
}

/**
 * I'm using a pretty odd way of calculating how something like an MTSA might 
 * interact with our zones. I've gone and pre-computed the amount of area that overlaps with *ANY*
 * TTC station and a given zone. 
 */
function handleSubwayPolicy(state: ICalculateResultsEvent, neighbourhoodDeltas: Array<number>) : Array<number> {
    console.log("Handling Subway Policies");
    const zones = state.zones
    const ttcIntersects800m = state.ttcIntersects
    const subwayPolicy = state.policyDecisions.subwayPolicy;
    const subwayPolicyDensity = CalculationConstants.POPULATION_DENSITY_ASSUMPTIONS_BY_SUBWAY_POLICY[subwayPolicy];

    if (!ttcIntersects800m) {
        return neighbourhoodDeltas;
    }

    for(let zoneId in ttcIntersects800m) {
        // TODO: Remove me
        let zoneIdInt = parseInt(zoneId);

        const zone = zones[zoneIdInt];
        const overlapArea = ttcIntersects800m[zoneId];
        const neighbourhoodId = zone.properties.neighbourhoodId

        // If it's non residential, don't care too much about it.
        if (zone.properties.landUse === LandUse.NON_RESIDENTIAL ||  zone.properties.landUse === LandUse.OTHER) {
            continue;
        }


        // If density would increase for the zone, lets increase it, else do nothing
        // Here we are preventing double counting 
        console.log(`Zone Assumption: ${CalculationConstants.POPULATION_DENSITY_ASSUMPTIONS_BY_ZONE[zone.properties.type]}`);
        console.log(`Policy Density: ${subwayPolicyDensity}`);
        if (CalculationConstants.POPULATION_DENSITY_ASSUMPTIONS_BY_ZONE[zone.properties.type] < subwayPolicyDensity) {
            console.log(`Difference for ${zoneId}`)
            neighbourhoodDeltas[neighbourhoodId] += Math.ceil(overlapArea * subwayPolicyDensity);

            zone.properties.area -= overlapArea;  
        }
    }


    return neighbourhoodDeltas
}

/**
 * TODO: Once we _actually_ rezone neighbourhoods, modify the neighbourhood deltas.
 * @param neighbourhoodDeltas 
 * @returns 
 */
function handleSpotZoning(neighbourhoodDeltas: Array<number>, state: ICalculateResultsEvent) : Array<number> {
    console.log("Handling Spot Zoning");
    return neighbourhoodDeltas;
}


/**
 * This whole approach (for now) assumes a population density approach to growth. It may in the end 
 * be desirable to look at the number of new units made possible because it 
 * 
 * 1. Matches with existing provincial targets
 * 2. Is, in some regards, easier to sort out than population... And doesnt raise as many nasty questions 
 * about population loss etc. 
 */
function calculateResults(state: ICalculateResultsEvent) {
    let neighbourhoodDeltas = new Array<number>(state.neighbourhoods.length).fill(0);

    neighbourhoodDeltas = handlePolicies(neighbourhoodDeltas, state);
    neighbourhoodDeltas = handleSpotZoning(neighbourhoodDeltas, state);

    // Update Population
    const newPopulation = CalculationConstants.TORONTO_POPULATION + neighbourhoodDeltas.reduce((sum, currentValue) => sum + currentValue, 0);
    console.log(`Finished: ${newPopulation}`);
    postMessage({
        newPopulation: newPopulation
    } as CalculationFinishedMessage)

}

onmessage = (event: MessageEvent) => {
    let state = event.data as ICalculateResultsEvent;
    calculateResults(state);

}