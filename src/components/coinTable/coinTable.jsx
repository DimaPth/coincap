import React from "react";
import { useGetAssetsQuery } from "../../redux";
import "./coinTable.module.scss";

const CoinTable = () => {
  const { data = [], isLoading, isError } = useGetAssetsQuery();

  const tableConfig = [
    { header: "Rank", key: "rank" },
    { header: "Name", key: "name" },
    { header: "Price", key: "priceUsd", price: true },
    { header: "Market Cap", key: "marketCapUsd", price: true },
    { header: "VWAP(24Hr)", key: "vwap24Hr", price: true },
    { header: "Supply", key: "supply", supply: true },
    { header: "Volume(24Hr)", key: "volumeUsd24Hr", price: true },
    { header: "Change(24Hr)", key: "changePercent24Hr", percent: true },
    { header: "Control", btn: true },
  ];

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something gone wrong</h1>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableConfig.map((cell) => {
              return <th key={cell.header}>{cell.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.data.map((item) => {
            return (
              <tr key={item.id}>
                {tableConfig.map((cell) => (
                  <td key={item[cell.key]}>
                    {cell.price ? (
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                      }).format(item[cell.key])
                    ) : cell.supply ? (
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                      }).format(item[cell.key])
                    ) : cell.percent ? (
                      new Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 2,
                      }).format(item[cell.key]) + "%"
                    ) : cell.btn ? (
                      <button>+</button>
                    ) : (
                      item[cell.key]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { CoinTable };
