import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { TOKEN } from "../../../../token";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, Link } from "react-router-dom";

const List = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const url = "http://52.6.84.250/api/v1/employees";
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();

      setEmployees(result);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {employees ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Employee
              <Link to="/employees/new" className="link">
                Add New
              </Link>
            </div>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">Name</TableCell>
                    <TableCell className="tableCell">Phone NUmber</TableCell>
                    <TableCell className="tableCell">Address</TableCell>
                    <TableCell className="tableCell">Department</TableCell>
                    <TableCell className="tablecell">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((row) => (
                    <TableRow key={row.uuid}>
                      <TableCell className="tableCell">
                        <span>{row.user.first_name}</span>{" "}
                        <span>{row.user.last_name}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.phone_number}
                      </TableCell>
                      <TableCell className="tableCell">{row.address}</TableCell>
                      <TableCell className="tableCell">
                        {row.department}
                      </TableCell>
                      <TableCell className="tableCell">
                        <button
                          onClick={() => navigate(`/employees/${row.uuid}`)}
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default List;
