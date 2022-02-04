import { React, useState, useEffect } from "react";
import styled from "styled-components";
import plant from "./unsplash_hX_hf2lPpUU.png";
import backArrow from "./previous button.png";
import Calendar from "../UserSignUp/Calendar";

export default function Home() {
  // styled components
  const FullPage = styled.div`
    background: #c9e8eb;
    display: flex;
    flex-direction: row;
    height: 100vh;
  `;

  const LeftContainer = styled.div`
    width: 50%;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
  `;

  const MottoContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Motto = styled.div`
    font-size: 65px;
    color: #003c45;
    width: 80%;
  `;

  const PlantContainer = styled.div`
    display: block;
    text-align: center;
    height: 100%;
    overflow: hidden;
  `;

  const RightContainer = styled.div`
    background-color: #c1d741;
    border-radius: 50px 0px 0px 50px;
    width: 100%;
    padding: 45px 30px;
  `;

  const BackArrow = styled.div`
    width: 5%;
    height: 10%;
  `;

  const Return = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    padding-bottom: 15px;
  `;

  const Text = styled.div`
    font-size: 18px;
    padding-top: 15px;
  `;

  const RegisterText = styled.div`
    font-size: 65px;
  `;

  const CalendarWrapper = styled.div`
    background-color: #003c45;
    height: 60vh;
  `;

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  // events state
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetch("/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <FullPage>
        <LeftContainer>
          <MottoContainer>
            <Motto>Become a Friend of the Farm</Motto>
          </MottoContainer>
          <PlantContainer>
            <img src={plant} alt="Plant" />
          </PlantContainer>
        </LeftContainer>
        <RightContainer>
          <a href="https://www.cityfarmslo.org/volunteer" style={linkStyle}>
            <Return>
              <BackArrow>
                <img src={backArrow} alt="Back Arrow" />
              </BackArrow>
              Return to City Farm SLO
            </Return>
          </a>
          <RegisterText>Register to Volunteer</RegisterText>
          <Text>Select a date to register</Text>
          <CalendarWrapper>
            <Calendar events={events} />
          </CalendarWrapper>
        </RightContainer>
      </FullPage>
    </div>
  );
}
