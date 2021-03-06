import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';


Register.propTypes = {
    closeDiglog: PropTypes.func,
};


function Register(props) {
    const  dispatch = useDispatch();  
    
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            // values.userName = values.email;  
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            // Close dialog
            const {closeDiglog} = props;
            if(closeDiglog){
                closeDiglog();
            }
            enqueueSnackbar('Register succesfully', {variant: "success"});
        } catch (error) {
            enqueueSnackbar(error.message, {variant: "error"});
        }

    };
    
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;