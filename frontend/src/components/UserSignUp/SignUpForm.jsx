import React from "react";
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
  color: #000000;
  margin-top: -10px;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #80c0a4;
  border-radius: 80px;
  padding: 20px;
  min-width: 800px;
`;

const FirstSection = styled.div`
  position: relative;
  display: flex;
  border-radius: 5px;
  padding: 20px;
  min-width: 250px;
  width: fit-content;
`;

const LeftEventCard = styled.div`
  height: 50%;
  background: #0ba360;
  border-radius: 20px;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 250px;
`;

const DividerLine = styled.div`
  margin: 0px 20px;
  min-width: 18px;
  height: 500px;
  left: 655px;
  top: 247px;
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

const Center = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 85%;
`;

const StyledButton = styled(Button)`
  background-color: #0ba360;
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

function SignUpForm() {
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

  // log values when data is submitted
  const onSubmit = (values) => {
    console.log(values);
    reset();
  };

  // info for required entries
  const rEntries = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "number", label: "Phone Number" },
  ];

  return (
    <PopupWrapper>
      {/* Left event card */}
      <FirstSection>
        <PopupTitle> Sign Up </PopupTitle>
        <LeftEventCard />
      </FirstSection>
      {/* Divider line */}
      <DividerLine />
      {/* Sign up form */}
      <FormSection>
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ------- Name, Email, Phone Number -------  */}
            {rEntries.map((entry) => (
              <div>
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
              </div>
            ))}
            {/* ------- Notes -------  */}
            <div>
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
            </div>
            {/* ------- Submit Button -------  */}
            <div>
              <Box m={2}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign Waiver and Register
                </StyledButton>
              </Box>
            </div>
          </form>
        </Center>
      </FormSection>
    </PopupWrapper>
  );
}

export default SignUpForm;
