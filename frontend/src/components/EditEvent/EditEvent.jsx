import { React, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import Calendar from "../UserSignUp/Calendar";
// import EventCard from "../UserSignUp/EventCard";
import returnImg from "../ManageEventsPage/return.png";

import { editEvent, deleteEvent } from "../../redux/reducers/event";
import { selectAllEvents, selectEvent } from "../../redux/selectors/event";
import { setSelected } from "../../redux/slices/event";

const Title = styled.div`
  color: white;
  font-weight: 900;
  font-size: 42px;
  padding-bottom: 30px;
`;

const FullPage = styled.div`
  background: #003c45;
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #ffffff;
  height: 75vh;
  width: 100%;
  border-radius: 12px;
`;

const ReturnContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 25px;
  transform: scale(0.8);
`;

const LeftContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5%;
  padding-left: 3%;
  z-index: 1;
`;

const RightContainer = styled.form`
  width: 30%;
  height: 78vh;
  display: flex;
  flex-direction: column;
  background-color: #c9e8eb;
  margin: 50px;
  margin-left: 1%;
  border-radius: 20px;
  padding: 70px 30px 30px 30px;
  position: relative;
  z-index: 1;
`;

const Button = styled.button`
  width: 15vh;
  margin-bottom: 30px;
  cursor: pointer;
  font-family: Urbanist;
  font-size: 20px;
  font-weight: bold;
  background: #0ba360;
  border-radius: 5px;
  border: none;
  padding: 30px;
  color: white;
`;

const Text1 = styled(TextField)`
  margin-top: 5px;
  margin-bottom: -10px;
  width: 100%;
  min-width: 300px;
  z-index: 1;
  .MuiFilledInput-root {
    background-color: #e4e4e4;
    border-radius: 10px;
    border-style: none;
    height: 60%;
    padding-bottom: 10px;
  }
`;

const Text2 = styled(TextField)`
  margin-top: 5px;
  margin-bottom: -10px;
  width: 12vw;
  min-width: 30%;
  z-index: 1;
  .MuiFilledInput-root {
    background-color: #e4e4e4;
    border-radius: 10px;
    border-style: none;
    height: 60%;
    padding-bottom: 5px;
  }
`;

const Text3 = styled(TextField)`
  margin-top: 5px;
  margin-bottom: 20px;
  width: 100%;
  min-width: 30%;
  z-index: 1;
  .MuiFilledInput-root {
    background-color: #e4e4e4;
    border-radius: 10px;
    border-style: none;
    max-height: 15vh;
    padding-top: 18px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Urbanist;
  font-size: 20px;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-family: Urbanist;
  font-size: 20px;
`;

const ColStack = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin: 0 20px 0 0;
  background-color: #0ba360;
  border-radius: 20px;
  padding: 20px;
  font-family: "Urbanist", sans-serif;
  font-size: 24px;
  font-weight: 800;
  z-index: 10;
  text-transform: capitalize;
  box-shadow: none;
  &:disabled {
    background-color: #b8b4b4;
  }
  &:hover {
    background-color: #0a8a52;
    box-shadow: none;
  }
  &:focus {
    background-color: #0cb069;
    box-shadow: none;
  }
`;

const StyledButton2 = styled(Button)`
  margin: 0 20px 0 0;
  background-color: #ff4444;
  border-radius: 20px;
  padding: 20px;
  font-family: "Urbanist", sans-serif;
  font-size: 24px;
  font-weight: 800;
  z-index: 10;
  text-transform: capitalize;
  box-shadow: none;
  &:disabled {
    background-color: #b8b4b4;
  }
  &:hover {
    background-color: #bd3333;
    box-shadow: none;
  }
  &:focus {
    background-color: #0cb069;
    box-shadow: none;
  }
`;

export default function EditEvent() {
  const history = useHistory();

  // events
  const events = useSelector(selectAllEvents);
  const selected = useSelector(selectEvent);
  const dispatch = useDispatch();
  const [eventClicked, setClicked] = useState(false);

  const { handleSubmit, control, reset, formState } = useForm({
    mode: "onChange",
    defaultValues: useMemo(() => selected, [selected]),
    // yup validation here
  });

  // updated new event state with combined date and start/end times to match backend schema
  const updateNewEvent = async (values) =>
    // async function to reduce input lag
    new Promise((resolve) => {
      const event = {
        ...values,
        start: new Date(
          `${values.date.toDateString()} ${values.startTime.toTimeString()}`
        ),
        end: new Date(
          `${values.date.toDateString()} ${values.endTime.toTimeString()}`
        ),
        volunteers: [],
      };
      resolve(event);
    });

  const onEdit = async (values) => {
    const event = await updateNewEvent(values);
    console.log(event);
    dispatch(editEvent(event));
    reset();
    history.push("admin/manage-events");
  };

  const onDelete = (values) => {
    dispatch(deleteEvent(values));
    history.push("admin/manage-events");
  };

  useEffect(() => {
    // add fields to match event to form fields
    reset({
      ...selected,
      date: selected ? selected.start : null,
      startTime: selected ? selected.start : null,
      endTime: selected ? selected.end : null,
    });
  }, [selected]);

  if (eventClicked === false) {
    return (
      <div>
        <FullPage>
          <LeftContainer>
            <Title> Edit Event </Title>
            <CalendarWrapper>
              <Calendar
                events={events}
                selectedEvent={selected}
                eventClicked={eventClicked}
                setClicked={setClicked}
              />
            </CalendarWrapper>
          </LeftContainer>
        </FullPage>
      </div>
    );
  }

  return (
    <div>
      <FullPage>
        <LeftContainer
          onClick={() => {
            setClicked(false);
            dispatch(setSelected(undefined));
          }}
        >
          <Title> Edit Event </Title>
          <CalendarWrapper>
            <Calendar
              events={events}
              selectedEvent={selected}
              eventClicked={eventClicked}
              setClicked={setClicked}
            />
          </CalendarWrapper>
        </LeftContainer>
        <RightContainer>
          <ReturnContainer>
            <Link to="/admin/manage-events">
              <img src={returnImg} alt="return" />
            </Link>
          </ReturnContainer>
          <ColStack>
            <Row> Event Name </Row>
            <Controller
              key="title"
              name="title"
              defaultValue={selected.title}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Text1
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
          </ColStack>
          <Row>
            <ColStack>
              <Row> Date </Row>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  key="date"
                  name="date"
                  defaultValue={selected.start}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <Text2
                          variant="filled"
                          helperText={error ? error.message : null}
                          error={!!error}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...params}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </ColStack>
            <ColStack>
              <Row2> Max Slots </Row2>
              <Row2>
                <Controller
                  key="slots"
                  name="slots"
                  defaultValue={selected.slots}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Text2
                      variant="filled"
                      type="number"
                      value={value}
                      onChange={onChange}
                      helperText={error ? error.message : null}
                      error={!!error}
                    />
                  )}
                />
              </Row2>
            </ColStack>
          </Row>
          <Row>
            <ColStack>
              <Row> Start Time </Row>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  key="startTime"
                  name="startTime"
                  defaultValue={selected.start}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TimePicker
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <Text2
                          variant="filled"
                          helperText={error ? error.message : null}
                          error={!!error}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...params}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </ColStack>
            <ColStack>
              <Row2> End Time </Row2>
              <Row2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    key="endTime"
                    name="endTime"
                    defaultValue={selected.end}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TimePicker
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <Text2
                            variant="filled"
                            helperText={error ? error.message : null}
                            error={!!error}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...params}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Row2>
            </ColStack>
          </Row>

          <ColStack>
            <Row> Location </Row>
            <Controller
              key="location"
              name="location"
              defaultValue={selected.location}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Text1
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
            <Row> Special Notes </Row>
            <Controller
              key="notes"
              name="notes"
              defaultValue={selected.notes}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Text3
                  variant="filled"
                  multiline
                  rows="4"
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
          </ColStack>
          <Row>
            <StyledButton2
              variant="contained"
              disabled={!formState.isValid}
              onClick={handleSubmit(onDelete)}
            >
              Remove Event
            </StyledButton2>
            {/* Temporary div for event card */}
            {/* <EventCard event={newEvent} /> */}
            <StyledButton
              variant="contained"
              disabled={!formState.isValid}
              onClick={handleSubmit(onEdit)}
            >
              Confirm Edits
            </StyledButton>
          </Row>
        </RightContainer>
      </FullPage>
    </div>
  );
}
