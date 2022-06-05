import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllEvents, selectEvent } from "../../redux/selectors/event";
import { setSelected } from "../../redux/slices/event";
import Calendar from "../UserSignUp/Calendar";
import EventCard from "../UserSignUp/EventCard";

const FullPage = styled.div`
  background: #003c45;
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
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
  height: 83vh;
  display: flex;
  flex-direction: column;
  background-color: #c9e8eb;
  margin: 50px;
  margin-left: 1%;
  border-radius: 20px;
  padding: 20px 30px 30px 30px;
  position: relative;
  z-index: 1;
`;

const Title = styled.div`
  color: white;
  font-weight: 900;
  font-size: 42px;
  padding-bottom: 30px;
`;

const CalendarWrapper = styled.div`
  height: 75vh;
  width: 900px;
  background-color: #ffffff;
  border-radius: 12px;
`;

const EventCardWrapper = styled.div`
  padding-bottom: 20px;
`;

const EmailText = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default function VolunteerDatabase() {
  const events = useSelector(selectAllEvents);
  const selected = useSelector(selectEvent);
  const [volunteers, setVolunteers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/volunteer/hours`)
      .then((res) => res.json())
      .then((data) => setVolunteers(data));
  }, []);

  const eventFilter = (volunteer) => {
    if (!selected) return true;
    return selected.volunteers.includes(volunteer._id);
  };

  return (
    <div>
      <FullPage>
        <LeftContainer>
          <Title> Volunteer Database </Title>
          <CalendarWrapper>
            <Calendar events={events} />
          </CalendarWrapper>
        </LeftContainer>
        <RightContainer>
          <EventCardWrapper>
            {selected && <EventCard event={selected} />}
          </EventCardWrapper>
          <TableContainer component={Paper}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Last</TableCell>
                  <TableCell>First</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteers.filter(eventFilter).map((vol) => (
                  <TableRow>
                    <TableCell>{vol.lastName}</TableCell>
                    <TableCell>{vol.firstName}</TableCell>
                    <TableCell>{vol.hours}</TableCell>
                    <TableCell>
                      <EmailText href={`mailto:${vol.email}`}>
                        {vol.email}
                      </EmailText>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="space-between" pt={2}>
            <Button
              variant="contained"
              onClick={() => dispatch(setSelected(undefined))}
            >
              View All Volunteers
            </Button>
            <Button variant="contained">Export</Button>
          </Stack>
        </RightContainer>
      </FullPage>
    </div>
  );
}
