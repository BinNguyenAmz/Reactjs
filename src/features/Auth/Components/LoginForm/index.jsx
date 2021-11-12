import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import InputField from 'Components/form-controls/InputFiled';
import PasswordField from 'Components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    root:{
        position: 'relative',
        paddingTop: theme.spacing(4),
    },

    avatar:{
        margin: '0 auto',
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },

    title:{
        margin: `${theme.spacing(2,0,3,0)} !important`,
        textAlign: 'center',
    },

    submit:{
        margin: `${theme.spacing(3,0,2,0)} !important`,
    },

    progress: {
        position: 'absolute',
        top: `${theme.spacing(1)} !important` ,
        left: '0',
        right: '0',
    }
}));

LoginForm.propTypes = {
    onsubmit: PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        identifier: yup
        .string()
        .required("Please enter your email")
        .email("Please enter a valid email"),
        password: yup.string().required("Please enter your password"),
    });

    const form = useForm({
        defaultValues: {    
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            await   onSubmit(values);
        }
    }

    const {isSubmitting} = form.formState;


    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}


            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography component="h3" variant="h5" className={classes.title}>
            Sign in 
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form}/>
                <PasswordField name="password" label="Password" form={form}/>

                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" className={classes.submit} fullWidth size="large">
                    Sign in
                </Button>
            </form>
        </div>
       
    );
}

export default LoginForm;