import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';


Login.propTypes = {
    closeDiglog: PropTypes.func,
};

function Login(props) {
    const  dispatch = useDispatch();  
    
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            // Close dialog

            const {closeDiglog} = props;
            if(closeDiglog){
                closeDiglog();
            }
        } catch (error) {
            enqueueSnackbar(error.message, {variant: "error"});
        }

    };
    
    return (
        <div>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Login;