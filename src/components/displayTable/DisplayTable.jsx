import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { convertDate } from "../../mappings";
import "./displayTable.scss";

export default function DisplayTable(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRowsPerPage, setcurrentRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setcurrentRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const columnHeaderElements = (
    <TableRow>
      {props.columns.map((column) => {
        return (
          <TableCell
            key={column.id}
            className="header-cell"
          >
            {column.label}
          </TableCell>
        )
      })
      }
      <TableCell className="header-cell">
        Action
      </TableCell>
    </TableRow>
  );

  const RowElements = props.instances.slice(currentPage * currentRowsPerPage, currentPage * currentRowsPerPage + currentRowsPerPage)
    .map((instance) => {
      return (
        <TableRow
          key={instance.uuid}
          hover={true}
          sx={{
            cursor: "pointer",
          }}
        >
          {props.columns.map((column) => {
            let value;
            let statusClass;
            switch (column.id) {
              case "created_at":
                value = convertDate(instance[column.id]);
                break;
              case "updated_at":
                value = convertDate(instance[column.id]);
                break;
              case "employee.user":
                const rawVal = column.id.split('.').reduce((obj, key) => (obj || {})[key], instance);
                value = `${rawVal.first_name} ${rawVal.last_name}`;
                break;
              default:
                const rawValue = column.id.split('.').reduce((obj, key) => (obj || {})[key], instance);
                value = typeof rawValue === 'boolean' ? (rawValue ? "Yes" : "No") : rawValue || "N/A";
                break;
            }
            if (column.id === "sale_status") {
              statusClass = instance[column.id].substring(0, 1) + instance[column.id].substring(1).toLowerCase().replaceAll(' ', '_');
            }
            return (
              <TableCell
                key={`${instance.uuid}-${column.id}`}
                className="tableCell"
              >
                {column.id === "sale_status" ? <span className={`status ${statusClass}`}>{value}</span> : value}
              </TableCell>
            )
          })}
          <TableCell className="tableCell">
            <Button // this should be a dropdown of the various actions
              variant="contained"
              color="primary"
              size="small"
            // onClick={() => navigate(`/suppliers/${row.uuid}`)}
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      )
    });

  return (
    <div className="tile">
      <h1 className="title">{props.title}</h1>
      <div className="item">
        <div className="details">
          <h1 className="itemTitle">{props.itemTitle}</h1>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
              <TableHead className="table-header">
                {columnHeaderElements}
              </TableHead>
              <TableBody>
                {props.instances && RowElements}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.instances.length}
            rowsPerPage={currentRowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  )
}
