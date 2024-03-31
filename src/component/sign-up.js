// SignUpForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpFormElements, signUpValues, signUpSchema } from '../utils/constant';
import { baseUrl } from '../api/base-url';
import axios from 'axios';
import { registerUser } from '../api/network';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SignUpForm = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        const result = await axios.post(`${baseUrl}${registerUser}`, values)
        if (result.status === "success") {
            swal(result.data.msg, {
                icon: "success",
            });
            navigate('/sign-in')
        }
        else {
            swal(result.data.msg, {
                icon: "failure",
            });
        }
    };

    return (
        <div className='signup-form'>
            <div className='signup-form-container'>
                <h2>Sign Up</h2>
                <Formik initialValues={signUpValues} validationSchema={signUpSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            {signUpFormElements.map(({ name, placeholder }) => (
                                <div className="form-group">
                                    <Field type="text" name={name} value={values[name]} onchange={(e) => { setFieldValue(e.target.name, e.target.value) }} placeholder={placeholder} />
                                    <ErrorMessage name={name} component="div" className='error' />
                                </div>
                            ))}
                            <button type="submit" >
                                Sign Up
                            </button>
                            <div className="sub-title">have already an account <a href='./sign-in'>Sign In here..</a></div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default SignUpForm;
