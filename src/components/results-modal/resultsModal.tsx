import { CircularProgress, Modal, Typography } from '@mui/material';
import { isResultsScreenOpen, populationResult, resultsCalculationState} from '../../selectors';
import { useAppDispatch, useAppSelector } from '../../store';


import { ModalBox } from '../common/modal';
import { closeResultsScreen } from '../../reducers/resultsSlice';


function renderModalBody(calculationState: 'unstarted' | 'calculating' | 'finished', projectedPopulation: number) {
    if (calculationState !== "finished") {
        return (
            <CircularProgress disableShrink sx={{ position: 'absolute', left: '50%', top: '50%' }} />
        )
    }
    // Implicit Else: We have finished our calculations
    // TODO: This is a very barebones implementation. This needs to look prettier. 
    return (
        <Typography id="policy modal temp" variant="body1" component="p">
            Your housing plan is capable of housing {projectedPopulation} people
        </Typography>
    )

}


export default function ResultsModal() {
  const modalState = useAppSelector(isResultsScreenOpen);
  const calculationState = useAppSelector(resultsCalculationState);
  const projectedPopulation = useAppSelector(populationResult);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(closeResultsScreen());

  //  If calculating... dispatch once the task to _do_ the calculations on the backend 

  return (
    <div>
      <Modal
        open={modalState}
        onClose={closeModal}
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
