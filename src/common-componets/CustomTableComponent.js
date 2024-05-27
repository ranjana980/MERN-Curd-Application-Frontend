import { Pagination, Table, TablePagination, TableCell, TableRow, CircularProgress } from '@mui/material';
import { paginationStyle, headTableCell, tableCell } from '../css/mui-css'
import { headColumns } from "../utils/constant"

const CustomTableComponent = ({ rowsPerPage, handleChangePage, totalCount, searchValue, data, actvePage, handleChangeRowsPerPage }) => {
    return (
        <>
            <Table sx={{ width: '87%', marginLeft: '10%' }}>
                <TableRow sx={{ backgroundColor: '#DAEEFA', }}>
                    {headColumns.map((item, index) => (
                        <TableCell key={index} sx={headTableCell}><b>{item}</b></TableCell>
                    ))}
                </TableRow>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        {item.map((item1, index1) => (<TableCell key={index1} sx={tableCell}>{item1}</TableCell>))}
                    </TableRow>
                ))}
            </Table>
            {(searchValue && !data.length) && <h2>Sorry No matching data found!</h2>}
            {(!searchValue && !data.length) && <h2>no data found!</h2>}
            <TablePagination
                component="div"
                count={totalCount}
                showFirstButton={true}
                showLastButton={true}
                page={actvePage}
                sx={paginationStyle}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                    totalCount
                        ? `Results: ${from - rowsPerPage}-${data?.length < rowsPerPage ? totalCount : from - rowsPerPage + rowsPerPage - 1
                        } of ${totalCount}`
                        : "Results: Not Found"
                }
                ActionsComponent={() => {
                    return (
                        <Pagination
                            sx={{ display: "flex", justifyContent: "end", width: '100%' }}
                            defaultPage={actvePage}
                            count={
                                totalCount % rowsPerPage === 0
                                    ? Math.floor(totalCount / rowsPerPage)
                                    : Math.floor(totalCount / rowsPerPage) + 1
                            }
                            onChange={handleChangePage}
                            page={actvePage}
                        ></Pagination>
                    );
                }}
            /></>
    )
}

export default CustomTableComponent;
