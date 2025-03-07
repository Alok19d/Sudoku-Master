import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hints: 3,
}

const hintSlice = createSlice({
  name: 'hint',
  initialState,
  reducers: {
    reduceHints: (state) => {
      if(state.hints > 0){
        state.hints -= 1;
      }
    },
    resetHints: (state) => {
      state.hints = 3;
    }
  }
})

export const { 
  reduceHints,
  resetHints,
} = hintSlice.actions;

export default hintSlice.reducer; 