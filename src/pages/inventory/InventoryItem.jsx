import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../../services/api/useAPI";
import { fetchSingleStock } from "../../services/api/stocks/fetchStocks";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ContentGrid from "../../components/pageContent/ContentGrid";
import ProductSuppliers from "../../components/productComponents/ProductSuppliers";
import InventoryInfo from "../../components/inventoryComponents/inventoryInfo/InventoryInfo";
import StockMovement from "../../components/inventoryComponents/stockMovement/StockMovement";
import ProductPurchase from "../../components/productComponents/ProductPurchases";
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

  const inventoryItemPageContent = {
    isLoading: Object.keys(singleStock).length === 0,
    sections: [
      {
        component: InventoryInfo,
        componentProps: {
          name: singleStock.product?.name,
          instance: singleStock,
        }
      },
      {
        component: ProductSuppliers,
        componentProps: {
          uuid: singleStock.product?.uuid,
          context: apiContext,
        }
      },
      {
        component: StockMovement,
        componentProps: {
          uuid: id,
          context: apiContext,
        }
      },
      {
        component: ProductPurchase,
        componentProps: {
          uuid: singleStock.product?.uuid,
          context: apiContext,
        }
      },

    ],
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ContentGrid content={inventoryItemPageContent} />
      </div >
    </div >
  )
};

export default InventoryItem;