import { useEffect, useState } from "react";
import "./suppliers.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { fetchSuppliers } from "../../services/api/suppliers/fetchSuppliers";
import { useAPI } from "../../services/api/useAPI";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const apiContext = useAPI();

  const navigate = useNavigate();

  useEffect(() => {
    const getSuppliers = async () => {
      const result = await fetchSuppliers(apiContext);
      setSuppliers(result);
    };
    getSuppliers();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {suppliers ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Product
              <Link to="/suppliers/new" className="link">
                Add New
              </Link>
            </div>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">Name</TableCell>
                    <TableCell className="tableCell">Address</TableCell>
                    <TableCell className="tableCell">Email Address</TableCell>
                    <TableCell className="tableCell">Phone Number</TableCell>
                    <TableCell className="tableCell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suppliers.map((row) => (
                    <TableRow key={row.uuid}>
                      <TableCell className="tableCell">{row.name}</TableCell>
                      <TableCell className="tableCell">
                        <div className="cellWrapper">{row.address}</div>
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.email_address}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.phone_number}
                      </TableCell>
                      <TableCell className="tableCell">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/suppliers/${row.uuid}`)}
                        >
                          View
                        </Button>
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

export default Suppliers;
