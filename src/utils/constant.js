import * as Yup from 'yup';

const signUpValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const signUpFormElements = [
    { name: 'firstName', placeholder: 'Enter your first name..', },
    { name: 'lastName', placeholder: 'Enter your last name..', },
    { name: 'email', placeholder: 'Enter your email..', },
    { name: 'password', placeholder: 'Create a password..', },
    { name: 'confirmPassword', placeholder: 'Confirm your password..', }]


    const signInValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    
    const signInSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    
    const signInFormElements = [
        { name: 'email', placeholder: 'Enter your email..', },
        { name: 'password', placeholder: 'Create a password..', },
       ]

export { signUpValues, signUpSchema, signUpFormElements,signInValues,signInSchema,signInFormElements }