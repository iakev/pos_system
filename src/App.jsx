import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import APIProvider from "./services/api/APIProvider";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs, supplierInputs } from "./formSource";
import Products from "./pages/products/Products";
import Inventory from "./pages/inventory/Inventory";
import InventoryItem from "./pages/inventory/InventoryItem";
import SingleProduct from "./pages/products/SingleProduct";
import SingleEmployee from "./pages/singleEmployee/SingleEmployee";
import Business from "./pages/business/Business";
import Suppliers from "./pages/suppliers/Suppliers";
import SingleSupplier from "./pages/suppliers/SingleSupplier";
import Sales from "./pages/sales/Sales";
import { useThemeContext } from "./theme/ThemeContextProvider";
import "./App.css";
import 'react-toastify/dist/ReactToastify.min.css';
import Login from "./pages/login/Login";

function App() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <APIProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<List />} />
            <Route path="/employees/:id" element={<SingleEmployee />} />
            <Route
              path="/employees/new"
              element={<New inputs={userInputs} title="Add New Employee" />}
            />
            <Route
              path="users/new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route
              path="products/new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
            <Route path="/business" element={<Business />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/:id" element={<SingleSupplier />} />
            <Route
              path="/suppliers/new"
              element={<New inputs={supplierInputs} title="Add New Supplier" />}
            />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<InventoryItem />} />
            {/* <Route
              path="/inventory/new"
              element={<New inputs={inventoryInputs} title="Add New Inventory item" />}
            /> */}
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </Router>
      </APIProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
