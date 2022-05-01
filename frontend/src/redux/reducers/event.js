import { eventsReceived } from "../slices/event";

const fetchEvents = () => async (dispatch) => {
  fetch("/events")
    .then((res) => res.json())
    .then((dataNoDates) =>
      dataNoDates.map((anEvent) => ({
        ...anEvent,
        start: new Date(anEvent.start),
        end: new Date(anEvent.end),
      }))
    )
    .then((data) => {
      dispatch(eventsReceived(data));
    })
    .catch((err) => console.log(err));
};

export default fetchEvents;
