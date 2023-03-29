import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface PolicyState {
  isModalOpen: boolean
  displayedPolicy: number
}

const initialState = {
  isModalOpen: false,
  displayedPolicy: 0
} as PolicyState;



export const policySlice = createSlice({
  name: 'policy',
  initialState: initialState,
  reducers: {
    openPolicyModal(state) {
        console.log("Here");
        state.isModalOpen = true;
        
    },
    closePolicyModal(state) {
        state.isModalOpen = false;
        state.displayedPolicy = 0;  // Reset the displayed policy for being reopened
    },
    incrementDisplayedPolicy(state) {
      // Should I be defensive like above ? 
      state.displayedPolicy += 1;
    },
    decrementDisplayedPolicy(state) {

      if (state.displayedPolicy > 0) {
        state.displayedPolicy -= 1;
      }
    }

  },
});

export const { openPolicyModal, closePolicyModal, incrementDisplayedPolicy, decrementDisplayedPolicy } = policySlice.actions;
