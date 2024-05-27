// SignInForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInFormElements, signInValues, signInSchema } from '../utils/constant';
import axios from 'axios';
import { signInUser } from '../api/network';
import { baseUrl } from '../api/base-url';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SignInForm = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values,) => {
        const result = await axios.post(`${baseUrl}${signInUser}`, values)
        if (result.data.code === 200) {
            swal(result.data.message, {
                icon: "success",
            });
            navigate('/dashboard')
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
                <h2>Sign In</h2>
                <Formik initialValues={signInValues} validationSchema={signInSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            {signInFormElements.map(({ name, placeholder }) => (
                                <div className="form-group">
                                    <Field type="text" name={name} value={values[name]} onchange={(e) => { setFieldValue(e.target.name, e.target.value) }} placeholder={placeholder} />
                                    <ErrorMessage name={name} component="div" className='error' />
                                </div>
                            ))}
                            <button type="submit" disabled={isSubmitting}>
                                Sign In
                            </button>
                            <div className="sub-title">don't have an account <a href={'./sign-up'}>Register here..</a></div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default SignInForm;
