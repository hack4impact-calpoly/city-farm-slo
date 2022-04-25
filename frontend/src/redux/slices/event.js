/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

// initial state for event slice
const initialState = {
  events: [],
  selectedEvent: undefined, // contains currently selected event
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // add functions to update event
    eventsReceived: (state, action) => {
      state.events = action.payload;
    },
    setSelected: (state, action) => {
      // change this
      state.selectedEvent = action.payload;
    },
  },
});

// action creators generated for each case reducer function
export const { eventsReceived, setSelected } = eventsSlice.actions;

export default eventsSlice.reducer;
