import { Box, Button, MobileStepper, Modal, Typography } from '@mui/material';
import { displayedPolicy, isPolicyModalOpen } from '../../selectors';
import { closePolicyModal, incrementDisplayedPolicy, decrementDisplayedPolicy } from '../../reducers/policySlice';
import { useAppDispatch, useAppSelector } from '../../store';
import './policyModal.css';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SubwayPolicyScreen from './policy-screens/subwayPolicyScreen';

export default function PolicyModal() {
  const isOpen = useAppSelector(isPolicyModalOpen);
  const activeStep = useAppSelector(displayedPolicy);
  const steps = 2;

  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(closePolicyModal());
  const handleNext = () => dispatch(incrementDisplayedPolicy());
  const handleBack = () => dispatch(decrementDisplayedPolicy());

  // Will ensure that on the last policy we display a "Finish" button
  // instead of next
  const renderRightHandButton = () => {
    if (activeStep < steps - 1) {
      return (
        <Button size="small" onClick={handleNext}>
          Next
          <KeyboardArrowRight />
        </Button>
      );
    }
    // Implicit Else: We are at the last step
    return (
      <Button size="small" onClick={closeModal}>
        Finish
      </Button>
    );
  };

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0:
        return <SubwayPolicyScreen />;
      default:
        return (
          <Typography id="policy-modal-description" sx={{ mt: 2 }}>
            This is where other content will Go
          </Typography>
        );
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="policy-modal"
      >
        <Box id="policy-modal-box">
          <Typography id="policy-modal-title" variant="h6" component="h2">
            Select Citywide Policies
          </Typography>
          {renderActiveStep()}
          <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={renderRightHandButton()}
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Box>
      </Modal>
    </div>
  );
}
