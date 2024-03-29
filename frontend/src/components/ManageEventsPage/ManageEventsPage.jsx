import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Calendar from "../UserSignUp/Calendar";
import returnImg from "./return.png";

import { selectAllEvents } from "../../redux/selectors/event";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

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
  margin-left: 1%;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 30px;
  position: relative;
`;

const Button = styled.button`
  width: 50vh;
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

const Toast = styled(Snackbar)`
  .MuiPaper-root {
    font-family: Urbanist;
    font-weight: bold;
    color: #003c45;
    background-color: #c9e8eb;
  }
`;

export default function ManageEventsPage() {
  const location = useLocation();
  const [open, setOpen] = useState(location.state?.open ?? false);

  const events = useSelector(selectAllEvents);
  const [eventClicked, setClicked] = useState(false);

  if (eventClicked === false) {
    return (
      <div>
        <Toast
          open={open}
          autoHideDuration={6000}
          message="Action Completed!"
          onClose={() => setOpen(false)}
        />
        <FullPage>
          <LeftContainer>
            <Title> Manage Events </Title>
            <CalendarWrapper>
              <Calendar events={events} setClicked={setClicked} />
            </CalendarWrapper>
          </LeftContainer>
          <RightContainer>
            <ReturnContainer>
              <Link to="/admin">
                <img src={returnImg} alt="return" />
              </Link>
            </ReturnContainer>
            <Link to="/admin/add-event">
              <Button> Add Event </Button>
            </Link>
            <Link to="/admin/edit-event" style={linkStyle}>
              <Button>Edit and remove events</Button>
            </Link>
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
              <Calendar events={events} setClicked={setClicked} />
            </CalendarWrapper>
          </LeftContainer>
          <RightContainer>
            <ReturnContainer>
              <Link to="/admin">
                <img src={returnImg} alt="return" />
              </Link>
            </ReturnContainer>
            <Link to="/admin/add-event" style={linkStyle}>
              <Button> Add Event </Button>
            </Link>
            <Link to="/admin/edit-event" style={linkStyle}>
              <Button>Edit and remove events</Button>
            </Link>
          </RightContainer>
        </FullPage>
      </div>
    </div>
  );
}
