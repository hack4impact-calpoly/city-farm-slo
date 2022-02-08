import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Displays volunteer event information.

export default function EventCard({ event }) {
  const EventCardWrapper = styled.div`
    width: 35%;
    height: 30%;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: #c1d741;
    border-radius: 30px;
    padding: 2%;
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
    font-size: 36px;
  `;

  const Slots = styled.h1`
    padding: 0%;
    margin: 0%;
    border: 0%;
    padding-left: 30%;
    font-size: 25px;
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

  return (
    <EventCardWrapper>
      <Header>
        <Name>{event.title}</Name>
        <Slots>{`${event.volunteers.length} slots / ${event.slots}`}</Slots>
      </Header>
      <Subheader>{event.start.toLocaleDateString("en-US")}</Subheader>
      <Subheader>{event.start.toLocaleTimeString("en-US")}</Subheader>
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
