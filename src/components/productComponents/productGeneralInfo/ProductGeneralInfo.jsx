import React from "react";
import InfoCard from "../../infoCard/InfoCard";
import {
  generalInfoArr,
  generalInfoMappings,
  generalTitle
} from "../../../pages/singleProduct/productConfig";

export default function ProductGeneralInfo(props) {
  return (
    <InfoCard
      title={generalTitle}
      name={props.instance.name}
      infoArr={generalInfoArr}
      infoMappings={generalInfoMappings}
      instance={props.instance}
    />
  )
}