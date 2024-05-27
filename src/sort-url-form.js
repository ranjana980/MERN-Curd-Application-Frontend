import React from 'react'
import { valSchemaAdd, handleEnter } from './utils'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from "@mui/material"
export default function SortUrlFormPage({ handleSubmit, formValues, handleClose }) {

    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }

    return (
        <div className='form-div'>
            <Formik initialValues={formValues} validationSchema={!formValues?._id ? valSchemaAdd : false} onSubmit={handleSubmit} >
                {
                    ({ values, setFieldValue, touched, errors }) =>
                    (<Form >
                        <div >
                            <h3>{formValues._id ? "Update Your Shorten url" : "Short Your url"}</h3>
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <Field
                                        value={values?._id ? values?.username : values?.firstName}
                                        onKeyDown={handleEnter}
                                        disabled={values?._id}
                                        onChange={(e) => handleChange(e, setFieldValue)}
                                        placeholder="enter url for short" name="url" type="text" className={` ${touched.name && errors.name ? `is-invalid` : `form-control`}`} />
                                    <ErrorMessage name="url">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                        </div>
                        <div >
                            <Button className="cancel" style={{ backgroundColor: "red", marginLeft: '30px' }} onClick={handleClose}>Cancel</Button>
                            <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '45px' }}>Submit</Button>
                        </div>
                    </Form>)
                }
            </Formik>

        </div>
    )
}
