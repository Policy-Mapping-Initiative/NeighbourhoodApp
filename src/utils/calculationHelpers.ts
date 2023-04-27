import { Summarize } from "@mui/icons-material";
import { LandUse, SubwayPolicyState } from "../models/enums";
import { updateZoneArea } from "../reducers/zoneSlice";
import { getTTCIntersects, getZones, subwayPolicy, getNeighbourhoods } from "../selectors";
import { useAppDispatch, useAppSelector } from "../store";
import CalculationConstants from "./calculationConstants";
import { finishCalculations, setPopulation } from "../reducers/resultsSlice";

function handlePolicies(neighbourhoodDeltas: Array<number>) {
    const subwayPolicyChoice = useAppSelector(subwayPolicy);

    if (subwayPolicyChoice !== SubwayPolicyState.NOT_SET) {
        neighbourhoodDeltas = handleSubwayPolicy(subwayPolicyChoice, neighbourhoodDeltas);
    }

    return neighbourhoodDeltas;
}

/**
 * I'm using a pretty odd way of calculating how something like an MTSA might 
 * interact with our zones. I've gone and pre-computed the amount of area that overlaps with *ANY*
 * TTC station and a given zone. 
 */
function handleSubwayPolicy(subwayPolicyChoice: SubwayPolicyState, neighbourhoodDeltas: Array<number>) : Array<number> {
    const dispatch = useAppDispatch();
    const zones = useAppSelector(getZones);
    const ttcIntersects800m = useAppSelector(getTTCIntersects)?.["800m"];
    const subwayPolicyDensity = CalculationConstants.POPULATION_DENSITY_ASSUMPTIONS_BY_SUBWAY_POLICY[subwayPolicyChoice];

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
        if (zone.properties.landUse === LandUse.NON_RESIDENTIAL || LandUse.OTHER) {
            continue;
        }


        // If density would increase for the zone, lets increase it, else do nothing
        if (CalculationConstants.POPULATION_DENSITY_ASSUMPTIONS_BY_ZONE[zone.properties.type] < subwayPolicyDensity) {
            neighbourhoodDeltas[neighbourhoodId] += overlapArea * subwayPolicyDensity;  // Update our deltas
            dispatch(updateZoneArea({
                zoneId: zoneIdInt, 
                delta: -overlapArea
            }));
        }
    }


    return neighbourhoodDeltas
}

/**
 * TODO: Once we _actually_ rezone neighbourhoods, modify the neighbourhood deltas.
 * @param neighbourhoodDeltas 
 * @returns 
 */
function handleSpotZoning(neighbourhoodDeltas: Array<number>) : Array<number> {
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
function calculateResults() {
    const dispatch = useAppDispatch();

    const neighbourhoods = useAppSelector(getNeighbourhoods);
    let neighbourhoodDeltas = new Array<number>(neighbourhoods.length).fill(0);

    neighbourhoodDeltas = handlePolicies(neighbourhoodDeltas);
    neighbourhoodDeltas = handleSpotZoning(neighbourhoodDeltas);

    // Update Population
    const newPopulation = CalculationConstants.TORONTO_POPULATION + neighbourhoodDeltas.reduce((sum, currentValue) => sum + currentValue, 0);
    dispatch(setPopulation(newPopulation));
    dispatch(finishCalculations());

}

export default calculateResults;