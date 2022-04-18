import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Calendar from "../UserSignUp/Calendar";
import returnImg from "./return.png";

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
  width: 900px;
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
  height: 83vh;
  display: flex;
  flex-direction: column;
  background-color: #c9e8eb;
  margin: 50px;
  margin-left: unset;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 30px;
  position: relative;
`;

const Button = styled.button`
  width: 100%;
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

export default function ManageEventsPage({ selectedEvent, setEvent }) {
  // events state
  const [events, setEvents] = useState([]);
  const [eventClicked, setClicked] = useState(false);
  useEffect(() => {
    fetch("/events")
      .then((res) => res.json())
      .then((dataNoDates) =>
        dataNoDates.map((anEvent) => ({
          ...anEvent,
          start: new Date(anEvent.start),
          end: new Date(anEvent.end),
        }))
      )
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  if (eventClicked === false) {
    return (
      <div>
        <FullPage>
          <LeftContainer>
            <Title> Manage Events </Title>
            <CalendarWrapper>
              <Calendar
                events={events}
                selectedEvent={selectedEvent}
                setEvent={setEvent}
                eventClicked={eventClicked}
                setClicked={setClicked}
              />
            </CalendarWrapper>
          </LeftContainer>
          <RightContainer>
            <ReturnContainer>
              <img src={returnImg} alt="return" />
            </ReturnContainer>
            <Button>Add event</Button>
            <Button>Edit and remove events</Button>
          </RightContainer>
        </FullPage>
      </div>
    );
  }
  return (
    <div>
      <div>
        <FullPage>
          <LeftContainer>
            <Title> Manage Events </Title>
            <CalendarWrapper>
              <Calendar
                events={events}
                selectedEvent={selectedEvent}
                setEvent={setEvent}
                eventClicked={eventClicked}
                setClicked={setClicked}
              />
            </CalendarWrapper>
          </LeftContainer>
          <RightContainer>
            <ReturnContainer>
              <img src={returnImg} alt="return" />
            </ReturnContainer>
            <Button>Add event</Button>
            <Button>Edit and remove events</Button>
          </RightContainer>
        </FullPage>
      </div>
    </div>
  );
}

ManageEventsPage.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  setEvent: PropTypes.func.isRequired,
};