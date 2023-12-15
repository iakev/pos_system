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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../../services/api/useAPI";
import { fetchSingleStock, fetchSingleStockMovement } from "../../services/api/stocks/fetchStocks";
import { reduceToGetObjects } from "../../mappings";
import "./inventoryItem.scss";

const InventoryItem = () => {
  const [singleStock, setSingleStock] = useState({});
  const [stockMovement, setStockMovement] = useState([]);
  const { id } = useParams();
  const apiContext = useAPI();
  const [suppliersPage, setSuppliersPage] = useState(0);
  const [suppliersRowsPerPage, setSuppliersRowsPerPage] = useState(10);
  const [stockMovementPage, setStockMovementPage] = useState(0);
  const [stockMovementRowsPerPage, setStockMovementRowsPerPage] = useState(10);


  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const stockData = await fetchSingleStock(apiContext, id);
        const movementData = await fetchSingleStockMovement(apiContext, id);
        if (isMounted) {
          setSingleStock(stockData);
          setStockMovement(movementData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  // General stock information
  const stockInfoArr = [
    "Category",
    "Name",
    "Code",
    "Quantity",
    "Date Added",
    "Unit Cost",
    "Retail Price",
    "Wholesale Price",
    "Reorder level",
    "Reorder Quantity",
    "Latest Movement on",
    "Latest Movement",
    "Latest Movement Quantity",
    "Latest Movement Remarks"
  ];

  const stockInfoArrMappings = {
    "Category": "product.category.name",
    "Name": "product.name",
    "Code": "product.code",
    "Quantity": "stock_quantity",
    "Date Added": "created_at",
    "Unit Cost": "cost_per_unit",
    "Retail Price": "price_per_unit_retail",
    "Wholesale Price": "price_per_unit_wholesale",
    "Reorder level": "reorder_level",
    "Reorder Quantity": "reorder_quantity",
    "Latest Movement on": "updated_at",
    "Latest Movement": "latest_stock_movement_type",
    "Latest Movement Quantity": "latest_stock_movement_quantity",
    "Latest Movement Remarks": "latest_stock_movement_remarks"
  };

  const stockInfoElements = stockInfoArr.map((stockInfo) => {
    const itemKey = stockInfo.toLowerCase().replaceAll(' ', '_');
    const itemValue = reduceToGetObjects(stockInfoArrMappings, stockInfo, singleStock);
    return (
      <div className="detailItem" key={itemKey}>
        <span className="itemKey">{stockInfo}:</span>
        <span className="itemValue">{typeof itemValue === 'boolean' ? (itemValue ? "Yes" : "No") : itemValue}</span>
      </div>
    );
  });

  // Suppliers Table Section
  const supplierColumns = [
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
    { id: "email_address", label: "Email Address" },
    { id: "phone_number", label: "Phone Number" },
  ];

  const suppliers = singleStock?.product?.suppliers;
  const supplierHeaderElements = supplierColumns.map((supplierColumn) => {
    return (
      <TableCell
        key={`${supplierColumn.id}-${supplierColumn.label}`}
      >
        {supplierColumn.label}
      </TableCell>
    )
  });

  const supplierRowElements = suppliers?.slice(suppliersPage * suppliersRowsPerPage, suppliersPage * suppliersRowsPerPage + suppliersRowsPerPage)
    .map((supplier) => {
      return (
        <TableRow
          key={supplier.uuid}
        >
          {supplierColumns.map((supplierColumn) => {
            const value = supplier[supplierColumn.id];
            return (
              <TableCell
                key={`${supplier.uuid}-${supplierColumn.id}`}
              >
                {value}
              </TableCell>
            )
          })
          }
        </TableRow>
      )
    });

  const handleSuppliersChangePage = (event, newPage) => {
    setSuppliersPage(newPage);
  }

  const handleSuppliersChangeRowsPerPage = (event) => {
    setSuppliersRowsPerPage(+event.target.value);
    setSuppliersPage(0);
  }

  // StockMovements Table Section

  const stockMovementColumns = [
    { id: "movement_type", label: "Movement Type" },
    { id: "movement_quantity", label: "Movement Quantity" },
    { id: "remarks", label: "Movement Remarks" },
    { id: "previous_stock_quantity", label: "Quantity before Movement" },
    { id: "employee", label: "Employee Responsible" },
    { id: "product", label: "Product Name" }
  ];

  const stockMovementHeaderElements = stockMovementColumns.map((stockMovementColumn) => {
    return (
      <TableCell
        key={`${stockMovementColumn.id}-${stockMovementColumn.label}`}
      >
        {stockMovementColumn.label}
      </TableCell>
    )
  });

  const stockMovementRowElements = stockMovement.slice(stockMovementPage * stockMovementRowsPerPage, stockMovementPage * stockMovementRowsPerPage + stockMovementRowsPerPage)
    .map((stockMvnt) => {
      return (
        <TableRow
          key={stockMvnt.uuid}
        >
          {stockMovementColumns.map((stockMovementColumn) => {
            const value = stockMvnt[stockMovementColumn.id];
            return (
              <TableCell
                key={`${stockMvnt.uuid}-${stockMovementColumn.id}`}
              >
                {value}
              </TableCell>
            )
          })
          }
        </TableRow>
      )
    });

  const handleStockMovementPage = (event, newPage) => {
    setStockMovementPage(newPage);
  };

  const handleStockMovementRowsPerPage = (event) => {
    setStockMovementRowsPerPage(+event.target.value);
    setStockMovementPage(0);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {singleStock ? (
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Stock Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{singleStock?.product?.name}</h1>
                  {stockInfoElements}
                </div>
              </div>
            </div>
            <div className="left">
              <h1 className="title">Logistics and Supply Chain</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Suppliers Information</h1>
                  <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead className="table-header">
                        <TableRow>
                          {supplierHeaderElements}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {suppliers && supplierRowElements}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={suppliers?.length}
                    rowsPerPage={suppliersRowsPerPage}
                    page={suppliersPage}
                    onPageChange={handleSuppliersChangePage}
                    onRowsPerPageChange={handleSuppliersChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
            <div className="left">
              <h1 className="title">Stock Movement history</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Recent Stock Movement</h1>
                  <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead className="table-header">
                        <TableRow>
                          {stockMovementHeaderElements}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stockMovement && stockMovementRowElements}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={stockMovement.length}
                    rowsPerPage={stockMovementRowsPerPage}
                    page={stockMovementPage}
                    onPageChange={handleStockMovementPage}
                    onRowsPerPageChange={handleStockMovementRowsPerPage}
                  />
                </div>
              </div>
            </div >
          </div >
        ) : (
          <p>Loading...</p>
        )}
      </div >
    </div >
  )
};

export default InventoryItem;