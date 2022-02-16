import React from "react";
import { formatNumber } from "../../services/formatNumber";
import style from "./customTooltip.module.scss";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className={style.tooltip}>
        <h4>
          {new Date(label).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </h4>
        <p>{formatNumber(payload[0].value, true)}</p>
      </div>
    );
  }
  return null;
};

export { CustomTooltip };
