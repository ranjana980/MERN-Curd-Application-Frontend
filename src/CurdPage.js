import axios from "axios"
import { useEffect, useState } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormPage from './form'
import { baseUrl } from "./api/base-url";
import { addUser,deleteUser,updateDetails, viewDetails } from "./api/network";
import {initialVal} from './utils'
import swal from 'sweetalert';
import {Pagination,Table,TablePagination,Button,  TableCell, TableRow, Dialog,Grow, CircularProgress  } from '@mui/material';
import {headColumns} from './constant'
import {paginationStyle,headTableCell,tableCell} from '../src/css/mui-css'

function CurdApp() {
    const [userList, setuserList] = useState([])
    const [open, setOpen] = useState(false)
    const [formValues,setFormValues]=useState(initialVal)
    const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue,setSearchValue]=useState("")
    

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

    const [search,setSearch]=useState("")

    useEffect(() => {
        getData(page,rowsPerPage,searchValue)
    }, [page,rowsPerPage,searchValue])

     const handleSubmit = async (values) => {
        values['phone'] = Number(values.phone)
        values['age'] = Number(values.age)
        if (open ===true) {
            const result = await axios.post(`${baseUrl}${addUser}`, values)
            if(result.data.code===200){
                swal(result.data.msg, {
                    icon: "success",
                  });
              getData(page,rowsPerPage,"")
                setFormValues(initialVal)
                setOpen(false)
            }
            else{
                swal(result.data.msg);
            } 
        }
        else {
            const  employeeID= formValues._id && `/${formValues._id}`;
            const result = await axios.post(`${baseUrl}${updateDetails}${employeeID}`, values)
            if(result.data.code===200){
                swal(result.data.msg, {
                    icon: "success",
                  });
              getData(page,rowsPerPage,"")
                setFormValues(initialVal)
                setOpen(false)
            }
            else{
                swal(result.data.msg);
            }
           
        }
    
    }

    const getData = async (userPage,rowPerPage,searchString) => {
        const activePage = userPage && `?page=${userPage-1}`;
	    const limit = rowPerPage && `&limit=${rowPerPage}`;
        const searchData= searchString && `&search=${searchString}`
        const result = await axios.get(`${baseUrl}${activePage}${limit}${searchData}`)
        setTotalCount((result.data.total))
        let list=[]
        result.data.msg.map((item,index)=>{
            list.push([rowsPerPage * page + index - rowsPerPage + 1,
                item.name.charAt(0).toUpperCase() + item.name.slice(1),
                item.designation, item.email,
                item.phone,
                item.age,
                <><BorderColorIcon style={{ color: 'green',cursor:'pointer',fontSize:'18px' }} onClick={() => handleEdit(item._id)} />
                <DeleteIcon style={{ color: 'gary', marginLeft: '10px',fontSize:'18px' ,cursor:'pointer'}} onClick={() => onDelete(item._id)} /></>])
        })
        setuserList(list)
    }

    const handleSearch=()=>{
        setPage(1)
        setSearchValue(search)
    }

    const handleEdit = async (id) => {
        const  employeeID= id && `/${id}`;
        const result = await axios.get(`${baseUrl}${viewDetails}${employeeID}`)
        if (result.data.code == 201) {
            swal(result.data.msg)
        }
        else {
            setFormValues(result.data.msg)
            setOpen(true)
        }
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
                const  employeeID= id && `/${id}`;
                const result = await axios.delete(`${baseUrl}${deleteUser}${employeeID}`)
                if(result.data.code==200){
                  getData(page,rowsPerPage,"")
                }
                else{
                    swal(result.data.msg)
                  getData(page,rowsPerPage,"")
                }
              swal(result.data.msg, {
                icon: "success",
              });
            }
          });
    }

   

    
const handleClose=()=>{
    setOpen(false)
    setFormValues(initialVal)
}

    return (
        <div className="main-div">
            <input  onKeyDown={(event)=>{ 
                if (event.key.toLowerCase() === "enter") {
                handleSearch()
            } }}onChange={(e)=>setSearch(e.target.value)} placeholder="Search Employee by Name...." className="form-control" style={{width:"200px",position:'relative',left:'470px',border:"2px solid skyblue",bottom:'6px'}}/>
            <Button className="cancel" onClick={handleSearch} style={{ backgroundColor: "#248adb", right: '0px', left: '480px', bottom: '10px', }} >Search</Button>
            <Button className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '500px', bottom: '10px' }} onClick={() => { setOpen(true) }}>Add New</Button>
            <Table  sx={{width:'87%',marginLeft:'10%'}}>
                <TableRow sx={{backgroundColor:'#DAEEFA',}}>
                    {headColumns.map((item,index)=>(
                        <TableCell key={index} sx={headTableCell}><b>{item}</b></TableCell>
                    ))}
                </TableRow>
                {userList.map((item,index) => (
                     <TableRow key={index}>
                        {item.map((item1,index1)=>( <TableCell key={index1} sx={tableCell}>{item1}</TableCell>))}
                 </TableRow>
                ))}
            </Table>
           
            {!searchValue?userList.length===0?<CircularProgress/>
            :"":searchValue&&userList.length===0?
            <h4>Sorry! Not matching Data Found</h4>:""}
                    <TablePagination
					component="div"
					count={totalCount}
					showFirstButton={true}
					showLastButton={true}
					page={page}
					sx={paginationStyle}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelDisplayedRows={({ from, to, count }) =>
                    totalCount
							? `Results: ${from - rowsPerPage}-${
                                userList?.length < rowsPerPage ? totalCount : from - rowsPerPage + rowsPerPage - 1
							  } of ${totalCount}`
							: "Results: Not Found"
					}
					ActionsComponent={() => {
						return (
							<Pagination
								sx={{ display: "flex", justifyContent: "end",width:'100%' }}
								defaultPage={page}
								count={
									totalCount % rowsPerPage === 0
										? Math.floor(totalCount / rowsPerPage)
										: Math.floor(totalCount / rowsPerPage) + 1
								}
								onChange={handleChangePage}
								page={page}
							></Pagination>
						);
					}}
				/>
           <Dialog open={open} onClose={() => setOpen(false)}
				aria-labelledby="customized-dialog-title"
				fullWidth
                maxWidth={'xs'}
				scroll="paper"
				transitionDuration={1000}
				transition={Grow}>
            <FormPage handleSubmit={handleSubmit} formValues={formValues} handleClose={handleClose}/>
           </Dialog>
        </div>
    )

}
export default CurdApp;