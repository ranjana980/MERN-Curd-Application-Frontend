import * as Yup from 'yup';

const signUpValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const signUpSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const signUpFormElements = [
    { name: 'username', placeholder: 'Create a username..', },
    { name: 'email', placeholder: 'Enter your email..', },
    { name: 'password', placeholder: 'Create a password..', },
    { name: 'confirmPassword', placeholder: 'Confirm your password..', }]


const signInValues = {
    email: '',
    password: '',
};

const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signInFormElements = [
    { name: 'email', placeholder: 'Enter your email..', },
    { name: 'password', placeholder: 'Create a password..', },
]

const headColumns = ["#", "url", "Action"]

export { signUpValues, signUpSchema, signUpFormElements, signInValues, signInSchema, signInFormElements, headColumns }