import { useEffect, useState } from "react";
import "./products.scss";
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

const Products = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://52.6.84.250/api/v1/products/";
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();

      setProducts(result);
    };
    fetchProducts();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {products ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Product
              <Link to="/products/new" className="link">
                Add New
              </Link>
            </div>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">Category</TableCell>
                    <TableCell className="tableCell">Name</TableCell>
                    <TableCell className="tableCell">Description</TableCell>
                    <TableCell className="tableCell">Limited</TableCell>
                    <TableCell className="tableCell">Active for sale</TableCell>
                    <TableCell className="tableCell">Packaging Unit</TableCell>
                    <TableCell className="tableCell">Product Type</TableCell>
                    <TableCell className="tablecell">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.map((row) => (
                    <TableRow key={row.uuid}>
                      <TableCell className="tableCell">
                        {row.category}
                      </TableCell>
                      <TableCell className="tableCell">
                        <div className="cellWrapper">
                          {/* <img src={row.img} alt="" className="image" /> */}
                          {row.name}
                        </div>
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.description}
                      </TableCell>
                      <TableCell className="tableCell">{row.limited}</TableCell>
                      <TableCell className="tableCell">
                        {row.active_for_sale}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.packaging_unit}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.product_type}
                      </TableCell>
                      <TableCell className="tableCell">
                        <button
                          onClick={() => navigate(`/products/${row.uuid}`)}
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

export default Products;
