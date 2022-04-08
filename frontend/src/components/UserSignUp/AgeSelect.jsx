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
`;

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
`;

const FirstSection = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  width: fit-content;
  flex-direction: column;
  justify-content: space-between;
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
  min-width: 18px;
  min-height: 100%;
  background: white;
  border-radius: 30px;
`;

const FormSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
  min-width: 500px;
  width: 90%;
`;

const StyledButton1 = styled(Button)`
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
  position: absolute;
  width: 443px;
  min-width: 40%;
  max-width: 55%;
  height: 140px;
  max-height: 20%;
  min-height: 20%;
  margin-top: clamp(15%, 300px, 25%);
  margin-left: 30%;
  transform: translate(-50%, -50%);
`;

const StyledButton2 = styled(Button)`
  display: block;
  background-color: #0ba360;
  border-radius: 5px;
  padding: 10px;
  border: 10px;
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
  position: absolute;
  width: 443px;
  min-width: 40%;
  max-width: 55%;
  height: 140px;
  max-height: 20%;
  min-height: 20%;
  margin-left: 30%;
  margin-top: clamp(40%, 350px, 45%);
  margin-bottom: 20%;
  transform: translate(-50%, -50%);
`;

function AgeSelect({ selectedEvent, handleModalClose }) {
  return (
    <PopupWrapper>
      {/* Left event card */}
      <FirstSection>
        <EventCard event={selectedEvent} />
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
        <StyledButton1 type="button">
          I am <b>under</b> 18
        </StyledButton1>
        <StyledButton2 type="button">
          I am <b>over</b> 18
          <br />
          (or signing up for others)
        </StyledButton2>
      </FormSection>
    </PopupWrapper>
  );
}

AgeSelect.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default AgeSelect;
