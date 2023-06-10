import React from 'react'
import {valSchema,handleEnter} from './utils'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {Button} from "@mui/material"
export default function FormPage({handleSubmit,formValues,handleClose}) {
   
    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }
   
  return (
    <div className='form-div'>
         <Formik initialValues={formValues} validationSchema={valSchema} onSubmit={handleSubmit} >
                            {
                                (props) =>
                                (<Form >
                                    <div >
                                        <h3>{formValues._id?"Edit Details":"Add Details"}</h3>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <Field
                                                    value={props.values.name}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="name" type="text" className={` ${props.touched.name && props.errors.name ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="name">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <Field
                                                    value={props.values.email}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Email" name="email" type="text" className={` ${props.touched.email && props.errors.email ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="email">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.phone}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Mobile Number" name="phone" type="text" className={` ${props.touched.phone && props.errors.phone ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="phone">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.age}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the age" name="age" type="text" className={` ${props.touched.age && props.errors.age ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="age">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.designation}                                                  
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Designation" name="designation" type="text" className={` ${props.touched.designation && props.errors.designation ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="designation">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <Button  className="cancel" style={{ backgroundColor: "red" ,marginLeft:'30px'}} onClick={handleClose}>Cancel</Button>
                                        <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '45px' }}>Submit</Button>
                                    </div>
                                </Form>)
                            }
                        </Formik>
         
    </div>
  )
}
