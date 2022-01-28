import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Calendar from "./UserSignUp/Calendar";
import HomeModal from "./HomeModal";

export default function Home() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Header = styled.h1`
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 58px;
  `;

  // temporary events list
  const events = [
    {
      name: "Event 1",
      location: "SLO",
      startTime: new Date("1/25/2022 9:00:00"),
      endTime: new Date("1/25/2022 12:00:00"),
      slots: 5,
      notes: "Notes",
      volunteers: null,
    },
    {
      name: "Event 2",
      location: "SLO",
      startTime: new Date("1/25/2022 12:00:00"),
      endTime: new Date("1/25/2022 15:00:00"),
      slots: 0,
      notes: "Notes",
      volunteers: null,
    },
    {
      name: "Event 3",
      location: "SLO",
      startTime: new Date("1/26/2022 12:00:00"),
      endTime: new Date("1/26/2022 15:00:00"),
      slots: 10,
      notes: "Notes",
      volunteers: null,
    },
    {
      name: "Event 4",
      location: "SLO",
      startTime: new Date("1/27/2022 9:00:00"),
      endTime: new Date("1/27/2022 12:00:00"),
      slots: 0,
      notes: "Notes",
      volunteers: null,
    },
  ];

  // modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const handleCalendarOpen = () => setCalendarOpen(true);
  const handleCalendarClose = () => setCalendarOpen(false);

  return (
    <div>
      <p>Welcome to City Farm SLO!</p>
      <Container>
        <Header>Select an event to register</Header>
        <Button onClick={handleOpen}>Open sample modal</Button>
        <HomeModal open={open} handleClose={handleClose}>
          <h1>Hello</h1>
        </HomeModal>
        <Button onClick={handleCalendarOpen}>Open calendar</Button>
        <HomeModal open={calendarOpen} handleClose={handleCalendarClose}>
          <Calendar events={events} />
        </HomeModal>
      </Container>
    </div>
  );
}
