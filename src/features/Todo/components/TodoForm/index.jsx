import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'Components/form-controls/InputFiled';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

TodoForm.propTypes = {
    onsubmit: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string()
        .required('Please enter title')
        .min(10, 'Title is too short'),
      });

    const form = useForm({
        defaultValues: {    
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(values);
        }

        form.reset();
    }


    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form}/>
        </form>
    );
}

export default TodoForm;