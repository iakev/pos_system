import React from "react";
import InfoCard from "../../infoCard/InfoCard";
import {
  supplierTitle,
  supplierInfoMappings,
  supplierInfoArr
} from "../../../pages/suppliers/supplierConfig";

export default function SupplierInfo(props) {
  return (
    <InfoCard
      title={supplierTitle}
      name={props.instance.name}
      infoArr={supplierInfoArr}
      infoMappings={supplierInfoMappings}
      instance={props.instance}
    />
  )
}