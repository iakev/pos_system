import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIProvider from "./services/api/APIProvider";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs, supplierInputs } from "./formSource";
import Products from "./pages/products/Products";
import Inventory from "./pages/inventory/Inventory";
import InventoryItem from "./pages/inventoryItem/InventoryItem";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import SingleEmployee from "./pages/singleEmployee/SingleEmployee";
import Business from "./pages/business/Business";
import Suppliers from "./pages/suppliers/suppliers";
import SingleSupplier from "./pages/suppliers/SingleSupplier";

function App() {
  return (
    <div>
      <APIProvider>
        <Router>
          <Routes>
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
          </Routes>
        </Router>
      </APIProvider>
    </div>
  );
}

export default App;
