const selectAllEvents = (state) => state.events.events;
const selectEvent = (state) => state.events.selectedEvent;
export { selectAllEvents, selectEvent };
