import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubwayPolicyState } from '../models/enums';

interface PolicyState {
  isModalOpen: boolean;
  displayedPolicy: number;
  subwayPolicy: SubwayPolicyState;
}

const initialState = {
  isModalOpen: false,
  displayedPolicy: 0,
  subwayPolicy: SubwayPolicyState.NOT_SET,
} as PolicyState;

export const policySlice = createSlice({
  name: 'policy',
  initialState: initialState,
  reducers: {
    openPolicyModal(state) {
      state.isModalOpen = true;
    },
    closePolicyModal(state) {
      state.isModalOpen = false;
      state.displayedPolicy = 0; // Reset the displayed policy for being reopened
    },
    incrementDisplayedPolicy(state) {
      // Should I be defensive like above ?
      state.displayedPolicy += 1;
    },
    decrementDisplayedPolicy(state) {
      if (state.displayedPolicy > 0) {
        state.displayedPolicy -= 1;
      }
    },
    setSubwayPolicy(state, action: PayloadAction<{ newPolicy: SubwayPolicyState }>) {
      state.subwayPolicy = action.payload.newPolicy;
    },
  },
});

export const {
  openPolicyModal,
  closePolicyModal,
  incrementDisplayedPolicy,
  decrementDisplayedPolicy,
  setSubwayPolicy,
} = policySlice.actions;
