import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
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
  z-index: 1;
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
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Required field"),
  });
  const { handleSubmit, control, reset, formState, setError } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    const { password } = values;
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          history.push("/admin");
        } else {
          setError("password", {
            message: "Wrong password. Contact administrator for help.",
          });
        }
      });
    reset();
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginContainer>
              <Controller
                key="password"
                name="password"
                defaultValue=""
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LoginField
                    type="password"
                    required
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    label="Password"
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    helperText={error ? error.message : null}
                    error={!!error}
                  />
                )}
              />
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formState.isValid}
              >
                Login
              </StyledButton>
            </LoginContainer>
          </form>
        </RightContainer>
        <Flower src={flower} alt="flower" />
      </FullPage>
    </div>
  );
}
