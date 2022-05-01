import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/event";

const store = configureStore({ reducer: { events: eventsReducer } });

export default store;
