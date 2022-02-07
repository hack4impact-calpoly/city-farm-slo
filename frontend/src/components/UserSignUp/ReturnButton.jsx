import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function ReturnButton({ link }) {
  const BackArrow = styled.div`
    background-image: url("WhitePrevButton.png");
    width: 40%;
    height: 70%;
    top: 0%;
    right: 0%;
    background-repeat: no-repeat;
    background-position: center;
  `;

  const ReturnButton = styled.a`
    background-color: blue;
    border: none;
    display: flex;
    align-items: center;
    height: 50px;
    width: 100px;
    background-size: 100% 50%
    flex-direction: row;
    text-decoration: none;
  `;

  const ReturnText = styled.p`
    background-color: blue;
    color: white;
    font-size: 18px;
  `;

  return (
    <ReturnButton href={link}>
      <BackArrow />
      <ReturnText>Return</ReturnText>
    </ReturnButton>
  );
}

ReturnButton.propTypes = {
  link: PropTypes.string.isRequired,
};
