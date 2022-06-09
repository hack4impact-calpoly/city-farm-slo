import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Radio } from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Waiver from "./Waiver";

// override MUI styles for TextField component
const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "#c4c4c4",
      borderRadius: "5px",
      borderStyle: "none",
      height: "30px",
      width: "90%",
      paddingBottom: "15px",
    },
  },
}));

const Title1 = styled.h1`
  color: white;
  text-align: center
  font-weight: 900;
  font-size: 200%;
  padding-bottom: 0px;
  margin-top: 50px;
  margin-bottom: 0px;
  @media (max-width: 1300px) {
    margin-bottom: 20px;
  }
`;

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const WaiverPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackGround = styled.div`
  // height: 92vh;
  background: #003c45;
  border-radius: 80px;
  padding: 20px;
  border: center;
  @media (max-width: 1300px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const WaiverFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 100%;
  @media (max-width: 1300px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
  }
`;

const WaiverFormLeftWrapper = styled.div`
  margin-top: -17%;
  width: fit-content;
  height: 80%;
  @media (max-width: 1300px) {
    background: grey;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 15px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #00282e;
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #00262b;
      -webkit-box-shadow: inset 0 0 6px rgb(43, 43, 43);
    }
  }
`;

const WaiverFormRightWrapper = styled.form`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  @media (max-width: 1300px) {
    margin: unset;
    padding: unset;
    overflow-y: scroll;
    transform: scale(0.85);
    margin-bottom: 40px;

    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 15px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #00282e;
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #00262b;
      -webkit-box-shadow: inset 0 0 6px rgb(43, 43, 43);
    }
  }
`;

const AgreementSection = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1300px) {
    margin-bottom: 250px;
  }
`;

const AgreementText = styled.p`
  color: white;
  size: 200%;
  margin-right: 10%;
  font-size: 15px;
`;

const RegisterButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 315px;
  max-height: 173px;
  background-color: #0ba360;
  border-radius: 30px;
  font-family: "Urbanist", sans-serif;
  font-size: 42px;
  font-weight: 800;
  text-transform: capitalize;
  padding: 10px;
  margin-top: 6%;
  box-shadow: none;
  &:disabled {
    color: #ffffff;
    background-color: #b8b4b4;
    cursor: default;
  }
  &:enabled:hover {
    background-color: #0a8a52;
    box-shadow: none;
  }
  &:focus {
    background-color: #0cb069;
    box-shadow: none;
  }
`;

const WaiverExplanation = styled.p`
  color: white;
  margin-right: 10%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function WaiverPage({ user, isAdult, sendEmail }) {
  const history = useHistory();

  const validationSchemaAdult = Yup.object().shape({
    checkbox: Yup.boolean().required("Required field"),
    name: Yup.string().required("Required field"),
  });

  const validationSchemaChild = Yup.object().shape({
    checkbox: Yup.boolean().required("Required field"),
    name: Yup.string().required("Required field"),
    parent: Yup.string().required("Required field"),
  });

  const { handleSubmit, control, reset, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      isAdult ? validationSchemaAdult : validationSchemaChild
    ),
  });

  const [parent, setParent] = useState("");

  const signWaiver = () => {
    const parentName = isAdult ? "" : `?parentName=${parent}`;
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/volunteer/${user._id}/signWaiver${parentName}`,
      {
        method: "PUT",
      }
    );
    history.push("/registration-complete");
    sendEmail(user);
    reset();
  };

  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  const handleChange1 = () => {
    setChecked(!checked);
  };

  // --- Unimplemented sign up for otehrs code ---

  // const [checked2, setChecked2] = useState(false);
  // const handleChange2 = () => {
  //   setChecked2(!checked2);
  // };

  // --- End unimplemented code ---

  return (
    <WaiverPageWrapper>
      <BackGround>
        <CenterWrap>
          <Title1>Sign Waiver</Title1>
        </CenterWrap>
        <WaiverFormWrapper>
          <WaiverFormLeftWrapper>
            {/* waiver component goes here */}
            <Waiver />
          </WaiverFormLeftWrapper>
          <WaiverFormRightWrapper onSubmit={handleSubmit(signWaiver)}>
            <AgreementSection>
              <Row>
                <AgreementText>
                  Click here to indicate that you have read and agree to the
                  terms of the City Farm SLO Volunteer Agreement
                </AgreementText>
                {/* Checkbox for City Farm SLO Volunteer Agreement */}
                <Controller
                  key="checkbox"
                  name="checkbox"
                  defaultValue="false"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Radio
                      required
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                          "@media (hover: none)": {
                            backgroundColor: "transparent",
                          },
                        },
                        paddingRight: "35px",
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                          transitionDuration: "0s !important",
                        },
                      }}
                      checked={checked === true}
                      onClick={handleChange1}
                      name="radio-buttons"
                      value={value}
                      onChange={onChange}
                      helperText={error ? error.message : null}
                      error={!!error}
                    />
                  )}
                />
              </Row>
              <AgreementText>Print your name</AgreementText>
              {/* Added text field here */}
              <Controller
                key="name"
                name="name"
                defaultValue=""
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    id="filled-basic"
                    variant="filled"
                    className={classes.root}
                    value={value}
                    onChange={onChange}
                    helperText={error ? error.message : null}
                    error={!!error}
                  />
                )}
              />
              {/* Conditional rendering for whether Volunteer isAdult or not */}
              {
                // <>
                //   <AgreementText>
                //     Click here to indicate that you are signing this waiver for
                //     individuals that you have registered for
                //   </AgreementText>
                //   {/* Checkbox for City Farm SLO Volunteer Agreement */}
                //   <Radio
                //     sx={{
                //       "&:hover": {
                //         backgroundColor: "transparent",
                //       },
                //       paddingRight: "485px",
                //       color: "white",
                //       "&.Mui-checked": {
                //         color: "white",
                //       },
                //     }}
                //     checked={checked2 === true}
                //     onClick={handleChange2}
                //     name="radio-buttons"
                //   />
                // </>
              }
              {!isAdult && (
                <>
                  <AgreementText>Print parental name</AgreementText>
                  <Controller
                    key="parent"
                    name="parent"
                    defaultValue=""
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => (
                      <TextField
                        required
                        id="filled-basic"
                        variant="filled"
                        className={classes.root}
                        value={parent}
                        onChange={(e) => {
                          setParent(e.target.value);
                          onChange(e);
                        }}
                        error={!!error}
                      />
                    )}
                  />
                </>
              )}
            </AgreementSection>
            <RegisterButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formState.isValid || !checked}
            >
              Register
            </RegisterButton>
            <WaiverExplanation>
              Waiver signage is required for first time volunteers. <br /> This
              will not have to be done next time.{" "}
            </WaiverExplanation>
          </WaiverFormRightWrapper>
        </WaiverFormWrapper>
      </BackGround>
    </WaiverPageWrapper>
  );
}

WaiverPage.propTypes = {
  user: PropTypes.instanceOf({}).isRequired,
  isAdult: PropTypes.bool.isRequired,
  sendEmail: PropTypes.func.isRequired,
};
