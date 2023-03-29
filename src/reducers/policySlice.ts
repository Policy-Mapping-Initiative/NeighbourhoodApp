import {createSlice} from "@reduxjs/toolkit"


interface PolicyState {
  isModalOpen: boolean
}

const initialState = {
  isModalOpen: false
} as PolicyState;



export const policySlice = createSlice({
  name: 'policy',
  initialState: initialState,
  reducers: {
    openModal(state, _) {
        state.isModalOpen = true
    },
    closeModal(state, _) {
        state.isModalOpen = false
    }
  },
});
