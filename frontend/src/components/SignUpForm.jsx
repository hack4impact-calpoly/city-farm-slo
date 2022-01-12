import React, {useState} from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Requirements
//  Using the text fields from the MUI library, set up a form that accepts a name, email, phone number, and any notes. Please note you may have to install the mui library using npm if it hasn't already been installed.
//  For now, console.log all of the info in a single JS object when the user clicks the submit button

// Extra Credit
//  Using an NPM package like react-hook-form or formik, add validation and small error messages if the user doesn't fill out a required field or formats their email or phone number wrong

const SignUpForm = () => {
    // style
    const variant = "outlined"

    // validation 
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required field"),
        email: Yup.string()
            .required("Required field")
            .email("Invalid format"),
        number: Yup.string()
            .required("Required field")
            .min(10, "Too short")
            .max(10, "Too long")
            .matches(phoneRegExp, "Invalid format")
    });
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    
    // log values when data is submitted
    const onSubmit = (values) => {
        console.log(values);
        reset();
    };

    // info for required entries
    const rEntries = [
        {name: "name", label: "Name"}, 
        {name: "email", label: "Email"}, 
        {name: "number", label: "Phone Number"}
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* ------- Name, Email, Phone Number -------  */}
            {rEntries.map((entry) => (
                <Controller key={entry.name} name={entry.name} defaultValue="" control={control} 
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField required label={entry.label} 
                            variant={variant}value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )} 
                />
            ))}
            {/* ------- Notes -------  */}
            <Controller name="notes" defaultValue="" control={control} 
                render={({field: {onChange, value}}) => (
                    <TextField label="Notes" variant={variant} 
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            {/* ------- Submit Button -------  */}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    )
}

export default SignUpForm;
