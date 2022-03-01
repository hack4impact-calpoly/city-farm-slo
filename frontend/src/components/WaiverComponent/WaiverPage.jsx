import { Link } from "react-router-dom";
import styled from "styled-components";

const Title1 = styled.h1`
  color: white;
  text-align: center
  font-weight: 900;
  font-size: 200%;
  padding-bottom: 30px;
`;

const CenterWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const BackGround = styled.div`
  position: center;
  background: #003c45;
  border-radius: 80px;
  padding: 20px;
  border: center;
`;

const WaiverComp = styled.div`
  width: 60%;
  height: 70%;
  background: #c4c4c4;
  margin-left: 10%;
`;

const WaiverFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const WaiverFormLeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: row;
  flex-direction: column;
`;

const WaiverFormRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AgreementSection = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
`;

const AgreementText = styled.p`
  color: white;
  size: 200%;
  margin-right: 10%;
  font-size: 20px;
`;

const CheckBox = styled.div`
  background: #c4c4c4;
  width: 50px;
  height: 30px;
  margin-top: 1%;
  margin-right: 10%;
`;

const RegistrationLink = styled(Link)`
  text-decoration: none;
`;

const RegisterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  max-height: 173px;
  color: #ffffff;
  background: #c4c4c4;
  border-radius: 30px;
  font-size: 42px;
  font-weight: bold;
  padding: 10px;
  margin-top: 6%;
`;

const WaiverExplanation = styled.p`
  color: white;
  margin-right: 10%;
`;

export default function WaiverPage() {
  return (
    <div>
      <BackGround>
        <CenterWrap>
          <Title1>Sign Waiver</Title1>
        </CenterWrap>
        <WaiverFormWrapper>
          <WaiverFormLeftWrapper>
            {/* waiver component goes here */}
            <WaiverComp />
          </WaiverFormLeftWrapper>
          <WaiverFormRightWrapper>
            <AgreementSection>
              <AgreementText>
                Check here to indicate that you have read and agree to the terms
                of the City Farm SLO Volunteer Agreement
              </AgreementText>
              <CheckBox />
            </AgreementSection>
            <RegistrationLink to="/registration-complete">
              <RegisterButton>Register</RegisterButton>
            </RegistrationLink>
            <WaiverExplanation>
              Waiver signage is required for first time volunteers. This will
              not have to be done nextime.{" "}
            </WaiverExplanation>
          </WaiverFormRightWrapper>
        </WaiverFormWrapper>
      </BackGround>
    </div>
  );
}
