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
    const variant = "outlined"
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required field"),
        email: Yup.string()
            .required("Required field")
            .email('Invalid format'),
        number: Yup.string()
            .required("Required field")
            .matches(phoneRegExp, 'Invalid format')
            .min(10, "Too short")
            .max(10, "Too long")
    });
    const {register, control, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        errors.name?.message
    };

    return (
        <div>
            {/* ---------- Name ---------- */}
            <TextField name="name" label="Name" required 
                variant={variant}
                {...register('name')}
                error={errors.name ? true : false}
            />
            {/* <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
            </Typography> */}
            {/* ---------- Email ---------- */}
            <TextField name="email" label="Email" required
                variant={variant}
                {...register('email')}
                error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
            </Typography>
            {/* ---------- Phone Number ---------- */}
            <TextField name="number" label="Phone Number" required
                variant={variant}
                {...register('number')}
                error={errors.number ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.number?.message}
            </Typography>
            {/* ---------- Notes ---------- */}
            <TextField name="notes" label="Notes" 
                variant={variant}
                {...register('notes')}
            />
            {/* ---------- Submit Data ---------- */}
            <Button variant={"contained"} color="primary" onClick={handleSubmit(onSubmit)}> Submit </Button>
        </div>
        // <form onSubmit={handleSubmit(data => console.log(data))} noValidate autoComplete="off">
        //     <Controller name="name" defaultValue=""
        //         control={control} 
        //         render={({field: {onChange, value}, fieldState: {error}}) => (
        //             <TextField label="Name" variant={variant} required
        //                 value={value}
        //                 onChange={onChange}
        //                 error={!!error}
        //                 helperText={error ? error.message : null}
        //             />
        //         )}
        //         rules={{required: 'Name required'}}
        //     />
        //     <Controller name="email" defaultValue=""
        //         control={control} 
        //         render={({field: {onChange, value}, fieldState: {error}}) => (
        //             <TextField label="Email" variant={variant} required
        //                 value={value}
        //                 onChange={onChange}
        //                 error={!!error}
        //                 helperText={error ? error.message : null}
        //             />
        //         )}
        //         rules={{required: 'Email required'}}
        //     />
        //     <Controller name="phone-number" defaultValue=""
        //         control={control} 
        //         render={({field: {onChange, value}, fieldState: {error}}) => (
        //             <TextField label="Phone Number" variant={variant} required
        //                 value={value}
        //                 onChange={onChange}
        //                 error={!!error}
        //                 helperText={error ? error.message : null}
        //             />
        //         )}
        //         rules={{required: 'Phone number required'}}
        //     />
        //     <Controller name="notes" defaultValue=""
        //         control={control} 
        //         render={({field: {onChange, value}, fieldState: {error}}) => (
        //             <TextField label="Notes" variant={variant} 
        //                 value={value}
        //                 onChange={onChange}
        //                 error={!!error}
        //                 helperText={error ? error.message : null}
        //             />
        //         )}
        //     />
        //     <Button type="submit" variant="contained" color="primary">
        //         Submit
        //     </Button>
        // </form>
    )
}

export default SignUpForm;
