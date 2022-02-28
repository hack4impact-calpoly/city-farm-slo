import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EventCard from "../UserSignUp/EventCard";

// Requirements
// Please use styled-components, and don't worry about the background around the modal,
// the content in the event card, or the functionality of the register for another event button.

const Container = styled.div`
  display: flex;
  color: #ffffff;
  justify-content: center;
  background: #003c45;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: #c1d741;
  border: #0ba360;
  border-radius: 30px;
  color: white;
  font-size: 25px;
  width: 930px;
  height: 81px;
  margin-bottom: 10px;
  padding: 8px 0px;
  font: Urbanist;
`;

const EventCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const FullPage = styled.div`
  width: 100%;
  height: 100%;
`;

export default function RegistrationComplete({ selectedEvent }) {
  return (
    <FullPage>
      <Container>
        <h1>Registered For</h1>
      </Container>
      <EventCardWrapper>
        <EventCard event={selectedEvent} />
      </EventCardWrapper>
      <Container>
        <p>A confirmation email / text will be sent soon</p>
      </Container>

      <Container>
        <ButtonContainer>
          <Button>Register for another event</Button>
          <Link to="/">
            <Button>Return to City Farm SLO</Button>
          </Link>
        </ButtonContainer>
      </Container>
    </FullPage>
  );
}

RegistrationComplete.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
};
