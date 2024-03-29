import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useDispatch } from "react-redux";
import { setSelected } from "../../redux/slices/event";

// Requirements
// - Edit the Home component to look like this Figma Mockup: https://www.figma.com/file/AU4DBu8GtFmivr0q971PpY/cityfarmslo-high-fidel?node-id=4%3A18
// - Please use styled-components. If you have time, find a calendar component to use on this page (I'd reccomend looking at FullCalendar, react-calendar, or react-datepicker).

const CalendarWrapper = styled.div`
  padding: 36px;
  width: 900px;
  border: 1px solid #090a0c;
  box-sizing: border-box;
  box-shadow: 0px 4px 32px rgba(170, 170, 170, 0.03);
  border-radius: 12px;
  height: 100%;
`;

export default function Calendar({ events, setClicked }) {
  const dispatch = useDispatch();
  const handleEventClick = (clickInfo) => {
    dispatch(
      setSelected(
        events.find((e) => e._id === clickInfo.event.extendedProps._id)
      )
    );
    setClicked(true);
  };

  return (
    <CalendarWrapper>
      <FullCalendar
        height="100%"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          ...event,
          backgroundColor:
            event.volunteers.length < event.slots ? "green" : "red",
        }))}
        eventClick={handleEventClick}
      />
    </CalendarWrapper>
  );
}

Calendar.propTypes = {
  events: PropTypes.instanceOf(Array).isRequired,
  setClicked: PropTypes.func,
};

Calendar.defaultProps = {
  setClicked: () => {},
};
