import React, { useState, useEffect } from "react";
import { fetchAllSuppliersForProduct } from "../../../services/api/products/fetchProducts";
import DisplayTable from "../../displayTable/DisplayTable";
import {
  logisticColumns,
  logisticsTitle,
  logisticsItemTitle
} from "../../../pages/singleProduct/productConfig";

export default function ProductSuppliers(props) {
  const [productSuppliers, setProductSuppliers] = useState([]);

  useEffect(() => {
    const getSuppliers = async () => {
      let suppliers;
      suppliers = await fetchAllSuppliersForProduct(props.context, props.uuid);
      setProductSuppliers(suppliers);
    };
    getSuppliers();
  }, [])
  return (
    <DisplayTable
      columns={logisticColumns}
      instances={productSuppliers}
      title={logisticsTitle}
      itemTitle={logisticsItemTitle}
    />
  )
}