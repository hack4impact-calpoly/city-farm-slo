import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  z-index: 10;
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

export default function RegistrationComplete() {
  return (
    <div>
      <Container>
        <h1>Registered For</h1>
      </Container>
      <div>{/* EventCard placeholder here */}</div>
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
    </div>
  );
}
