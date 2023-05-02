import { CircularProgress, Modal, Typography } from '@mui/material';
import { 
  getNeighbourhoods, 
  getTTCIntersects800m, 
  isResultsScreenOpen, 
  populationResult, 
  resultsCalculationState,
  getZones,
  getPolicyDecisions
}
from '../../selectors';
import { useAppDispatch, useAppSelector } from '../../store';
import { CalculationFinishedMessage, ICalculateResultsEvent } from '../../workers/calculationWorker';

import { ModalBox } from '../common/modal';
import { closeResultsScreen, startCalculations, setCalculationErrorState, finishCalculations } from '../../reducers/resultsSlice';
import { useEffect, useMemo } from 'react';

function renderModalBody(calculationState: 'unstarted' | 'calculating' | 'finished' | 'error', projectedPopulation: number) {
  switch(calculationState) {
    case 'error':
      return  (
        <Typography id="policy modal temp" variant="body1" component="p">
        An error occurred while calculating the impacts of your policy proposals. Please try again.
    </Typography>
      )
    case 'finished':
      return (
        <Typography id="policy modal temp" variant="body1" component="p">
            Your housing plan is capable of housing {projectedPopulation} people
        </Typography>
      )
    default: 
      return (
        <CircularProgress disableShrink sx={{ position: 'absolute', left: '50%', top: '50%' }} />
      )
  }  
}

export default function ResultsModal() {
  const isOpen = useAppSelector(isResultsScreenOpen);
  const calculationState = useAppSelector(resultsCalculationState);
  const projectedPopulation = useAppSelector(populationResult);
  const neighbourhoods = useAppSelector(getNeighbourhoods);
  const ttcIntersects800m = useAppSelector(getTTCIntersects800m);
  const zones = useAppSelector(getZones);
  const policyDecisions = useAppSelector(getPolicyDecisions);
  const dispatch = useAppDispatch();

  //  If calculating... dispatch once the task to _do_ the calculations on the backend 
  // We can assume the browser works with webworkers
  let calculationWorker : Worker = useMemo(
    () => new Worker(new URL('../../workers/calculationWorker.ts', import.meta.url)), []
  );

  const closeModalFn = () => {
    console.log("Close modal");
    calculationWorker.terminate();
    dispatch(closeResultsScreen);
  };
  
  useEffect(() => {
    calculationWorker.onmessage = (event: MessageEvent) => {
      console.log("Handling the end")
      const calculationResults = event.data as CalculationFinishedMessage;
      console.dir(calculationResults);
      dispatch(finishCalculations(calculationResults.newPopulation));
      console.log("Terminating Worker");
      calculationWorker.terminate();
    };
  }, [calculationWorker, dispatch]);


  useEffect(() => {
    calculationWorker.onerror = (error: ErrorEvent) => {
      calculationWorker.terminate();
      console.error(error);
      dispatch(setCalculationErrorState)
    }
  }, [calculationWorker, dispatch])

  useEffect(() => {
    if (isOpen && calculationState === "unstarted") {
      dispatch(startCalculations);
      // FIX-ME: Get alternatives with only the _need to know data_
      const currentState : ICalculateResultsEvent = {
        neighbourhoods: neighbourhoods,
        zones: zones,
        ttcIntersects: ttcIntersects800m ? ttcIntersects800m : {},    // Sort of hacky,.. might want to do better
        policyDecisions: policyDecisions
      } 

      calculationWorker.postMessage(currentState);
    }
  }, [calculationWorker, dispatch, neighbourhoods, zones, ttcIntersects800m, policyDecisions, calculationState, isOpen]);


  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModalFn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="results-modal"
      >
        <ModalBox>
          <Typography id="policy-modal-title" variant="h6" component="h2">
            Results
          </Typography>
          {renderModalBody(calculationState, projectedPopulation)}
        </ModalBox>
      </Modal>
    </div>
  );
}
