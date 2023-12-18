import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../services/api/products/fetchProducts";
import { useAPI } from "../../services/api/useAPI";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProductGeneralInfo from "../../components/productComponents/productGeneralInfo/ProductGeneralInfo";
import ProductInventoryInfo from "../../components/productComponents/productInventoryInfo/ProductInventoryInfo";
import ProductAdditionalInfo from "../../components/productComponents/productAdditionalInfo/ProductAdditionalInfo";
import ProductSuppliers from "../../components/productComponents/productSuppliers/ProductSuppliers";
import ProductSales from "../../components/productComponents/productSales/ProductSales";
import ProductPurchase from "../../components/productComponents/productPurchases/ProductPurchases";
import "./singleProduct.scss";


const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const apiContext = useAPI();

  useEffect(() => {
    const getProduct = async () => {
      let singleProduct;
      try {
        singleProduct = await fetchSingleProduct(apiContext, id);
      } catch (error) {
        /** Errors should be displayed to the user, e.g. using toast messages. */
        // err.messages.map((msg) => console.err(msg));
        console.log("Error fetching single product:", error);
        return;
      }
      setProduct(singleProduct);
    };
    getProduct();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {product ? (
          <div className="page">
            <ProductGeneralInfo
              uuid={id}
              context={apiContext}
              instance={product}
            />
            <ProductSuppliers
              uuid={id}
              context={apiContext}
            />
            <ProductInventoryInfo
              uuid={id}
              context={apiContext}
            />
            <ProductSales
              uuid={id}
              context={apiContext}
            />
            <ProductPurchase
              uuid={id}
              context={apiContext}
            />
            <ProductAdditionalInfo
              uuid={id}
              context={apiContext}
              instance={product}
            />
          </div >
        ) : (
          <p>Loading...</p>
        )}
      </div >
    </div >
  );
};

export default SingleProduct;
