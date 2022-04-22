/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const dayjs = require("dayjs");

// Displays volunteer event information.

const EventCardWrapper = styled.div`
  width: 350px;
  background: #c1d741;
  border-radius: 30px;
  padding: 3%;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: static;
  left: 0%;
  top: 0%;
  font-family: Urbanist, default;
  font-style: normal;
  font-size: 100%;
  line-height: 28px;
  color: #003c45;
  margin: 0%;
  border: 0%;
  padding: 5px 0 5px;
`;

const Name = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 28px;
  padding-right: 10px;
  flex: 4;
`;

const Slots = styled.h2`
  padding: 0%;
  margin: 0%;
  font-size: 25px;
  font-weight: normal;
  flex: 1;
`;

const Subheader = styled.div`
  position: static;
  left: 0%;
  right: -110.06%;
  top: 0%;
  bottom: 71.4%;
  font-family: Urbanist, default;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  color: #003c45;
  padding-bottom: 5px;
`;

const Button = styled.button`
  text-align: right;
  width: 40%;
  margin-left: 60%;
  cursor: pointer;
  font-family: Urbanist;
  font-size: 20px;
  font-weight: bold;
  background: none !important;
  border: none;
  color: #003c45;
  margin-bottom: 14px;
`;

export default function EventCard({ event }) {
  const [eventMessage, setEventMessage] = useState("See notes");
  function handler() {
    if (eventMessage === "See event info") {
      setEventMessage("See notes");
    } else {
      setEventMessage("See event info");
    }
  }

  return (
    <div>
      <EventCardWrapper>
        <Header>
          <Name>{event.title}</Name>
          <Slots>
            {`${event.volunteers.length} / ${event.slots}`}
            <br /> slots
          </Slots>
        </Header>
        {eventMessage !== "See event info" ? (
          <div className="event-body">
            <Subheader>{dayjs(event.start).format("MMM D, YYYY")}</Subheader>
            <Subheader>
              {dayjs(event.start).format("h:mm A")}-
              {dayjs(event.end).format("h:mm A")}
            </Subheader>
            <Subheader>{event.location}</Subheader>
          </div>
        ) : (
          <Subheader>{event.notes}</Subheader>
        )}
        {event.notes.length > 0 && (
          <Button type="button" onClick={handler}>
            {eventMessage}
          </Button>
        )}
      </EventCardWrapper>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    slots: PropTypes.number,
    notes: PropTypes.string,
    volunteers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
