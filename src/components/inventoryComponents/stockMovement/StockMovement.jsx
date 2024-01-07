import React, { useState, useEffect } from "react";
import { fetchSingleStockMovement } from "../../../services/api/stocks/fetchStocks";
import DisplayTable from "../../displayTable/DisplayTable";
import {
  stockMovementColumns,
  stockMovementTitle,
  stockMovementItemTitle
} from "../../../pages/inventory/inventoryConfig";

export default function StockMovement(props) {
  const [stockMovement, setStockMovement] = useState([]);

  useEffect(() => {
    const getstockMovement = async () => {
      const stockMovData = await fetchSingleStockMovement(props.context, props.uuid);
      setStockMovement(stockMovData);
    };
    getstockMovement();
  }, [])

  return (
    <DisplayTable
      columns={stockMovementColumns}
      title={stockMovementTitle}
      itemTitle={stockMovementItemTitle}
      instances={stockMovement}
    />
  )
}