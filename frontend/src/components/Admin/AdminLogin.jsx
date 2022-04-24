import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import farm from "./farm-bg.png";
import logo from "./logo.svg";
import flower from "./flower-2-bg.png";

const FullPage = styled.div`
  background: #003c45;
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 50%;
`;

const FarmImage = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
`;

const StatementText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 60px 40px;
  margin: 0;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  color: #003c45;
  wrap-text: true;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 50%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 60px;
  color: #ffffff;
  margin: 0;
  padding: 48px 5px;
`;

const Logo = styled.img`
  width: 30%;
  min-width: 180px;
  max-width: 190px;
  padding: 48px 5px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  padding: 40px;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
`;

const LoginField = styled(TextField)`
  margin: 20px 0 0;
  width: 50%;
  min-width: 300px;
  .MuiFilledInput-root {
    background-color: white;
    border-radius: 50px;
    border-style: none;
  }
`;

const StyledButton = styled(Button)`
  margin: 40px 0;
  width: 50%;
  min-width: 300px;
  background-color: #0ba360;
  border-radius: 20px;
  padding: 20px;
  font-family: "Urbanist", sans-serif;
  font-size: 24px;
  font-weight: 800;
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
`;

const Flower = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 60%;
  z-index: 0;
`;

export default function AdminLogin() {
  return (
    <div>
      <FullPage>
        <LeftContainer>
          <FarmImage src={farm} alt="farm" />
          <StatementText>
            Empowering the next generation to live healthier, more prosperous
            lives through sustainable agriculture and farm based education.
          </StatementText>
        </LeftContainer>
        <RightContainer>
          <TitleContainer>
            <Title>Login As Admin</Title>
            <Logo src={logo} alt="logo" />
          </TitleContainer>
          <LoginContainer>
            <LoginField
              type="password"
              required
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
              label="Password"
              variant="filled"
            />
            <StyledButton type="submit" variant="contained" color="primary">
              Login
            </StyledButton>
          </LoginContainer>
        </RightContainer>
        <Flower src={flower} alt="flower" />
      </FullPage>
    </div>
  );
}
