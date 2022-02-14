import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const dayjs = require("dayjs");

// Displays volunteer event information.

const EventCardWrapper = styled.div`
  // width: 350px;
  // background: #c1d741;
  // border-radius: 30px;
  padding: 5%;
  height: 50%;
  background: #c1d741;
  border-radius: 20px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 0%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 90%;
`;

const Header = styled.h1`
  display: flex;
  flex-direction: row;
  position: static;
  left: 0%;
  top: 0%;
  font-family: Urbanist, default;
  font-style: normal;
  font-weight: bold;
  font-size: 100%;
  line-height: 43px;
  color: #003c45;
  padding: 0%;
  margin: 0%;
  border: 0%;
`;

const Name = styled.h1`
  padding: 0%;
  margin: 0%;
  border: 0%;
  font-size: 150%;
`;

const Slots = styled.h2`
  padding: 0%;
  margin: 0%;
  border: 0%;
  padding-left: 30%;
  font-size: 100%;
`;

const Subheader = styled.h2`
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
`;

export default function EventCard({ event }) {
  return (
    <EventCardWrapper>
      <Header>
        <Name>{event.title}</Name>
        <Slots>{`${event.volunteers.length} slots / ${event.slots}`}</Slots>
      </Header>
      <Subheader>{dayjs(event.start).format("MMM D, YYYY")}</Subheader>
      <Subheader>
        {dayjs(event.start).format("h:mm A")}-
        {dayjs(event.end).format("h:mm A")}
      </Subheader>
      <Subheader>{event.location}</Subheader>
    </EventCardWrapper>
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
