import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

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
  font-weight: normal;
  font-size: 30px;
  line-height: 58px;
  color: #ffffff;
  margin: -10px 0px 20px 20px;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #003c45;
  border-radius: 80px;
  padding: 30px;
  min-width: 800px;
  min-height: 400px;
`;

const FirstSection = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  min-width: 250px;
  width: 50%;
`;

const LeftEventCard = styled.div`
  height: 40%;
  background: #c1d741;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  min-width: 250px;
  width: 80%;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
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
  margin: 0px 20px;
  min-width: 18px;
  min-height: 100%;
  background: white;
  border-radius: 30px;
`;

const FormSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
  min-width: 500px;
  width: 90%;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FieldWrapper = styled.div`
  width: 50%;
`;

const StyledButton = styled(Button)`
  background-color: #c1d741;
  border-radius: 20px;
  padding: 20px;
  font-size: 20px;
  font-weight: 400;
  text-transform: capitalize;
  &:hover {
    background-color: #0ba360;
  }
  &:focus {
    background-color: green;
  }
`;

function SignUpForm({ selectedEvent, handleModalClose }) {
  console.log(selectedEvent);

  // style
  const variant = "filled";
  const classes = useStyles();

  // validation
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    email: Yup.string().required("Required field").email("Invalid format"),
    number: Yup.string()
      .required("Required field")
      .min(10, "Too short")
      .max(10, "Too long")
      .matches(phoneRegExp, "Invalid format"),
  });
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // routing
  const history = useHistory();

  // log values when data is submitted
  const onSubmit = (values) => {
    console.log(values);
    reset();
    history.push("/registration-complete");
  };

  // info for required entries
  const rEntries = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
  ];

  return (
    <PopupWrapper>
      {/* Left event card */}
      <FirstSection>
        <LeftEventCard />
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
            <Row>
              {/* ------- Name, Email -------  */}
              {rEntries.map((entry) => (
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
                          InputProps={{ disableUnderline: true }}
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
            <Row>
              {/* ------- Phone Number -------  */}
              <FieldWrapper>
                <Controller
                  className={classes.box}
                  key="number"
                  name="number"
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
                        InputProps={{ disableUnderline: true }}
                        label="Phone Number"
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
              {/* ------- Notes -------  */}
              <FieldWrapper>
                <Controller
                  name="notes"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Box m={2}>
                      <TextField
                        fullWidth
                        label="Notes"
                        InputProps={{ disableUnderline: true }}
                        variant={variant}
                        value={value}
                        onChange={onChange}
                        className={classes.root}
                      />
                    </Box>
                  )}
                />
              </FieldWrapper>
            </Row>
          </RowWrapper>
          {/* ------- Submit Button -------  */}
          <div>
            <Box m={2}>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </StyledButton>
            </Box>
          </div>
        </form>
      </FormSection>
    </PopupWrapper>
  );
}

SignUpForm.propTypes = {
  selectedEvent: PropTypes.instanceOf({}).isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default SignUpForm;
