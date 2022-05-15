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
      state.selectedEvent = action.payload;
    },
    addEventReducer: (state, action) => {
      const newArray = [...state.events, action.payload];
      state.events = newArray;
    },
    editEventReducer: (state, action) => {
      const idx = state.events.findIndex((e) => e.id === action.payload.id);
      state.events[idx] = action.payload;
    },
    deleteEventReducer: (state, action) => {
      const newArray = state.events.filter((e) => e.id !== action.payload.id);
      state.events = newArray;
    },
    registerReducer: (state) => {
      state.selectedEvent.volunteers = [
        ...state.selectedEvent.volunteers,
        "NEW_USER",
      ];
      const selectedIdx = state.events.findIndex(
        (e) => e.id === state.selectedEvent.id
      );
      state.events[selectedIdx] = state.selectedEvent;
    },
  },
});

// action creators generated for each case reducer function
export const {
  eventsReceived,
  setSelected,
  addEventReducer,
  editEventReducer,
  deleteEventReducer,
  registerReducer,
} = eventsSlice.actions;

export default eventsSlice.reducer;
