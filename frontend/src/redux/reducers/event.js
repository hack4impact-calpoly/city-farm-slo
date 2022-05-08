import {
  addEventReducer,
  deleteEventReducer,
  editEventReducer,
  eventsReceived,
} from "../slices/event";

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
    .then((data) => dispatch(addEventReducer(data)))
    .catch((err) => console.log(err));
};

const editEvent = (event) => async (dispatch) => {
  fetch("/events/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).catch((err) => console.log(err));
  dispatch(editEventReducer(event));
};

const deleteEvent = (event) => async (dispatch) => {
  fetch("/events/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).catch((err) => console.log(err));
  dispatch(deleteEventReducer(event));
};

export { fetchEvents, addEvent, editEvent, deleteEvent };
