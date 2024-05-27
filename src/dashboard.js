import axios from "axios"
import { useEffect, useState } from "react"
import { BorderColor, Delete } from '@material-ui/icons';
import { baseUrl } from "./api/base-url";
import { deleteUrl, getUrls, registerUser, updateDetails, viewDetails } from "./api/network";
import { initialValAdd } from './utils'
import swal from 'sweetalert';
import { Button, Dialog, Grow, } from '@mui/material';
import CustomTableComponent from "./common-componets/CustomTableComponent";
import { headColumns } from "./utils/constant";
import SortUrlFormPage from "./sort-url-form";

function DashBoard() {
    const [urlData, setUrlData] = useState([])
    const [open, setOpen] = useState(false)
    const [formValues, setFormValues] = useState(initialValAdd)
    const [activePage, setActivePage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState("")
    const [search, setSearch] = useState("")

    const handleChangePage = (event, newPage) => {
        setActivePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

    useEffect(() => {
        getUrlData(activePage, rowsPerPage, searchValue)
    }, [activePage, rowsPerPage, searchValue])


    const handleSubmit = async (values) => {
        values['phone'] = Number(values.phone)
        values['age'] = Number(values.age)
        if (!formValues._id) {
            const result = await axios.post(`${baseUrl}${registerUser}`, values)
            if (result.data.code === 200) {
                swal(result.data.message, {
                    icon: "success",
                });
                getUrlData(activePage, rowsPerPage, "")
                setFormValues(initialValAdd)
                setOpen(false)
            }
            else {
                swal(result.data.message);
            }
        }
        else {
            const employeeID = formValues._id && `/${formValues._id}`;
            const result = await axios.patch(`${baseUrl}${updateDetails}${employeeID}`, values)
            if (result.data.code === 200) {
                swal(result.data.message, {
                    icon: "success",
                });
                getUrlData(activePage, rowsPerPage, "")
                setFormValues(initialValAdd)
                setOpen(false)
            }
            else {
                swal(result.data.message);
            }

        }

    }

    const getUrlData = async (userPage, rowPerPage, searchString,) => {
        const activePage = userPage && `?page=${userPage - 1}`;
        const limit = rowPerPage && `&limit=${rowPerPage}`;
        const searchData = searchString && `&search=${searchString}`
        const result = await axios.get(`${baseUrl}${getUrls}${activePage}${limit}${searchData}&id=6654e3e30965caad47b439fc`)
        setTotalCount((result.data.total))
        result.data.data.map((item, index) => {
            setUrlData([...urlData, [rowsPerPage * activePage + index - rowsPerPage + 1,
            item.url,
            <><BorderColor style={{ color: 'green', cursor: 'pointer', fontSize: '18px' }} onClick={() => handleEdit(item._id)} />
                <Delete style={{ color: 'gary', marginLeft: '10px', fontSize: '18px', cursor: 'pointer' }} onClick={() => onDelete(item._id)} />
            </>]])
        })
    }

    const handleSearch = () => {
        setActivePage(1)
        setSearchValue(search)
    }

    const handleEdit = async (id) => {
        const employeeID = id && `/${id}`;
        const result = await axios.get(`${baseUrl}${viewDetails}${employeeID}`)
        if (result.data.code == 201) {
            swal(result.data.message)
        }
        else {
            setOpen(true)
            setFormValues(result.data.message)
        }
    }

    const onDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const employeeID = id && `/${id}`;
                    const result = await axios.delete(`${baseUrl}${deleteUrl}${employeeID}`)
                    if (result.data.code == 200) {
                        getUrlData(activePage, rowsPerPage, "")
                    }
                    else {
                        swal(result.data.message)
                        getUrlData(activePage, rowsPerPage, "")
                    }
                    swal(result.data.message, {
                        icon: "success",
                    });
                }
            });
    }


    const handleClose = () => {
        setOpen(false)
        setFormValues(initialValAdd)
    }

    return (
        <div className="main-div">
            <input onKeyDown={(event) => {
                if (event.key.toLowerCase() === "enter") {
                    handleSearch()
                }
            }} onChange={(e) => setSearch(e.target.value)} placeholder="Search Employee by Name...." className="form-control" style={{ width: "200px", position: 'relative', left: '470px', border: "2px solid skyblue", bottom: '6px' }} />
            <Button className="cancel" onClick={handleSearch} style={{ backgroundColor: "#248adb", right: '0px', left: '480px', bottom: '10px', }} >Search</Button>
            <Button className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '500px', bottom: '10px' }} onClick={() => { setOpen(true) }}>Add New</Button>
            <CustomTableComponent
                coulumns={headColumns}
                data={urlData}
                rowsPerPage={rowsPerPage}
                totalCount={totalCount}
                handleChangePage={handleChangePage}
                activePage={activePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage} />
            <Dialog open={open} onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                fullWidth
                maxWidth={'xs'}
                scroll="paper"
                transitionDuration={1000}
                transition={Grow}>
                <SortUrlFormPage handleSubmit={handleSubmit} formValues={formValues} handleClose={handleClose} />
            </Dialog>
        </div>
    )

}
export default DashBoard;