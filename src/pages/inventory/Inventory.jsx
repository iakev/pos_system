import { useEffect, useState } from "react";
import "./inventory.scss";
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
import { fetchStocks } from "../../services/api/stocks/fetchStocks";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [inventoryPage, setInventoryPage] = useState(0);
  const [invetoryRowsPerPage, setInventoryRowsPerPage] = useState(10);
  const apiContext = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch all inventory information
    const getInventory = async () => {
      let inventory;
      try {
        inventory = await fetchStocks(apiContext);
      } catch (error) {
        /** Errors should be displayed to the user, e.g. using toast messages. */
        // err.messages.map((msg) => console.err(msg));
        console.log("Error fetching inventory:", error);
        return;
      }
      setInventory(inventory);
    }
    getInventory();
  }, []);

  const handleInventoryChangePage = (event, newPage) => {
    setInventoryPage(newPage);
  };

  const handleInventoryChangeRowsPerPage = (event) => {
    setInventoryRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: 'category', label: 'Category' },
    { id: 'name', label: 'Name' },
    { id: 'code', label: 'Code' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'stock_quantity', label: 'Quantity' },
    { id: 'cost_per_unit', label: 'Unit Cost' },
    { id: 'price_per_unit_retail', label: 'Retail Price' },
    { id: 'price_per_unit_wholesale', label: 'Wholesale Price' },
    { id: 'reorder_level', label: 'Reorder level' },
    { id: 'reorder_quantity', label: 'Reorder Quantity' },
    { id: 'latest_stock_movement_type', label: 'Latest Movement Type' },
    { id: 'latest_stock_movement_quantity', label: 'Latest Movement Quantity' },
    { id: 'latest_stock_movement_remarks', label: 'Latest Movement Remarks' }
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


  const inventoryRowElements = inventory.slice(inventoryPage * invetoryRowsPerPage, inventoryPage * invetoryRowsPerPage + invetoryRowsPerPage)
    .map((inventoryRow) => {
      return (
        <TableRow
          key={inventoryRow.uuid}
          onClick={() => navigate(`/inventory/${inventoryRow.uuid}`)}
          className="rowClickable"
        >
          {columns.map((column) => {
            let value;
            switch (column.id) {
              case "category":
                value = inventoryRow.product.category.name;
                break;
              case "name":
                value = inventoryRow.product.name;
                break;
              case "code":
                value = inventoryRow.product.code;
                break;
              case "suppliers":
                value = inventoryRow.product.suppliers.length > 0 ? inventoryRow.product.suppliers[0].name : "";
                break;
              default:
                value = inventoryRow[column.id];
                break;
            }
            return (
              <TableCell
                key={`${inventoryRow.uuid}-${column.id}`}
                className="tableCell"
              >
                {value}
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
        {inventory ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add To Stock
              <Link to="/stocks/new" className="link">
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
                  {inventory && inventoryRowElements}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={inventory.length}
              rowsPerPage={invetoryRowsPerPage}
              page={inventoryPage}
              onPageChange={handleInventoryChangePage}
              onRowsPerPageChange={handleInventoryChangeRowsPerPage}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
};

export default Inventory;