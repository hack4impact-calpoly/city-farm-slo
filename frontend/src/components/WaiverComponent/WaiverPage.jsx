import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Radio } from "@mui/material";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
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
  background: #003c45;
  border-radius: 80px;
  max-width: 100%;
  max-height: 100%;
`;

const LinkWrapper = styled.div`
  position: absolute;
  left: 40px;
  top: 40px;
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

const WaiverFormWrapper = styled.div`
  row-gap: 0px;
  margin-top: -3%;
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const WaiverFormLeftWrapper = styled.div`
  margin-top: -17%;
  width: fit-content;
  height: 100%;
`;

const WaiverFormRightWrapper = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  margin-left: -10%;
  margin-top: -2%;
`;

const AgreementSection = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

const AgreementText = styled.p`
  color: white;
  size: 200%;
  margin-right: 10%;
  font-size: 15px;
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

export default function WaiverPage({ user, isAdult, handleModalClose }) {
  const [parent, setParent] = useState("");

  const signWaiver = () => {
    const parentName = isAdult ? "" : `?parentName=${parent}`;
    fetch(`/volunteer/${user._id}/signWaiver${parentName}`, {
      method: "PUT",
    });
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
            <LinkWrapper>
              <ReturnLink to="/" onClick={handleModalClose}>
                <BackArrow />
                Return
              </ReturnLink>
            </LinkWrapper>
          </WaiverFormLeftWrapper>
          <WaiverFormRightWrapper>
            <AgreementSection>
              <AgreementText>
                Click here to indicate that you have read and <br /> agree to
                the terms of the City Farm SLO <br /> Volunteer Agreement
              </AgreementText>
              {/* Checkbox for City Farm SLO Volunteer Agreement */}
              <Radio
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    "@media (hover: none)": {
                      backgroundColor: "transparent",
                    },
                  },
                  paddingRight: "485px",
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                    transitionDuration: "0s !important",
                  },
                }}
                checked={checked === true}
                onClick={handleChange1}
                name="radio-buttons"
              />
              <AgreementText>Print your name</AgreementText>
              {/* Added text field here */}
              <TextField
                id="filled-basic"
                variant="filled"
                className={classes.root}
              />
            </AgreementSection>
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
                <TextField
                  id="filled-basic"
                  variant="filled"
                  className={classes.root}
                  value={parent}
                  onChange={(e) => {
                    setParent(e.target.value);
                  }}
                />
              </>
            )}
            <RegistrationLink to="/registration-complete">
              <RegisterButton onClick={signWaiver}>Register</RegisterButton>
            </RegistrationLink>
            <WaiverExplanation>
              Waiver signage is required for first time volunteers. <br /> This
              will not have to be done nextime.{" "}
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
  handleModalClose: PropTypes.func.isRequired,
};
