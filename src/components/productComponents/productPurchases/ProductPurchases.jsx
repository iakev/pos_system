import React, { useState, useEffect } from "react";
import DisplayTable from "../../displayTable/DisplayTable";
import { fetchPurchasesForProduct } from "../../../services/api/products/fetchProducts";
import {
  purchaseColumns,
  purchasesTitle,
  purchaseItemTitle
} from "../../../pages/singleProduct/productConfig";

export default function ProductPurchase(props) {
  const [productPurchases, setProductPurchases] = useState([]);

  useEffect(() => {
    const getProductPurchases = async () => {
      const purchases = await fetchPurchasesForProduct(props.context, props.uuid);
      setProductPurchases(purchases);
    };
    getProductPurchases();
  }, []);
  return (
    <DisplayTable
      columns={purchaseColumns}
      instances={productPurchases}
      title={purchasesTitle}
      itemTitle={purchaseItemTitle}
    />
  )
}