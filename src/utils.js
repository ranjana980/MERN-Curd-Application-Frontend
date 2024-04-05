import * as yup from 'yup'
export const initialValAdd = {
    designation: "",
    firstName: "",
    lastName: '',
    email: "",
    phone: "",
    age: ""
}

export const valSchemaAdd = yup.object().shape({
    firstName: yup.string().required('First Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
    lastName: yup.string().required('Last Name is Required!'),
    designation: yup.string().required('Designation is Required!'),
    age: yup.string().required('age is Required').matches(/^[0-9]+$/, 'age should be in number').min(2, 'Please enter valid age').max(3, 'Enter valid age'),
    phone: yup.string().required('Mobile is Required').matches(/^[0-9]+$/, 'Mobile should be a number').min(10, 'Please enter valid Mobile').max(10, 'Enter valid Mobile'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});


export const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
};

