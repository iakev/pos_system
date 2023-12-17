import React, { useState, useEffect } from "react";
import DisplayTable from "../../displayTable/DisplayTable";
import { fetchSalesForProduct } from "../../../services/api/products/fetchProducts";
import {
  salesColumns,
  salesTitle,
  salesItemTitle
} from "../../../pages/singleProduct/productConfig";

export default function ProductSales(props) {
  const [productSales, setProductSales] = useState([]);
  const status = {
    present: true,
    name: "status"
  };
  useEffect(() => {
    const getProductSales = async () => {
      const sales = await fetchSalesForProduct(props.context, props.uuid);
      setProductSales(sales);
    };
    getProductSales();
  }, [])
  return (
    <DisplayTable
      columns={salesColumns}
      instances={productSales}
      title={salesTitle}
      itemTitle={salesItemTitle}
      styleClass={status}
    />
  )
}