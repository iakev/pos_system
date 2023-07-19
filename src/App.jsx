import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/singleProduct/SingleProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<List />} />
          <Route path="/users/:id" element={<Single />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
