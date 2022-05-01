import { React } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import EventCard from "./EventCard";

// override MUI styles for TextField component
const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "white",
      borderRadius: "50px",
      borderStyle: "none",
    },
  },
}));

const PopupTitle = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
  color: #ffffff;
  margin: -10px 0px 20px 20px;
`;

// const GeneralText = styled.p`
//   display: inline-block;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 10px;
//   color: #ffffff;
// `;

// const Radioform = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #003c45;
  border-radius: 80px;
  padding: 30px;
  box-sizing: border-box;
  min-width: 800px;
  min-height: 400px;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media (max-width: 1300px) {
    flex-direction: column;
    justify-items: center;
    align-items: center;
    min-width: fit-content;
  }
`;

const FirstSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 330px;
  justify-content: space-between;
  @media (max-width: 1300px) {
    min-height: fit-content;
    display: flex;
    flex-direction: column-reverse;
  }
`;

const EventCardWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 35%;
  @media (max-width: 1300px) {
    position: relative;
    min-height: fit-content;
    margin-top: 20px;
    top: 0;
  }
`;

const LinkWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  @media (max-width: 1300px) {
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

const DividerLine = styled.div`
  margin: 0 5%;
  min-width: 18px;
  min-height: 100%;
  background: white;
  border-radius: 30px;

  @media (max-width: 1300px) {
    min-width: 100%;
    min-height: 18px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const FormSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: fit-content;
  justify-items: center;

  @media (max-width: 1300px) {
    margin-bottom: 50px;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// const NewPersonWrapper = styled.div`
//   margin: -15px;
// `;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FieldWrapper = styled.div`
  width: 50%;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
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
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1300px) {
    position: relative;
    margin-top: 50px;
  }
`;

export default function SignUpForm({
  selectedEvent,
  handleModalClose,
  isAdult,
  setUser,
  sendEmail,
}) {
  // style
  const variant = "filled";
  const classes = useStyles();

  // --- Unimplemented signing up for others code ---
  // const [checked, setChecked] = useState(false);

  // const handleChange1 = () => {
  //   setChecked(!checked);
  // };

  // const childEntries = [
  //   { name: "firstname", label: "First Name" },
  //   { name: "lastname", label: "Last Name" },
  // ];

  // --- End unimplimented code ---

  // validation
  const phoneRegExp = /^$|^\d{10}$/;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required field"),
    lastName: Yup.string().required("Required field"),
    email: Yup.string().required("Required field").email("Invalid format"),
    phone: Yup.string().matches(phoneRegExp, "Use 10 digits only"),
  });
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  // routing
  const history = useHistory();

  // log values when data is submitted
  const onSubmit = (values) => {
    const cleanValues = values;
    if (!values.phone) delete cleanValues.phone; // remove phone if it is empty string
    cleanValues.isAdult = isAdult;
    fetch("volunteer/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cleanValues,
        eventID: selectedEvent._id.toString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // set user when submitted
        setUser(data);
        if (data.signedWaiver) {
          history.push("/registration-complete");
          sendEmail(data);
        } else {
          history.push("/waiver");
        }
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));

    reset();
  };

  // info for required entries
  const r1Entries = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
  ];

  const r2Entries = [
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Phone Number", required: false },
  ];

  const rEntries = [r1Entries, r2Entries];

  return (
    <PopupWrapper>
      {/* Left event card */}
      <FirstSection>
        <EventCardWrapper>
          <EventCard event={selectedEvent} />
        </EventCardWrapper>
        <LinkWrapper>
          <ReturnLink to="/" onClick={handleModalClose}>
            <BackArrow />
            Return
          </ReturnLink>
        </LinkWrapper>
      </FirstSection>
      {/* Divider line */}
      <DividerLine />
      {/* Sign up form */}
      <FormSection>
        <PopupTitle>Sign Up alskdjf</PopupTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RowWrapper>
            {rEntries.map((row) => (
              <Row>
                {row.map((entry) => (
                  <FieldWrapper>
                    <Controller
                      className={classes.box}
                      key={entry.name}
                      name={entry.name}
                      defaultValue=""
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Box m={2}>
                          <TextField
                            required={entry.required}
                            fullWidth
                            InputProps={{
                              disableUnderline: true,
                            }}
                            label={entry.label}
                            variant={variant}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            className={classes.root}
                          />
                        </Box>
                      )}
                    />
                  </FieldWrapper>
                ))}
              </Row>
            ))}
          </RowWrapper>
          {/* {isAdult === false ? (
            <div />
          ) : (
            <Radioform>
              <GeneralText>I am registering for others under 18</GeneralText>
              <Radio
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    "@media (hover: none)": {
                      backgroundColor: "transparent",
                    },
                  },
                  paddingRight: "200px",
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
            </Radioform>
          )} */}

          {/* {checked === true ? (
            <NewPersonWrapper>
              <Row> */}
          {/* ------- Name, Email -------  */}
          {/* {childEntries.map((entry) => (
                  <FieldWrapper>
                    <Controller
                      className={classes.box}
                      key={entry.name}
                      name={entry.name}
                      defaultValue=""
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Box m={2}>
                          <TextField
                            required
                            fullWidth
                            InputProps={{
                              disableUnderline: true,
                            }}
                            label={entry.label}
                            variant={variant}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            className={classes.root}
                          />
                        </Box>
                      )}
                    />
                  </FieldWrapper>
                ))} */}
          {/* </Row>
            </NewPersonWrapper>
          ) : (
            <div />
          )} */}
          {/* ------- Submit Button -------  */}
          <Box m={2}>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              // disabled={!formState.isValid}
              onClick={onSubmit}
            >
              Register
            </StyledButton>
          </Box>
        </form>
      </FormSection>
    </PopupWrapper>
  );
}

SignUpForm.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  handleModalClose: PropTypes.func.isRequired,
  isAdult: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
};
