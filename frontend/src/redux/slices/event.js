import { createSlice } from "@reduxjs/toolkit";

// initial state for event slice
const initialState = {
  events: [],
  selectedEvent: undefined, // accepts id of currently selected event
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // add functions to update event
    eventsReceived: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.events = action.payload;
    },
    setSelected: (state, action) => {
      // change this
      // eslint-disable-next-line no-param-reassign
      state.selectedEvent = action.payload;
    },
  },
});

// action creators generated for each case reducer function
export const { eventsReceived, setSelected } = eventsSlice.actions;

export default eventsSlice.reducer;
