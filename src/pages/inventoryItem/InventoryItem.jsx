import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../../services/api/useAPI";
import { fetchSingleStock } from "../../services/api/stocks/fetchStocks";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProductSuppliers from "../../components/productComponents/productSuppliers/ProductSuppliers";
import InventoryInfo from "../../components/inventoryComponents/inventoryInfo/InventoryInfo";
import StockMovement from "../../components/inventoryComponents/stockMovement/StockMovement";
import ProductPurchase from "../../components/productComponents/productPurchases/ProductPurchases";
import "./inventoryItem.scss";

const InventoryItem = () => {
  const [singleStock, setSingleStock] = useState({});
  const { id } = useParams();
  const apiContext = useAPI();

  useEffect(() => {
    const getStock = async () => {
      const stockData = await fetchSingleStock(apiContext, id);
      setSingleStock(stockData);
    };
    getStock();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {Object.keys(singleStock).length > 0 ? (
          <div className="page">
            < InventoryInfo
              name={singleStock.product?.name}
              instance={singleStock}
            />
            <ProductSuppliers
              uuid={singleStock.product?.uuid}
              context={apiContext}
            />
            <StockMovement
              uuid={id}
              context={apiContext}
            />
            <ProductPurchase
              uuid={singleStock.product?.uuid}
              context={apiContext}
            />
          </div >
        ) : (
          <p>Loading...</p>
        )}
      </div >
    </div >
  )
};

export default InventoryItem;