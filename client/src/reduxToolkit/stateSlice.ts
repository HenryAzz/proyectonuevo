// states.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatesState {
  value: boolean;
}

const initialState: StatesState = {
  value: false,
};

const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = statesSlice.actions;
export default statesSlice.reducer;
