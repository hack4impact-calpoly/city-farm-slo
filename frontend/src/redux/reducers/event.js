import {
  addEventReducer,
  deleteEventReducer,
  editEventReducer,
  eventsReceived,
} from "../slices/event";

const fetchEvents = () => async (dispatch) => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/events`)
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
  fetch(`${process.env.REACT_APP_SERVER_URL}/events/add`, {
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
  fetch(`${process.env.REACT_APP_SERVER_URL}/events/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((data) => dispatch(editEventReducer(data)))
    .catch((err) => console.log(err));
};

const deleteEvent = (event) => async (dispatch) => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/events/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((data) => dispatch(deleteEventReducer(data)))
    .catch((err) => console.log(err));
};

export { fetchEvents, addEvent, editEvent, deleteEvent };
