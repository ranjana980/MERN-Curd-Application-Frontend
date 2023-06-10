import axios from "axios"
import { useEffect, useState } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormPage from './form'
import { baseUrl } from "./base-url";
import { addUser,updateDetails } from "./network";
import {initialVal} from './utils'
import swal from 'sweetalert';
import {Pagination,Table,TablePagination,Button,  TableCell, TableRow, Dialog,Grow  } from '@mui/material';
import {headColumns} from './constant'

export default function CurdApp() {
    const [userList, setuserList] = useState([])
    const [open, setOpen] = useState(false)
    const [formValues,setFormValues]=useState(initialVal)
    const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
    

	const handleChangePage = (event, newPage) => {
		setPage(page+1);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

    const [search,setSearch]=useState("")

    useEffect(() => {
        getData(page,rowsPerPage,"")
    }, [page,rowsPerPage])

     const handleSubmit = async (values) => {
        values['phone'] = Number(values.phone)
        values['age'] = Number(values.age)
        if (open == true) {
            const result = await axios.post(`${baseUrl}${addUser}`, values)
            if(result.data.code==200){
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
            values['employeeID'] = formValues._id
            const result = await axios.post(`${baseUrl}${updateDetails}`, values)
            if(result.data.code==200){
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
        const search= searchString && `&search=${searchString}`
        const result = await axios.get(`${baseUrl}${activePage}${limit}${search}`)
        setTotalCount((result.data.total))
        let list=[]
        result.data.msg.map((item,index)=>{
            list.push([rowsPerPage * page + index - rowsPerPage + 1,
                item.name.charAt(0).toUpperCase() + item.name.slice(1),
                item.designation, item.email,
                item.phone,
                item.age,
                <><BorderColorIcon style={{ color: 'green',cursor:'pointer' }} onClick={() => handleEdit(item._id)} />
                <DeleteIcon style={{ color: 'red', marginLeft: '10px' ,cursor:'pointer'}} onClick={() => onDelete(item._id)} /></>])
        })
        setuserList(list)
    }

    const handleSearch=()=>{
        getData(page,rowsPerPage,search)
    }

    const handleEdit = async (id) => {
        const result = await axios.post(`${baseUrl}/show`, { employeeID: id })
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
                const result = await axios.post(`${baseUrl}/delete`, { employeeID: id })
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
            <input onChange={(e)=>setSearch(e.target.value)} placeholder="Search Employee by Name...." className="form-control" style={{width:"200px",position:'relative',left:'470px',border:"2px solid skyblue",bottom:'6px'}}/>
            <Button className="cancel" onClick={handleSearch} style={{ backgroundColor: "#248adb", right: '0px', left: '480px', bottom: '10px', }} >Search</Button>
            <Button className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '500px', bottom: '10px' }} onClick={() => { setOpen(true) }}>Add New</Button>
            <Table  sx={{width:'87%',marginLeft:'10%'}}>
                <TableRow sx={{backgroundColor:'#DAEEFA',}}>
                    {headColumns.map((item)=>(
                        <TableCell sx={{backgroundColor:'#DAEEFA',borderTob:'1px solid #c0c0c0',padding:'11px'}}>{item}</TableCell>
                    ))}
                </TableRow>
                {userList.map((item) => (
                     <TableRow >
                        {item.map((item1)=>( <TableCell sx={{borderTob:'1px solid #c0c0c0',padding:'11px'}}>{item1}</TableCell>))}
                 </TableRow>
                ))}
            </Table>
            {userList.length!=0?"":<h4 style={{color:'rgb(36, 138, 219)'}}>Data Not Found Please Cheack Spelling of Name</h4>}
                    <TablePagination
					component="div"
					count={totalCount}
					showFirstButton={true}
					showLastButton={true}
					page={page}
					sx={{ width: "100%",display:'flex',justifyContent:'space-between',"& .MuiToolbar-root": {
                        display:'box',
                        justifyContent:'start',
                        width:'87%',
                        marginLeft:'9%',
                        "& .MuiTablePagination-spacer":{
                            display:'none'
                        }
                    }}}
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