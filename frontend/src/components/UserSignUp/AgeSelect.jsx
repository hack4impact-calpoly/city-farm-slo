import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import styled from "styled-components";
import EventCard from "./EventCard";

const PopupTitle = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 58px;
  color: #ffffff;
  margin: -10px 0px 20px 20px;
  @media (max-width: 1300px) {
    margin-bottom: unset;
  }
`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

// const PopupWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   background: #003c45;
//   border-radius: 80px;
//   padding: 30px;
//   box-sizing: border-box;
//   width: fit-content;
//   min-height: 400px;
//   height: 100%;
//   @media (max-width: 1300px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #003c45;
  border-radius: 80px;
  padding: 30px;
  box-sizing: border-box;
  min-width: 800px;
  min-height: 400px;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media (max-width: 1300px) {
    flex-direction: column;
    justify-items: center;
    align-items: center;
    min-width: fit-content;
  }
`;

const FirstSection = styled.div`
  display: flex;
  position: relative;
  padding: 20px;
  width: fit-content;
  flex-direction: column;
  justify-content: space-between;
  min-width: 330px;
  @media (max-width: 1300px) {
    flex-direction: column-reverse;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const ReturnLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  font-size: 24px;
  line-height: 58px;
  color: white;
  @media (max-width: 1300px) {
    position: relative;
    margin-top: -25px;
    margin-bottom: 40px;
  }
`;

const BackArrow = styled.i`
  border: solid white;
  border-width: 0px 2px 2px 0;
  display: inline-block;
  width: 24px;
  height: 24px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

const DividerLine = styled.div`
  margin: 0px 20px;
  width: 18px;
  height: 100%;
  background: white;
  border-radius: 30px;
  @media (max-width: 1300px) {
    width: 100%;
    height: 18px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 8px;
  width: fit-content;
  padding-right: unset;
  @media (max-width: 1300px) {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  background-color: #0ba360;
  border-radius: 5px;
  padding: 10px;
  font-family: "Urbanist", sans-serif;
  font-size: clamp(80%, 24px, 100%);
  font-weight: 400;
  color: white;
  z-index: 10;
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
  width: 443px;
  height: 140px;
  margin: 10px;
`;

const EventCardWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 35%;
  @media (max-width: 1300px) {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    top: unset;
    left: unset;
    width: 400px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  @media (max-width: 1300px) {
    padding: unset;
  }
`;

function AgeSelect({
  selectedEvent,
  handleModalClose,
  handleisAdult,
  handlenotAdult,
}) {
  return (
    <PopupWrapper>
      {/* Left event card */}
      <FirstSection>
        <EventCardWrapper>
          <EventCard event={selectedEvent} />
        </EventCardWrapper>
        <LinkWrapper>
          <ReturnLink to="/" onClick={handleModalClose}>
            <BackArrow />
            Return
          </ReturnLink>
        </LinkWrapper>
      </FirstSection>
      {/* Divider line */}
      <DividerLine />
      {/* Sign up form */}
      <FormSection>
        <PopupTitle>Sign Up</PopupTitle>
        <ButtonWrapper>
          <Link to="/registration" style={linkStyle} onClick={handlenotAdult}>
            <StyledButton type="button">
              I am <b>under</b> 18
            </StyledButton>
          </Link>
          <Link to="/registration" style={linkStyle} onClick={handleisAdult}>
            <StyledButton type="button">
              I am <b>over</b> 18
            </StyledButton>
          </Link>
        </ButtonWrapper>
      </FormSection>
    </PopupWrapper>
  );
}

AgeSelect.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleisAdult: PropTypes.func.isRequired,
  handlenotAdult: PropTypes.func.isRequired,
};

export default AgeSelect;
