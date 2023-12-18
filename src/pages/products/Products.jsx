import { useEffect, useState } from "react";
import "./products.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useAPI } from "../../services/api/useAPI";
import { fetchProducts } from "../../services/api/products/fetchProducts";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const apiContext = useAPI();
  const navigate = useNavigate();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const getProducts = async () => {
      let newProducts;
      try {
        newProducts = await fetchProducts(apiContext);
      } catch (error) {
        /** Errors should be displayed to the user, e.g. using toast messages. */
        // err.messages.map((msg) => console.err(msg));
        console.log("Error fetching products:", error);
        return;
      }
      setProducts(newProducts);
    };
    getProducts();
  }, []);

  const columns = [
    { id: 'category', label: 'Category' },
    { id: 'name', label: 'Name' },
    { id: 'code', label: 'Code' },
    { id: 'description', label: 'Description' },
    { id: 'limited', label: 'Limited' },
    { id: 'active_for_sale', label: 'Active for sale' },
    { id: 'packaging_unit', label: 'Packaging Unit' },
    { id: 'product_type', label: 'Product Type' },
    { id: 'unit', label: 'Units' }
  ];


  const columnHeaderElements = columns.map((column) => {
    return (
      <TableCell
        key={column.id}
        className="header-cell"
      >
        {column.label}
      </TableCell>)
  });

  const productRowsElements = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((productRow) => {
      return (
        <TableRow
          key={productRow.uuid}
          onClick={() => navigate(`/products/${productRow.uuid}`)}
          className="rowClickable"
        >
          {columns.map((column) => {
            const upperValue = productRow[column.id];
            const value = typeof upperValue === 'object' ? upperValue.name : upperValue;
            return (
              <TableCell key={`${productRow.uuid}-${column.id}`} className="tableCell">
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
              </TableCell>
            )
          })
          }
        </TableRow>
      )
    });

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {products.length > 0 ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Product
              <Link to="/products/new" className="link">
                Add New
              </Link>
            </div>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                <TableHead className="table-header">
                  <TableRow>
                    {columnHeaderElements}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productRowsElements}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
