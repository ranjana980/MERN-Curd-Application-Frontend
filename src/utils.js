import * as yup from 'yup'
import { baseUrl } from './base-url';
import { updateDetails,addUser } from './network';
export  const initialVal = {
    name: "",
    designation: "",
    email: "",
    phone: "",
    age: ""
}

export  const valSchema = yup.object().shape({
    name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
    designation: yup.string().required('Designation is Required!'),
    age: yup.string().required('age is Required').matches(/^[0-9]+$/, 'age should be in number').min(2, 'Please enter valid age').max(3, 'Enter valid age'),
    phone: yup.string().required('Mobile is Required').matches(/^[0-9]+$/, 'Mobile should be a number').min(10, 'Please enter valid Mobile').max(10, 'Enter valid Mobile'),
    email: yup.string().required('Email is Required').matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/, 'Invalid Email'),
});
export const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
};

