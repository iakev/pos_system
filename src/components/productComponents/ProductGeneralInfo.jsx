import React from "react";
import InfoCard from "../infoCard/InfoCard";
import {
  generalInfoArr,
  generalInfoMappings,
  generalTitle
} from "../../pages/products/productConfig";

export default function ProductGeneralInfo(props) {
  return (
    <InfoCard
      title={generalTitle}
      name={props.name}
      infoArr={generalInfoArr}
      infoMappings={generalInfoMappings}
      instance={props.instance}
    />
  )
}