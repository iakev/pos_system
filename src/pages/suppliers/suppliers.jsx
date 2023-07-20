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
import { TOKEN } from "../../../token";

// fetch(url, {
//   method: "GET",
//   headers: headers,
// })
//   .then((response) => response.json())
//   .then((json) => {
//     console.log("parsed json", json); // access json.body here
//     setProducts(json);
//     console.log({ products });
//   });

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://127.0.0.1:8000/api/v1/suppliers/";
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();

      setSuppliers(result);
    };
    fetchProducts();
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
                    <TableCell className="tableCell">Products</TableCell>
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
                        {row.products.length ? (
                          <div className="cellWrapper">Products</div>
                        ) : (
                          <div className="cellWrapper">None</div>
                        )}
                      </TableCell>
                      <TableCell className="tableCell">
                        <button
                          onClick={() => navigate(`/suppliers/${row.uuid}`)}
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

export default Suppliers;
