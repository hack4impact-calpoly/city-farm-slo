import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// Requirements
// Please use styled-components, and don't worry about the background around the modal,
// the content in the event card, or the functionality of the register for another event button.

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #003c45;
  border-radius: 80px;
  padding: 30px;
  min-width: 800px;
  min-height: 400px;
`;

const PopupTitle = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  color: #ffffff;
  margin: 30px 0px 20px 0px;
`;

const EventCardPlaceholder = styled.div`
  background: #c1d741;
  border-radius: 20px;
  min-width: 250px;
  min-height: 100px;
`;

const Message = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 43px;
  color: #ffffff;
  margin: 20px 0px 20px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledA = styled.a`
  text-decoration: none;
  margin: 0px 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0px 10px;
`;

const StyledButton = styled(Button)`
  background-color: #0ba360;
  border-radius: 20px;
  padding: 4px 30px;
  font-family: "Urbanist", sans-serif;
  font-size: 24px;
  font-weight: 800;
  text-transform: capitalize;
  box-shadow: none;
  &:disabled {
    background-color: #b8b4b4;
  }
  &:hover {
    background-color: #0a8a52;
    box-shadow: none;
  }
  &:focus {
    background-color: #0cb069;
    box-shadow: none;
  }
`;

export default function RegistrationComplete({
  selectedEvent,
  handleModalClose,
}) {
  console.log(selectedEvent);

  return (
    <PopupWrapper>
      <PopupTitle>Successfully Registered</PopupTitle>
      <EventCardPlaceholder />
      <Message>
        You will receive an email confirmation with the event&apos;s details.
      </Message>
      <ButtonWrapper>
        <StyledA href="https://www.cityfarmslo.org/" onClick={handleModalClose}>
          <StyledButton type="button" variant="contained" color="primary">
            Return to City Farm SLO
          </StyledButton>
        </StyledA>
        <StyledLink to="/" onClick={handleModalClose}>
          <StyledButton type="button" variant="contained" color="primary">
            Register for another event
          </StyledButton>
        </StyledLink>
      </ButtonWrapper>
    </PopupWrapper>
  );
}

RegistrationComplete.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
