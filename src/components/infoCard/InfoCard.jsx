import React from "react";
import "./infoCard.scss"

export default function InfoCard(props) {
  const getTotalCost = () => {
    if (Object.keys(props.instance).length === 0) {
      return `No Stock Information Available`;
    }
    return props.instance?.cost_per_unit * props.instance?.stock_quantity;
  };
  const infoElements = props.infoArr.map((info) => {
    const itemKey = info.toLowerCase().replaceAll(' ', '_');
    const rawItemValue =
      info === "Total Cost" ? getTotalCost() : props.infoMappings[info]
        .split('.')
        .reduce((obj, key) => (obj || {})[key], props.instance);
    const itemValue = rawItemValue === undefined ? `No ${info}` : rawItemValue;
    return (
      <div className="detailItem" key={itemKey}>
        <span className="itemKey">{info}:</span>
        <span className="itemValue">{typeof itemValue === 'boolean' ? (itemValue ? "Yes" : "No") : itemValue}</span>
      </div>
    );
  });

  return (
    <div className="tile">
      <h1 className="title">{props.title}</h1>
      <div className="item">
        <div className="details">
          <h1 className="itemTitle">{props.name}</h1>
          {infoElements}
        </div>
      </div>
    </div>
  )
}
