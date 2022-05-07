import { React, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import Calendar from "../UserSignUp/Calendar";
// import EventCard from "../UserSignUp/EventCard";
import returnImg from "../ManageEventsPage/return.png";

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

const RightContainer = styled.div`
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

// temp div for event card
// can discard after hooking up state to event card
const TempEvent = styled.div`
  background-color: #c1d741;
  width: 20vh;
  margin-bottom: 30px;
  cursor: pointer;
  font-family: Urbanist;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 30px;
  color: white;
`;

export default function AddEvent() {
  const events = useSelector(selectAllEvents);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  return (
    <div>
      <FullPage>
        <LeftContainer>
          <Title> Add Event </Title>
          <CalendarWrapper>
            <Calendar events={events} />
          </CalendarWrapper>
        </LeftContainer>
        <RightContainer>
          <ReturnContainer>
            <img src={returnImg} alt="return" />
          </ReturnContainer>
          <ColStack>
            <Row> Event Name </Row>
            <Text1 variant="filled" />
          </ColStack>
          <Row>
            <ColStack>
              <Row> Date </Row>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  renderInput={(params) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Text2 variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
            </ColStack>
            <ColStack>
              <Row2> Max Slots </Row2>
              <Row2>
                <Text2 variant="filled" type="number" />
              </Row2>
            </ColStack>
          </Row>
          <Row>
            <ColStack>
              <Row> Start Time </Row>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={selectedTime}
                  onChange={(date) => setSelectedTime(date)}
                  renderInput={(params) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Text2 variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
            </ColStack>
            <ColStack>
              <Row2> End Time </Row2>
              <Row2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={selectedTime}
                    onChange={(date) => setSelectedTime(date)}
                    renderInput={(params) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <Text2 variant="filled" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Row2>
            </ColStack>
          </Row>

          <ColStack>
            <Row> Location </Row>
            <Text1 variant="filled" />
            <Row> Special Notes </Row>
            <Text3 variant="filled" multiline rows="6" />
          </ColStack>
          <Row>
            <Button> Add </Button>
            {/* Temporary div for event card */}
            <TempEvent> event card </TempEvent>
          </Row>
        </RightContainer>
      </FullPage>
    </div>
  );
}
