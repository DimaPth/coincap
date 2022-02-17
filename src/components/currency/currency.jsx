import React from "react";
import { useParams } from "react-router-dom";
import { useGetCurrencyHistoryQuery, useGetCurrencyQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import style from "./currency.module.scss";
import { CustomTooltip } from "../customTooltip/customTooltip";

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

  return (
    <div className={style.wrap}>
      <div className={style.header}>
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
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="90%" height={400}>
          <AreaChart data={history}>
            <Area dataKey="priceUsd" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickFormatter={(num) =>
                new Date(num).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
              angle={15}
              interval="preserveStart"
            />
            <YAxis
              dataKey="priceUsd"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.2} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { Currency };
