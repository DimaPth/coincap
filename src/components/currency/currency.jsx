import React from "react";
import { useParams } from "react-router-dom";
import { useGetCurrencyHistoryQuery, useGetCurrencyQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import style from "./currency.module.scss";

const Currency = () => {
  const { id } = useParams();
  const { data = [], isLoading, isError } = useGetCurrencyQuery(id);
  const {
    data: response = {},
    isLoading: load,
    isError: err,
  } = useGetCurrencyHistoryQuery(id);

  if (isLoading || load) return <h1>Loading...</h1>;
  if (isError || err) return <h1>Something gone wrong</h1>;

  const result = data?.data;
  const history = response?.data;
  console.log(history);
  console.log(new Date(1642291200000).toLocaleDateString("en-US"));

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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="90%" height={400}>
          <AreaChart data={history}>
            <Area dataKey="priceUsd" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickCount={15}
              tickFormatter={(num) =>
                new Date(num).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <YAxis
              dataKey="priceUsd"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              orientation="right"
            />
            <Tooltip />
            <CartesianGrid opacity={0.2} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { Currency };
