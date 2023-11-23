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
import {
  fetchSingleProduct,
  fetchAllSuppliersForProduct,
  fetchStockForProduct,
  fetchSalesForProduct,
  fetchPurchasesForProduct
} from "../../services/api/products/fetchProducts";
import { useAPI } from "../../services/api/useAPI";
// import { paymentMethodMapping, salesStatusMapping } from "../../mappings";
import "./singleProduct.scss";


const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [productSuppliers, setProductSuppliers] = useState([]);
  const [stock, setStock] = useState({});
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [logisticPage, setLogisticPage] = useState(0);
  const [logisticsRowsPerPage, setLogisticsRowsPerPage] = useState(10);
  const [salesPage, setSalesPage] = useState(0);
  const [salesRowsPerPage, setSalesRowsPerPage] = useState(10);
  const [purchasePage, setPurchasesPage] = useState(0);
  const [purchaseRowsPage, setPurchasesRowsPerPage] = useState(10);
  const { id } = useParams();
  const apiContext = useAPI();


  useEffect(() => {
    const getProduct = async () => {
      let newProduct;
      try {
        newProduct = await fetchSingleProduct(apiContext, id);
      } catch (error) {
        /** Errors should be displayed to the user, e.g. using toast messages. */
        // err.messages.map((msg) => console.err(msg));
        console.log("Error fetching single product:", error);
        return;
      }
      setProduct(newProduct);
    };
    const getSuppliers = async () => {
      let suppliers;
      try {
        suppliers = await fetchAllSuppliersForProduct(apiContext, id);
      } catch (error) {
        console.log("Error fetching Suppliers:", error);
        return;
      }
      setProductSuppliers(suppliers);
    };
    const getStock = async () => {
      let stock;
      try {
        stock = await fetchStockForProduct(apiContext, id);
      } catch (error) {
        console.log("Error fetching Stock:", error);
        return;
      }
      setStock(stock);
    };
    const getSales = async () => {
      let sales;
      try {
        sales = await fetchSalesForProduct(apiContext, id);
      } catch (error) {
        console.log("Error fetching Sales for product:", error);
        return;
      }
      setSales(sales);
    };
    const getPurchases = async () => {
      let purchases;
      try {
        purchases = await fetchPurchasesForProduct(apiContext, id);
      } catch (error) {
        console.log("Error fetching Purchases for product:", error);
      }
      setPurchases(purchases);
    }
    getProduct();
    getSuppliers();
    getStock();
    getSales();
    getPurchases();
  }, []);

  const {
    name = 'No Name',
  } = product;

  // General information section info
  const generalInfoArr = [
    "Description",
    "Active for sale",
    "Category",
    // "Packaging unit",
    // "Limited",
    // "Tax type",
    "Unit"
  ];

  const infoMappings = {
    "Description": "description",
    "Active for sale": "active_for_sale",
    "Category": "category.name",
    // "Packaging unit": "packaging_unit",
    // "Limited": "limited",
    // "Tax type": "tax_type",
    "Unit": "unit"
  };

  const generalInfoElements = generalInfoArr.map((info) => {
    const itemKey = info.toLowerCase().replaceAll(' ', '_');
    const itemValue = infoMappings[info]
      .split('.')
      .reduce((obj, key) => (obj || {})[key], product) || `No ${info}`;

    return (
      <div className="detailItem" key={itemKey}>
        <span className="itemKey">{info}:</span>
        <span className="itemValue">{typeof itemValue === 'boolean' ? (itemValue ? "Yes" : "No") : itemValue}</span>
      </div>
    );
  });

  // Logiistics Table information
  const logisticColumns = [
    { id: 'name', label: 'Name' },
    { id: 'address', label: 'Address' },
    { id: 'email_address', label: 'Email Address' },
    { id: 'phone_number', label: 'Phone Number' },
    { id: 'lead_time', label: 'Lead Time (Business Days)' },
    { id: 'reorder_level', label: 'Reorder Level' }
  ];

  const handleLogisticsChangePage = (event, newPage) => {
    setLogisticPage(newPage);
  };

  const handleLogisticsChangeRowsPerPage = (event) => {
    setLogisticsRowsPerPage(+event.target.value);
    setLogisticPage(0);
  };

  const logisticColumnHeaderElements = logisticColumns.map((column) => {
    return (
      <TableCell
        key={column.id}
      >
        {column.label}
      </TableCell>
    )
  });

  const logisticRowElements = productSuppliers.slice(logisticPage * logisticsRowsPerPage, logisticPage * logisticsRowsPerPage + logisticsRowsPerPage)
    .map((productSupplier) => {
      return (
        <TableRow
          key={productSupplier.uuid}
        >
          {logisticColumns.map((logisticColumn) => {
            // mixing stock and productSupplier here might need to handle it better
            // in the future
            const value = productSupplier[logisticColumn.id] ?
              productSupplier[logisticColumn.id] : stock[logisticColumn.id];
            return (
              <TableCell
                key={`${productSupplier.uuid}-${logisticColumn.id}`}
              >
                {value}
              </TableCell>
            )
          })}
        </TableRow>
      )
    });


  // Inventory information section
  const inventoryInfoArr = [
    "Avaialable Units",
    "Price Per Unit WholeSale",
    "Price Per Unit Retail",
    "Reorder Quantity",
    "Unit Cost",
    "Total Cost"
  ];

  const inventoryInfoArrMappings = {
    "Avaialable Units": "stock_quantity",
    "Price Per Unit WholeSale": "price_per_unit_wholesale",
    "Price Per Unit Retail": "price_per_unit_retail",
    "Reorder Quantity": "reorder_quantity",
    "Unit Cost": "cost_per_unit"
  };

  const getTotalCost = () => {
    if (Object.keys(stock).length === 0) {
      return `No Stock Information Available`;
    }
    return stock.cost_per_unit * stock.stock_quantity;
  };

  const inventoryInfoElements = inventoryInfoArr.map((info) => {
    const itemKey = info.toLowerCase().replaceAll(' ', '_');
    const itemValue =
      info === "Total Cost" ? getTotalCost() : inventoryInfoArrMappings[info]
        .split('.')
        .reduce((obj, key) => (obj || {})[key], stock) || `No ${info}`;
    return (
      <div className="detailItem" key={itemKey}>
        <span className="itemKey">{info}:</span>
        <span className="itemValue">{itemValue}</span>
      </div>
    );
  });

  // Sales transaction Table section
  const salesColumns = [
    { id: "created_at", label: "Date" },
    { id: "customer", label: "Customer Name" },
    { id: "cashier", label: "Sales Person" },
    { id: "payment", label: "Payment Mode" },
    { id: "sale_status", label: "Sale Status" },
    { id: "quantity_sold", label: "Quantity Sold" },
    { id: "price_per_unit", label: "Sold at" },
    { id: "price", label: "Total Sold Amount" }
  ];

  const salesHeaderElements = salesColumns.map((saleColumn) => {
    return (
      <TableCell
        key={saleColumn.id}
      >
        {saleColumn.label}
      </TableCell>
    )
  });

  const handleSalesChangePage = (event, newPage) => {
    setSalesPage(newPage);
  };

  const handleSalesChangeRowsPerPage = (event) => {
    setSalesRowsPerPage(+event.target.value);
    setSalesPage(0);
  };

  const salesRowElements = sales.slice(salesPage * salesRowsPerPage, salesPage * salesRowsPerPage + salesRowsPerPage)
    .map((sale) => {
      const {
        sale_uuid,
        customer,
        cashier,
        payment,
        created_at,
        ...otherSaleDetails
      } = sale;
      return (
        <TableRow
          key={sale_uuid}
        >
          {salesColumns.map((saleColumn) => {
            let value;
            switch (saleColumn.id) {
              case "customer":
                value = customer?.name || "N/A";
                break;
              case "cashier":
                const firstName = cashier?.user?.first_name || "N/A";
                const lastName = cashier?.user?.last_name || "N/A";
                value = `${firstName} ${lastName}`;
                break;
              case "payment":
                value = payment?.payment_method || "N/A";
                break;
              case "sale_status":
                value = sale?.sale_status || "N/A";
                break;
              case "created_at":
                const dateObj = new Date(created_at);
                value = `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}
                -${dateObj.getFullYear()}`;
                break;
              default:
                value = otherSaleDetails[saleColumn.id] || "N/A";
                break;
            }
            return (
              <TableCell
                key={`${sale_uuid}-${saleColumn.id}`}
                className={value == sale.sale_status ? `status ${sale.sale_status}` : ""}
              >
                {value}
              </TableCell>)
          })}
        </TableRow>
      )
    });

  // Purchases Table Section
  // TODO: Have another Table for Purchase History Sections
  const purchaseColumns = [
    { id: "date_of_purchase", label: "Date of Purchase" },
    { id: "supplier", label: "Supplier" },
    { id: "employee", label: "Employee Name" },
    { id: "quantity", label: "Quantity Purchased" },
    { id: "unit_price", label: "Unit Price" },
    { id: "total_cost", label: "Total  Cost" },
    { id: "discount_applied", label: "Purchase Discount" },
  ];

  const purchaseHeaderElements = purchaseColumns.map((purchaseColumn) => {
    return (
      <TableCell
        key={purchaseColumn.id}
      >
        {purchaseColumn.label}
      </TableCell>
    )
  });

  const handlePurchaseChangePage = (event, newPage) => {
    setPurchasesPage(newPage);
  };

  const handlePurchaseChangeRowsPerPage = (event) => {
    setPurchasesRowsPerPage(+event.target.value);
    setPurchasesPage(0);
  };

  const purchasesRowElements = purchases.slice(purchasePage * purchaseRowsPage, purchasePage * purchaseRowsPage + purchaseRowsPage)
    .map((purchase) => {
      const {
        purchase_uuid,
        employee,
        date_of_purchase,
        ...otherPurchaseDetails
      } = purchase;
      return (
        <TableRow
          key={purchase_uuid}
        >
          {purchaseColumns.map((purchaseColumn) => {
            let value;
            switch (purchaseColumn.id) {
              case "employee":
                const firstName = employee?.user?.first_name || "N/A";
                const lastName = employee?.user?.last_name || "N/A";
                value = `${firstName} ${lastName}`;
                break;
              case "date_of_purchase":
                const dateObj = new Date(date_of_purchase);
                value = `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}
                -${dateObj.getFullYear()}`;
                break;
              default:
                value = otherPurchaseDetails[purchaseColumn.id];
                break;
            }
            return (
              <TableCell
                key={`${purchase_uuid}-${purchaseColumn.id}`}
              >
                {value}
              </TableCell>
            )
          })}
        </TableRow>
      )
    });

  // Additional information section info
  const AdditionalInfoArr = [
    "Packaging unit",
    "Limited",
    "Tax Information",
    "Product Type"
  ];

  const AdditionalinfoMappings = {
    "Packaging unit": "packaging_unit",
    "Limited": "limited",
    "Tax Information": "tax_type",
    "Product Type": "product_type"
  };

  const AdditionalInfoElements = AdditionalInfoArr.map((info) => {
    const itemKey = info.toLowerCase().replaceAll(' ', '_');
    const rawItemValue = AdditionalinfoMappings[info]
      .split('.')
      .reduce((obj, key) => (obj || {})[key], product);
    console.log("rawItemvalue is :", rawItemValue);
    const itemValue = rawItemValue === undefined ? `No ${info}` : rawItemValue;
    return (
      <div className="detailItem" key={itemKey}>
        <span className="itemKey">{info}:</span>
        <span className="itemValue">{typeof itemValue === 'boolean' ? (itemValue ? "Yes" : "No") : itemValue}</span>
      </div>
    );
  });


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {product ? (
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">General Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{name}</h1>
                  {generalInfoElements}
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
                          {logisticColumnHeaderElements}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productSuppliers && logisticRowElements}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={productSuppliers.length}
                    rowsPerPage={logisticsRowsPerPage}
                    page={logisticPage}
                    onPageChange={handleLogisticsChangePage}
                    onRowsPerPageChange={handleLogisticsChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Inventory Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{name}</h1>
                  {inventoryInfoElements}
                </div>
              </div>
            </div>
            <div className="left">
              <h1 className="title">Sales history & Transactions</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Recent Sales</h1>
                  <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead className="table-header">
                        <TableRow>
                          {salesHeaderElements}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sales && salesRowElements}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={sales.length}
                    rowsPerPage={salesRowsPerPage}
                    page={salesPage}
                    onPageChange={handleSalesChangePage}
                    onRowsPerPageChange={handleSalesChangeRowsPerPage}
                  />
                </div>
              </div>
            </div >
            <div className="left">
              <h1 className="title">Purchases history & Transactions</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Recent Purchases</h1>
                  <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead className="table-header">
                        <TableRow>
                          {purchaseHeaderElements}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {purchases && purchasesRowElements}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={purchases.length}
                    rowsPerPage={purchaseRowsPage}
                    page={purchasePage}
                    onPageChange={handlePurchaseChangePage}
                    onRowsPerPageChange={handlePurchaseChangeRowsPerPage}
                  />
                </div>
              </div>
            </div >
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Additional Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{name}</h1>
                  {AdditionalInfoElements}
                </div>
              </div>
            </div>
          </div >
        ) : (
          <p>Loading...</p>
        )}
      </div >
    </div >
  );
};

export default SingleProduct;
