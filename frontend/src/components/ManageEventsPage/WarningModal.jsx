/* eslint-disable react/jsx-no-bind */
// import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import errorImg from "./Error.png";
import returnImg from "./return2.png";

// Displays Suggestion, Warning, and Error Messages.

const TopWrapper = styled.div`
  min-width: 800px;
  min-height: 200px;
  width: 70%;
  height: 50%;
  background: rgba(0, 0, 0, 0);
  // background: #ff4444;
  border-radius: 10px 10px 0px 0px;
  padding: 3%;
  margin-left: auto;
  margin-right: auto;
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Warning = styled.div`
  top: 0px;
  z-index: -10;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  min-height: 200px;
  width: 70%;
  height: 50%;
  background: #ffd66d;
  border-radius: 10px 10px 0px 0px;
  padding: 3%;
`;

const Error = styled.div`
  top: 0px;
  z-index: -10;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  min-height: 200px;
  width: 70%;
  height: 50%;
  background: #ff4444;
  border-radius: 10px 10px 0px 0px;
  padding: 3%;
`;

const Suggestion = styled.div`
  top: 0px;
  z-index: -10;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  min-height: 200px;
  width: 70%;
  height: 50%;
  background: #0ba360;
  border-radius: 10px 10px 0px 0px;
  padding: 3%;
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
  top: 200px;
  width: 15%;
`;

const ReturnIcon = styled.img`
  width: 50%;
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

const LinkWrapper = styled.div`
  position: absolute;
  @media (max-width: 1150px) {
    position: relative;
    min-height: fit-content;
    margin-top: 60px;
  }
`;

const ReturnLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: white;
`;

export default function WarningModal({
  handleModalClose,
  header,
  text,
  type,
  continueAction,
}) {
  return (
    <div>
      <WarningWrapper>
        {(type === "Warning" && <Warning />) ||
          (type === "Error" && <Error />) ||
          (type === "Suggestion" && <Suggestion />)}
      </WarningWrapper>
      <TopWrapper>
        <LinkWrapper>
          <ReturnLink to="/admin/manage-events" onClick={handleModalClose}>
            <ReturnIcon src={returnImg} alt="return icon" />
          </ReturnLink>
        </LinkWrapper>
        <ErrorIconWrapper>
          <ErrorIcon src={errorImg} alt="Error icon" />
        </ErrorIconWrapper>
      </TopWrapper>
      <BottomWrapper>
        <MessageTitle>{header}</MessageTitle>
        <MessageText>{text}</MessageText>
        <ContinueWrapper>
          <ContinueButton onClick={continueAction}>Continue</ContinueButton>
        </ContinueWrapper>
      </BottomWrapper>
    </div>
  );
}

WarningModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  continueAction: PropTypes.func.isRequired,
};
