import { Modal, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useState } from 'react';
import { SubmitButton } from './styledComponent';
import { ModalBox } from '../common/modal';
import { useAppDispatch } from '../../store';
import { openResultsScreen } from '../../reducers/resultsSlice';

export function Submit() {
  const dispatch = useAppDispatch();
  const openResultsModal = () => dispatch(openResultsScreen());


  return (
    <div>
      <SubmitButton onClick={openResultsModal}>
        <Typography variant="body1" noWrap component="div" sx={{ flexGrow: 1 }}>
          Submit Policy
        </Typography>
      </SubmitButton>
    </div>
  );
}
