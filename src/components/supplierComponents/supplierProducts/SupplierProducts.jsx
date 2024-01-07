import React, { useEffect, useState } from "react";
import DisplayTable from "../../displayTable/DisplayTable";
import { fetchAllProductsForSupplier } from "../../../services/api/suppliers/fetchSuppliers";
import {
  supplierProductItemTitle,
  supplierProductsTitle,
  supplierProductsColumn,
} from "../../../pages/suppliers/supplierConfig";

export default function SupplierProducts(props) {
  const [supplierProducts, setSupplierProducts] = useState([]);

  useEffect(() => {
    const getSupplierProducts = async () => {
      const products = await fetchAllProductsForSupplier(props.context, props.uuid)
      setSupplierProducts(products);
    };
    getSupplierProducts();
  }, []);
  return (
    <DisplayTable
      columns={supplierProductsColumn}
      instances={supplierProducts}
      title={supplierProductsTitle}
      itemTitle={supplierProductItemTitle}
    />
  )
}