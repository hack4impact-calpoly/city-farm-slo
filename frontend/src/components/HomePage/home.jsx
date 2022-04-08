import { React, useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import flower from "./flower-bg.png";
import Calendar from "../UserSignUp/Calendar";
import EventCard from "../UserSignUp/EventCard";
import HomeModal from "./HomeModal";
import SignUpForm from "../UserSignUp/SignUpForm";
import AgeSelect from "../UserSignUp/AgeSelect";
import RegistrationComplete from "../RegistrationComplete/RegistrationComplete";
import WaiverPage from "../WaiverComponent/WaiverPage";

// styled components
const Title1 = styled.div`
  color: #003c45;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px 15px;
  font-weight: 900;
  font-size: 36px;
`;

const Title2 = styled.div`
  color: #003c45;
  font-weight: 900;
  font-size: 42px;
  padding-bottom: 30px;
`;

const Header = styled.div`
  width: 900px;
  display: flex;
  justify-content: flex-start;
`;

const FullPage = styled.div`
  background: #c9e8eb;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FullPage2 = styled.div`
  background: #c9e8eb;
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

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const PlantContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 5%;
  z-index: -10;
`;

const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7%;
  z-index: 1;
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  background: #003c45;
  height: 90vh;
  width: 17px;
  border-radius: 30px;
`;

const Register = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  max-height: 173px;
  color: #ffffff;
  background: #003c45;
  border-radius: 30px;
  font-size: 42px;
  font-weight: 900;
  padding: 10px;
  margin-top: 6%;
`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export default function Home({ selectedEvent, setEvent }) {
  // routing
  const history = useHistory();

  // modal state
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
    history.push("/");
  };

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

  // current user state
  const [user, setUser] = useState({
    // temp user for testing
    // replace by calling setUser() in the SignUpForm component
    id: "621dd07b29f7fa692b27bca6",
  });

  if (eventClicked === false) {
    return (
      <div>
        <FullPage>
          <Title1>City Farm SLO</Title1>
          <CenterWrap>
            <Title2>Select an Event to Register</Title2>
            <CalendarWrapper>
              <Calendar
                events={events}
                selectedEvent={selectedEvent}
                setEvent={setEvent}
                eventClicked={eventClicked}
                setClicked={setClicked}
              />
            </CalendarWrapper>
          </CenterWrap>
          <PlantContainer>
            <img src={flower} alt="Flower" />
          </PlantContainer>
        </FullPage>
      </div>
    );
  }
  return (
    <div>
      <FullPage2>
        <LeftContainer>
          <EventCard event={selectedEvent} />
          <Link to="/age-selection" style={linkStyle} onClick={handleModalOpen}>
            <Register>Register</Register>
          </Link>
          <PlantContainer>
            <img src={flower} alt="Flower" />
          </PlantContainer>
        </LeftContainer>
        <DividerContainer>
          <Divider />
        </DividerContainer>
        <RightContainer>
          <Title1>City Farm SLO</Title1>
          <CenterWrap>
            <Header>
              <Title2>Select an Event to Register</Title2>
            </Header>
            <CalendarWrapper>
              <Calendar
                events={events}
                selectedEvent={selectedEvent}
                setEvent={setEvent}
                eventClicked={eventClicked}
                setClicked={setClicked}
              />
            </CalendarWrapper>
          </CenterWrap>
        </RightContainer>
      </FullPage2>
      <HomeModal open={open} handleClose={handleModalClose}>
        <Switch>
          <Route path="/registration">
            <SignUpForm
              selectedEvent={selectedEvent}
              handleModalClose={handleModalClose}
              setUser={setUser}
            />
          </Route>
          <Route path="/waiver">
            <WaiverPage user={user} />
          </Route>
          <Route path="/registration-complete">
            <RegistrationComplete
              selectedEvent={selectedEvent}
              handleModalClose={handleModalClose}
            />
          </Route>
          <Route path="/age-selection">
            <AgeSelect
              selectedEvent={selectedEvent}
              handleModalClose={handleModalClose}
            />
          </Route>
        </Switch>
      </HomeModal>
    </div>
  );
}

Home.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  setEvent: PropTypes.func.isRequired,
};
