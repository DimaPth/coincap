import React from "react";
import { useParams } from "react-router-dom";
import { useGetCurrencyQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import style from "./currency.module.scss";

const Currency = () => {
  const { id } = useParams();
  const { data = [], isLoading, isError } = useGetCurrencyQuery(id);
  const result = data.data;

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something gone wrong</h1>;

  return (
    <div className={style.wrap}>
      <header>
        <div>
          <h2>{result.rank}</h2>
          <div>RANK</div>
        </div>
        <div>
          <h1>
            {result.name}({result.symbol})
          </h1>
          <h2>{formatNumber(result.priceUsd, true)}</h2>
        </div>
        <div>
          <div>Market Cap</div>
          <h3>{"$" + formatNumber(result.marketCapUsd)}</h3>
        </div>
        <div>
          <div>Volume(24Hr)</div>
          <h3>{"$" + formatNumber(result.volumeUsd24Hr)}</h3>
        </div>
        <div>
          <div>Supply</div>
          <h3>{formatNumber(result.supply)}</h3>
        </div>
      </header>
    </div>
  );
};

export { Currency };
