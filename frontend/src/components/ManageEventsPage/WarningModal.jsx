/* eslint-disable react/jsx-no-bind */
// import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import errorImg from "./Error.png";
import returnImg from "./return2.png";
// import { Link } from "react-router-dom";

// Displays volunteer event information.

const TopWrapper = styled.div`
  min-width: 800px;
  min-height: 200px;
  width: 70%;
  height: 50%;
  background: #ff4444;
  border-radius: 10px 10px 0px 0px;
  padding: 3%;
  margin-left: auto;
  margin-right: auto;
`;

const BottomWrapper = styled.div`
  min-width: 800px;
  min-height: 200px;
  width: 70%;
  height: 50%;
  background: white;
  border-radius: 0px 0px 10px 10px;
  padding: 3%;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorIcon = styled.img`
  width: 15%;
`;

const ReturnIcon = styled.img`
  width: 8%;
`;

const MessageTitle = styled.h1`
  text-align: center;
  color: #555555;
  font-style: normal;
  font-weight: 700;
  color: #313131;
`;

const MessageText = styled.h2`
  text-align: center;
  font-weight: 500;
  color: #555555;
`;

const ContinueButton = styled.button`
  background: #ff4444;
  color: white;
  width: 20%;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  font-family: Urbanist;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 10px;
`;

const ContinueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const LinkWrapper = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   @media (max-width: 1150px) {
//     position: relative;
//     min-height: fit-content;
//     margin-top: 60px;
//   }
// `;

// const ReturnLink = styled(Link)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   text-decoration: none;
//   font-size: 24px;
//   line-height: 58px;
//   color: white;
// `;

export default function WarningModal() {
  return (
    <div>
      <TopWrapper>
        <ReturnIcon src={returnImg} alt="return icon" />
        <ErrorIconWrapper>
          <ErrorIcon src={errorImg} alt="Error icon" />
        </ErrorIconWrapper>
      </TopWrapper>
      <BottomWrapper>
        <MessageTitle>Warning!</MessageTitle>
        <MessageText>Too Many Registered</MessageText>
        {/* <LinkWrapper>
          <ReturnLink to="/" onClick={handleModalClose}>
            Return
          </ReturnLink>
        </LinkWrapper>
      </WarningModaldWrapper> */}
        <ContinueWrapper>
          <ContinueButton>Continue</ContinueButton>
        </ContinueWrapper>
      </BottomWrapper>
    </div>
  );
}

// EventCard.propTypes = {
//   event: PropTypes.shape({
//     title: PropTypes.string,
//     location: PropTypes.string,
//     start: PropTypes.instanceOf(Date),
//     end: PropTypes.instanceOf(Date),
//     slots: PropTypes.number,
//     notes: PropTypes.string,
//     volunteers: PropTypes.arrayOf(PropTypes.string),
//   }).isRequired,
// };
