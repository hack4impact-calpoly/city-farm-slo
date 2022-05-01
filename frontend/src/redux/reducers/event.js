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

const addEvent = (event) => async (dispatch) => {
  fetch("/events/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then(() => {
      dispatch(fetchEvents());
    });
};

const editEvent = (event) => async (dispatch) => {
  fetch("/events/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then(() => {
      dispatch(fetchEvents());
    });
};

const deleteEvent = (event) => async (dispatch) => {
  fetch("/events/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then(() => {
      dispatch(fetchEvents());
    });
};

export { fetchEvents, addEvent, editEvent, deleteEvent };
