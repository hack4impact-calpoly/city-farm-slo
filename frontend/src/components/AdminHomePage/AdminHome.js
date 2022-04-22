import { React, useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import flower from "./tulip.png";
import Calendar from "../UserSignUp/Calendar";
import AdminHomeModal from "./AdminHomeModal";
import ManageEventsPage from "../ManageEventsPage/ManageEventsPage";

// styled components
const Title1 = styled.div`
  color: #003c45;
  font-weight: 900;
  font-size: 42px;
  padding-bottom: 30px;
  margin-left: 40%;
`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const Flower = styled.img`
  width: 70%;
  height: 70%;
`;

const Header = styled.div`
  width: 900px;
  display: flex;
  justify-content: flex-start;
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
  width: 850px;
  border-radius: 12px;
`;

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const PlantContainer = styled.div`
  left: -20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: -10;
`;

const LeftContainer = styled.div`
  background: #003c45;
  width: 777px;
  // width: 50%;
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

const MenuHeader1 = styled.h1`
  position: absolute;
  width: 716px;
  height: 177px;
  top: -29px;

  border: 10%;

  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 86px;
  text-align: center;

  color: #ffffff;
`;

const MenuHeader2 = styled.h1`
  position: absolute;
  width: 716px;
  top: 29px;

  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 86px;
  text-align: center;

  color: #ffffff;
`;

const MenuButton1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  max-height: 173px;
  color: #ffffff;

  background: #0ba360;
  border-radius: 5px;
  font-size: 36px;
  font-weight: 400;
  line-height: 43.2px;
  padding: 10px;
  margin-top: 20%;
`;

const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  max-height: 173px;
  color: #ffffff;

  background: #0ba360;
  border-radius: 5px;
  font-size: 36px;
  font-weight: 400;
  line-height: 43.2px;
  padding: 10px;
  margin-top: 2%;
`;

// const linkStyle = {
//   textDecoration: "none",
//   color: "inherit",
// };

export default function AdminHome({ selectedEvent, setEvent }) {
  // routing
  const history = useHistory();

  // modal state
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
    history.push("/admin");
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

  return (
    <div>
      <FullPage2>
        <LeftContainer>
          <MenuHeader1>City Farm SLO</MenuHeader1>
          <MenuHeader2>Admin Page</MenuHeader2>
          <Link
            to="/admin/manage-events"
            style={linkStyle}
            onClick={handleModalOpen}
          >
            <MenuButton1>Manage Events</MenuButton1>
          </Link>
          <MenuButton>Send Emails</MenuButton>
          <MenuButton>Volunteer Database</MenuButton>
          <PlantContainer>
            <Flower src={flower} alt="Flower" />
          </PlantContainer>
        </LeftContainer>
        <RightContainer>
          <CenterWrap>
            <Header>
              <Title1>Calendar</Title1>
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
      <AdminHomeModal open={open} handleClose={handleModalClose}>
        <Switch>
          <Route path="/admin/manage-events">
            <ManageEventsPage
              selectedEvent={selectedEvent}
              setEvent={setEvent}
            />
          </Route>
        </Switch>
      </AdminHomeModal>
    </div>
  );
}

AdminHome.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  setEvent: PropTypes.func.isRequired,
};
