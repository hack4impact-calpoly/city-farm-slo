import { React, useState, useEffect } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Calendar from "../UserSignUp/Calendar";
import EventCard from "../UserSignUp/EventCard";
import returnImg from "../ManageEventsPage/return.png";

import { addEvent } from "../../redux/reducers/event";
import { selectAllEvents } from "../../redux/selectors/event";

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
  &:enabled:hover {
    background-color: #0a8a52;
    box-shadow: none;
  }
  &:focus {
    background-color: #0cb069;
    box-shadow: none;
  }
`;

export default function AddEvent() {
  // validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Event name is required"),
    date: Yup.date()
      .required("Event date is required")
      .defined()
      .typeError("Invalid date"),
    startTime: Yup.date()
      .required("Event start time is required")
      .typeError("Invalid time"),
    endTime: Yup.date()
      .required("Event end time is required")
      .typeError("Invalid time")
      .test(
        "is-greater",
        "End time must be after start time",
        function (value) {
          // eslint-disable-next-line react/no-this-in-sfc
          const { startTime } = this.parent;
          return new Date(value) > new Date(startTime);
        }
      ),
    location: Yup.string().required("Event location is required"),
  });

  const history = useHistory();

  const events = useSelector(selectAllEvents);
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, watch } = useForm({
    mode: "onChange",
    // yup validation here
    resolver: yupResolver(validationSchema),
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    start: new Date(),
    end: new Date(),
    slots: 0,
    notes: "",
    volunteers: [],
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
      setNewEvent(event);
      resolve(event);
    });

  useEffect(() => {
    updateNewEvent(watch());
  }, [JSON.stringify(watch())]);

  const onSubmit = async (values) => {
    const event = await updateNewEvent(values);
    dispatch(addEvent(event));
    reset();
    history.push({
      pathname: "/admin/manage-events",
      state: { open: true },
    });
  };

  return (
    <div>
      <FullPage>
        <LeftContainer>
          <Title> Add Event </Title>
          <CalendarWrapper>
            <Calendar events={events} />
          </CalendarWrapper>
        </LeftContainer>
        <RightContainer onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue=""
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Text1
                  required
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
              <Row>Date</Row>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  key="date"
                  name="date"
                  defaultValue={new Date()}
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
                          required
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
                  defaultValue={50}
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
                  defaultValue={new Date(new Date() - 1)}
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
                          required
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
                    defaultValue={new Date()}
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
                            required
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
              defaultValue=""
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Text1
                  required
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
              defaultValue=""
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Text3
                  variant="filled"
                  multiline
                  maxRows="4"
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
          </ColStack>
          <Row>
            <StyledButton type="submit" variant="contained" color="primary">
              Add
            </StyledButton>
            {/* Temporary div for event card */}
            <EventCard event={newEvent} />
          </Row>
        </RightContainer>
      </FullPage>
    </div>
  );
}
