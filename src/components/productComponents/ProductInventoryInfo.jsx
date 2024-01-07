import React, { useState, useEffect } from "react";
import { fetchStockForProduct } from "../../services/api/products/fetchProducts";
import InfoCard from "../infoCard/InfoCard";
import {
  inventoryTitle,
  inventoryInfoArr,
  inventoryInfoMappings
} from "../../pages/products/productConfig";

export default function ProductInventoryInfo(props) {
  const [stock, setStock] = useState({});

  useEffect(() => {
    const getproductStock = async () => {
      const stockProduct = await fetchStockForProduct(props.context, props.uuid);
      setStock(stockProduct);
    };
    getproductStock();
  }, [])

  return (
    <InfoCard
      title={inventoryTitle}
      name={stock.product_name}
      infoArr={inventoryInfoArr}
      infoMappings={inventoryInfoMappings}
      instance={stock}
    />
  )
}