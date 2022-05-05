import { React, useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import flower from "./flower-bg.png";
import Calendar from "../UserSignUp/Calendar";
import EventCard from "../UserSignUp/EventCard";
import HomeModal from "./HomeModal";
import SignUpForm from "../UserSignUp/SignUpForm";
import AgeSelect from "../UserSignUp/AgeSelect";
import RegistrationComplete from "../RegistrationComplete/RegistrationComplete";
import WaiverPage from "../WaiverComponent/WaiverPage";
import { selectAllEvents, selectEvent } from "../../redux/selectors/event";
import { setSelected } from "../../redux/slices/event";

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
  background: ${(props) => (props.enabled ? "#003c45" : "#c4c4c4")};
  cursor: ${(props) => (props.enabled ? "pointer" : "auto")};
  border-radius: 30px;
  font-size: 42px;
  font-weight: 900;
  padding: 10px;
  margin-top: 6%;
`;

const AdminLoginButton = styled(Link)`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #003c45;
  font-weight: 900;
  font-size: 36px;
  text-decoration: none;
  padding: 15px;
`;

export default function Home() {
  // routing
  const history = useHistory();

  // modal state
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
    history.push("/");
  };

  // over 18 state
  const [isAdult, setisAdult] = useState(false);
  const handleisAdult = () => {
    setisAdult(true);
  };
  const handlenotAdult = () => {
    setisAdult(false);
  };

  // events state
  const events = useSelector(selectAllEvents);
  const selected = useSelector(selectEvent);
  const dispatch = useDispatch();
  const [eventClicked, setClicked] = useState(false);

  // email handler for successful sign up
  const sendEmail = (data) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/mail/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: data,
        event: selected.title,
      }),
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  };

  // current user state
  const [user, setUser] = useState({});

  const onRegister = () => {
    history.push("/age-selection");
    handleModalOpen();
  };

  if (eventClicked === false) {
    return (
      <div>
        <FullPage>
          <Title1>City Farm SLO</Title1>
          <CenterWrap>
            <Title2>Select an Event to Register</Title2>
            <CalendarWrapper>
              <Calendar events={events} setClicked={setClicked} />
            </CalendarWrapper>
          </CenterWrap>
          <PlantContainer>
            <img src={flower} alt="Flower" />
          </PlantContainer>
          <AdminLoginButton to="/admin/login">Login as Admin</AdminLoginButton>
        </FullPage>
      </div>
    );
  }
  return (
    <div>
      <FullPage2>
        <LeftContainer>
          <EventCard event={selected} />
          {selected.slots > selected.volunteers.length ? (
            <Register enabled onClick={onRegister}>
              Register
            </Register>
          ) : (
            <Register>Event Full</Register>
          )}
          <PlantContainer>
            <img src={flower} alt="Flower" />
          </PlantContainer>
        </LeftContainer>
        <DividerContainer>
          <Divider />
        </DividerContainer>
        <RightContainer
          onClick={() => {
            setClicked(false);
            dispatch(setSelected(undefined));
          }}
        >
          <Title1>City Farm SLO</Title1>
          <CenterWrap>
            <Header>
              <Title2>Select an Event to Register</Title2>
            </Header>
            <CalendarWrapper>
              <Calendar
                events={events}
                selectedEvent={selected}
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
              selectedEvent={selected}
              handleModalClose={handleModalClose}
              user={user}
              setUser={setUser}
              isAdult={isAdult}
              sendEmail={sendEmail}
            />
          </Route>
          <Route path="/waiver">
            <WaiverPage user={user} isAdult={isAdult} sendEmail={sendEmail} />
          </Route>
          <Route path="/registration-complete">
            <RegistrationComplete
              selectedEvent={selected}
              handleModalClose={handleModalClose}
            />
          </Route>
          <Route path="/age-selection">
            <AgeSelect
              selectedEvent={selected}
              handleModalClose={handleModalClose}
              handleisAdult={handleisAdult}
              handlenotAdult={handlenotAdult}
            />
          </Route>
        </Switch>
      </HomeModal>
    </div>
  );
}
