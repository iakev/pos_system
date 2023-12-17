import React from "react";
import InfoCard from "../../infoCard/InfoCard";
import {
    additionalInfoArr,
    additionalinfoMappings,
    aditionalTitle
} from "../../../pages/singleProduct/productConfig";

export default function ProductAdditionalInfo(props) {
    return (
        <InfoCard
            title={aditionalTitle}
            name={props.instance.name}
            infoArr={additionalInfoArr}
            infoMappings={additionalinfoMappings}
            instance={props.instance}
        />
    )
}