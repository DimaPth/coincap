import React from "react";
import { useGetAssetsQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import style from "./header.module.scss";

const Header = () => {
  const { data = {}, isSuccess, error } = useGetAssetsQuery(3);
  const result = data.data;
  return (
    <div className={style.wrap}>
      <div className={style.popular}>
        {error && error.error}
        {isSuccess &&
          result.map((item) => (
            <div key={item.id}>
              {item.name}: {formatNumber(item.priceUsd, true)}
            </div>
          ))}
      </div>
      <div>wallet</div>
    </div>
  );
};

export { Header };
