import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAssetsQuery } from "../../redux";
import { Button } from "../UI/button/button";
import { Modal } from "../UI/modal/modal";
import style from "./coinTable.module.scss";

const CoinTable = () => {
  const [modalActive, setModalActive] = useState(false);
  const { data = [], isLoading, isError } = useGetAssetsQuery();

  const tableConfig = [
    { header: "Rank", key: "rank" },
    { header: "Name", key: "name", isLink: true },
    { header: "Price", key: "priceUsd", price: true },
    { header: "Market Cap", key: "marketCapUsd", price: true },
    { header: "VWAP(24Hr)", key: "vwap24Hr", price: true },
    { header: "Supply", key: "supply", supply: true },
    { header: "Volume(24Hr)", key: "volumeUsd24Hr", price: true },
    { header: "Change(24Hr)", key: "changePercent24Hr", percent: true },
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
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item) => {
            return (
              <tr key={item.id}>
                {tableConfig.map((cell) => (
                  <td key={item[cell.key]}>
                    {cell.isLink ? (
                      <Link className={style.link} to={`/${item.id}`}>
                        {item[cell.key]}
                      </Link>
                    ) : cell.price ? (
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
                    ) : (
                      item[cell.key]
                    )}
                  </td>
                ))}
                <td>
                  <Button onClick={() => setModalActive(true)}>add</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal active={modalActive} setActive={setModalActive}></Modal>
    </div>
  );
};

export { CoinTable };
