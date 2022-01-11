import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from "react-hook-form";

// Users will need need to fill out a couple text fields to sign up for an event. For this task, you will set up the form that should be necessary to sign up. This task was inspired by the existing sign up page here, but please don't worry about any styling yet!

// Requirements
//  Using the text fields from the MUI library, set up a form that accepts a name, email, phone number, and any notes. Please note you may have to install the mui library using npm if it hasn't already been installed.
//  For now, console.log all of the info in a single JS object when the user clicks the submit button

// Extra Credit
//  Using an NPM package like react-hook-form or formik, add validation and small error messages if the user doesn't fill out a required field or formats their email or phone number wrong

const SignUpForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [notes, setNotes] = useState('')
    const variant = "outlined"
    const handleSubmit = () => console.log({name, email, number, notes})

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField label="Name" variant={variant} required 
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField label="Email" variant={variant} required
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField label="Phone Number" variant={variant} required
                    value = {number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <TextField label="Notes" variant={variant}
                    value = {notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                {/* More standard for notes? */}
                {/* <textarea
                    value = {notes}
                    onChange={(e) => setNotes(e.target.value)}
                /> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;
