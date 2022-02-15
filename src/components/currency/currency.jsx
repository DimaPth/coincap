import React from "react";
import { useParams } from "react-router-dom";
import { useGetCurrencyQuery } from "../../redux";
import { formateNumber } from "../../services/formateNumber";
import style from "./currency.module.scss";

const Currency = () => {
  const { id } = useParams();
  const { data = [], isLoading, isError } = useGetCurrencyQuery(id);
  const result = data.data;

  console.log(result);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something gone wrong</h1>;

  return (
    <div className={style.wrap}>
      <header>
        <div>
          <div>{result.rank}</div>
          <div>Rank</div>
        </div>
        <div>
          <div>
            {result.name}({result.symbol})
          </div>
          <div>{"$" + formateNumber(result.priceUsd)}</div>
        </div>
        <div>
          <div>Market Cap</div>
          <div>{"$" + formateNumber(result.marketCapUsd)}</div>
        </div>
        <div>
          <div>Volume(24Hr)</div>
          <div>{"$" + formateNumber(result.volumeUsd24Hr)}</div>
        </div>
        <div>
          <div>Supply</div>
          <div>{formateNumber(result.supply)}</div>
        </div>
      </header>
    </div>
  );
};

export { Currency };
