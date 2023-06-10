import axios from "axios"
import { useEffect, useState } from "react"
import { Table, Button, DialogContent, DialogContentText,  } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import swal from 'sweetalert';
import Pagination from "react-js-pagination";

export default function CurdApp() {
    const [userList, setuserList] = useState([])
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [activePage,setactivePage]=useState(1)
    const [limit,setLimit]=useState(0)
    const [totalRecords,settotalRecords]=useState(0)
    const [search,setSearch]=useState("")

    useEffect(() => {
        getData(activePage,"",search)
    }, [])

    const NextPage = (pageNumber) => {
       setactivePage(pageNumber)
       getData(pageNumber,search)
      };

    const getData = async (userPage,searchString,rowPerPage) => {
        const page = userPage && `?page=${userPage-1}`;
	    const limit = rowPerPage && `&limit=${rowPerPage}`;
        const search=searchString&& `&search=${searchString}`
        const result = await axios.post(`https://mern-curd-application-backend-1p66r09yp-ranjana980.vercel.app/api/employee${page}${limit}${search}`)
        setuserList(result.data.msg)
        settotalRecords((result.data.total))
    }
    const handleSearch=()=>{
        getData(activePage,search)

    }

    const handleEdit = async (item) => {
        const result = await axios.post('https://mern-curd-application-backend-1p66r09yp-ranjana980.vercel.app/api/employee/show', { employeeID: item._id })
        if (result.data.code == 201) {
            swal(result.data.msg)
        }
        else {
            setUserDetails(result.data.msg)
            setOpen1(true)
        }
    }

    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }

    const onDelete =  (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const result = await axios.post('https://mern-curd-application-backend-1p66r09yp-ranjana980.vercel.app/api/employee/delete', { employeeID: id })
                if(result.data.code==200){
                    getData(activePage,search)
                }
                else{
                    swal(result.data.msg)
                    getData(activePage,search)
                }
              swal(result.data.msg, {
                icon: "success",
              });
            }
          });
    }

    var initialVal = {
        name: userDetails.name,
        designation: userDetails.designation,
        email: userDetails.email,
        phone: userDetails.phone,
        age: userDetails.age
    }

    var valSchema = yup.object().shape({
        name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        designation: yup.string().required('Designation is Required!'),
        age: yup.string().required('age is Required').matches(/^[0-9]+$/, 'age should be in number').min(2, 'Please enter valid age').max(3, 'Enter valid age'),
        phone: yup.string().required('Mobile is Required').matches(/^[0-9]+$/, 'Mobile should be a number').min(10, 'Please enter valid Mobile').max(10, 'Enter valid Mobile'),
        email: yup.string().required('Email is Required').matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/, 'Invalid Email'),
    });

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const handleSubmit = async (values) => {
        values['phone'] = Number(values.phone)
        values['age'] = Number(values.age)
        if (open == true) {
            const result = await axios.post('https://mern-curd-application-backend-1p66r09yp-ranjana980.vercel.app/api/employee/store', values)
            if(result.data.code==200){
                swal(result.data.msg, {
                    icon: "success",
                  });
                getData(activePage,search)
                setUserDetails({})
                setOpen(false)
            }
            else{
                swal(result.data.msg);
            } 
        }
        else {
            values['employeeID'] = userDetails._id
            const result = await axios.post('https://mern-curd-application-backend-1p66r09yp-ranjana980.vercel.app/api/employee/update', values)
            if(result.data.code==200){
                swal(result.data.msg, {
                    icon: "success",
                  });
                getData(activePage,search)
                setUserDetails({})
                setOpen1(false)
            }
            else{
                swal(result.data.msg);
            }
           
        }

    }
    return (
        <div className="main-div">
            <input onChange={(e)=>setSearch(e.target.value)} placeholder="Search Employee by Name...." className="form-control" style={{width:"200px",position:'relative',left:'470px',border:"2px solid skyblue",bottom:'6px'}}/>
            <Button className="cancel" onClick={handleSearch} style={{ backgroundColor: "#248adb", right: '0px', left: '480px', bottom: '10px' }} >Search</Button>
            <Button className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '500px', bottom: '10px' }} onClick={() => { setOpen(true) }}>Add New</Button>
            <Table responsive>
                <tr style={{ background: 'skyblue' }}>
                    <th>S.No</th>
                    <th>Employee Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                {userList.map((item, index) => (
                    <tr> <td>{((activePage - 1) * 10) + index +  1}</td>
                        <td>{item.name}</td>
                        <td>{item.designation}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.age}</td>
                        <td><BorderColorIcon style={{ color: 'green' }} onClick={() => handleEdit(item)} /><DeleteIcon style={{ color: 'red', marginLeft: '10px' }} onClick={() => onDelete(item._id)} /></td>
                    </tr>
                ))}
            </Table>
            {userList.length!=0?"":<h4 style={{color:'rgb(36, 138, 219)'}}>Data Not Found Please Cheack Spelling of Name</h4>}
            <div className="text-right text-info">
                    <Pagination
                      prevPageText="prev"
                      nextPageText="next"
                      activePage={activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={totalRecords}
                      pageRangeDisplayed={10}
                      marginPagesDisplayed={2}
                      activeClassName={"active"}
                      hideFirstLastPages={true}
                      onChange={(event) => NextPage(event)}
                    />
                  </div>
            {(open) ?
                <DialogContent className='pay-card' style={{ marginTop: '-304px', left: '52%', width: '221px', marginLeft: "-84px", overflowY: "hidden", }}>
                    <DialogContentText id="alert-dialog-description">
                        <Formik initialValues={initialVal} validationSchema={valSchema} onSubmit={handleSubmit} >
                            {
                                (props) =>
                                (<Form >
                                    <div >
                                        <h3>Add New Data</h3>
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
                                        <Button onClick={() => {
                                            setOpen(false)
                                        }
                                        } className="cancel" style={{ backgroundColor: "red" }}>Cancel</Button>
                                        <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '35px' }}>Submit</Button>
                                    </div>
                                </Form>)
                            }
                        </Formik>
                    </DialogContentText>
                </DialogContent> : ""
            }
            {(open1) ?
                <DialogContent className='pay-card' style={{ marginTop: '-304px', left: '52%', width: '221px', marginLeft: "-84px", overflowY: "hidden", }}>
                    <DialogContentText id="alert-dialog-description">
                        <Formik initialValues={initialVal} validationSchema={valSchema} onSubmit={handleSubmit} >
                            {
                                (props) =>
                                (<Form >
                                    <div >
                                        <h3>Edit Data</h3>
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
                                                    placeholder="Enter the Name" name="phone" type="text" className={` ${props.touched.phone && props.errors.phone ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="phone">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.age}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="age" type="text" className={` ${props.touched.age && props.errors.age ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="age">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.designation}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="designation" type="text" className={` ${props.touched.designation && props.errors.designation ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="designation">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <Button onClick={() => {
                                            setOpen1(false)
                                        }
                                        } className="cancel" style={{ backgroundColor: "red" }} >Cancel</Button>
                                        <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '35px' }}>Save</Button>
                                    </div>
                                </Form>)
                            }
                        </Formik>
                    </DialogContentText>
                </DialogContent> : ""
            }
        </div>
    )

}