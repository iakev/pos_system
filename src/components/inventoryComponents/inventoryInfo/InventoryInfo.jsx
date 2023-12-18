import React, { useState, useEffect } from "react";
import InfoCard from "../../infoCard/InfoCard";
import {
  stockTitle,
  stockInfoArr,
  stockInfoArrMappings
} from "../../../pages/inventoryItem/inventoryConfig";

export default function InventoryInfo(props) {
  return (
    <InfoCard
      title={stockTitle}
      name={props.name}
      infoArr={stockInfoArr}
      infoMappings={stockInfoArrMappings}
      instance={props.instance}
    />
  )
}