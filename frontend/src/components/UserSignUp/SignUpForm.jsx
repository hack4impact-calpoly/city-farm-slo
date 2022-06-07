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
import { useDispatch } from "react-redux";
import isEmailValidator from "validator/lib/isEmail";
import EventCard from "./EventCard";
import { registerReducer } from "../../redux/slices/event";

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
const ParentWrapper = styled.div`
  border-radius: 80px;
  padding: 30px;
  background: #003c45;
  min-width: fit-content;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #003c45;
  justify-content: center;
  padding: 30px;
  box-sizing: border-box;
  height: 100%;
  min-height: 550px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 1300px) {
    flex-direction: column;
    justify-items: center;
    align-items: center;
    min-width: fit-content;
    max-height: 400px;
    height: fit-content;

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

const FirstSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 330px;
  justify-content: space-between;
  @media (max-width: 1300px) {
    margin-top: unset;
    min-height: fit-content;
    display: flex;
    flex-direction: column-reverse;
    padding-top: unset;
    margin-top: unset;
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
    margin-top: 300px;
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
  @media (max-width: 1300px) {\
    margin-bottom: unset;
    padding-bottom: unset;
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
  const phoneRegex = /^$|^\d{10}$/;
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required field"),
    lastName: Yup.string().required("Required field"),
    email: Yup.string()
      .email("Invalid format")
      .required("Required field")
      .matches(emailRegex, "Invalid format")
      .test(
        "is-valid",
        (message) => `${message.path} is invalid`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new Yup.ValidationError("Invalid format")
      ),
    phone: Yup.string().matches(phoneRegex, "Use 10 digits only"),
  });
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  // routing
  const history = useHistory();

  // redux
  const dispatch = useDispatch();

  // log values when data is submitted
  const onSubmit = (values) => {
    const cleanValues = values;
    if (!values.phone) delete cleanValues.phone; // remove phone if it is empty string
    cleanValues.isAdult = isAdult;
    fetch(`${process.env.REACT_APP_SERVER_URL}/volunteer/register`, {
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

    dispatch(registerReducer());
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
    <ParentWrapper>
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
          <PopupTitle>Sign Up</PopupTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RowWrapper>
              {rEntries.map((row) => (
                <Row>
                  {row.map((entry) => (
                    <FieldWrapper key={entry.name}>
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
    </ParentWrapper>
  );
}

SignUpForm.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  handleModalClose: PropTypes.func.isRequired,
  isAdult: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
};
