import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../services/api/products/fetchProducts";
import { useAPI } from "../../services/api/useAPI";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProductGeneralInfo from "../../components/productComponents/ProductGeneralInfo";
import ProductInventoryInfo from "../../components/productComponents/ProductInventoryInfo";
import ProductAdditionalInfo from "../../components/productComponents/ProductAdditionalInfo";
import ProductSuppliers from "../../components/productComponents/ProductSuppliers";
import ProductSales from "../../components/productComponents/ProductSales";
import ProductPurchase from "../../components/productComponents/ProductPurchases";
import ContentGrid from "../../components/pageContent/ContentGrid";
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

  const singleProductPageContent = {
    isLoading: Object.keys(product).length === 0,
    sections: [
      {
        component: ProductGeneralInfo,
        componentProps: {
          name: product?.name,
          instance: product,
        }
      },
      {
        component: ProductSuppliers,
        componentProps: {
          uuid: id,
          context: apiContext,
        }
      },
      {
        component: ProductInventoryInfo,
        componentProps: {
          uuid: id,
          context: apiContext,
        }
      },
      {
        component: ProductSales,
        componentProps: {
          uuid: id,
          context: apiContext,
        }
      },
      {
        component: ProductPurchase,
        componentProps: {
          uuid: id,
          context: apiContext,
        }
      },
      {
        component: ProductAdditionalInfo,
        componentProps: {
          name: product?.name,
          instance: product,
        }
      },
    ]
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ContentGrid content={singleProductPageContent} />
      </div >
    </div >
  );
};

export default SingleProduct;
