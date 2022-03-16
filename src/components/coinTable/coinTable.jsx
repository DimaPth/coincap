import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useGetAssetsQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import { AddCurrencyModal } from "../addCurrencyModal/addCurrencyModal";
import { Button } from "../UI/button/button";
import style from "./coinTable.module.scss";

const CoinTable = () => {
  const [modalActive, setModalActive] = useState(false);
  const [limit, setLimit] = useState(20);
  const [selected, setSelected] = useState({});
  const [windowWidth, windowHeight] = useWindowSize();
  const { data = [], isLoading, error, isFetching } = useGetAssetsQuery(limit);

  const tableConfig = [
    { header: "Rank", key: "rank" },
    { header: "Name", key: "name", isLink: true },
    { header: "Price", key: "priceUsd", fullPrice: true },
    { header: "Market Cap", key: "marketCapUsd", price: true },
    { header: "VWAP(24Hr)", key: "vwap24Hr", price: true },
    { header: "Supply", key: "supply", supply: true },
    { header: "Volume(24Hr)", key: "volumeUsd24Hr", price: true },
    { header: "Change(24Hr)", key: "changePercent24Hr", percent: true },
  ];

  if (windowWidth < 1024) {
    tableConfig.splice(4, 2);
  }

  const viewMore = () => {
    setLimit((prev) => prev + 20);
  };

  const showModal = (selected) => {
    setSelected(selected);
    setModalActive(true);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.error}</h1>;

  const result = data.data;

  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            {tableConfig.map((cell) => {
              return <th key={cell.header}>{cell.header}</th>;
            })}
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item) => {
            return (
              <tr key={item.id}>
                {tableConfig.map((cell) => (
                  <td key={item[cell.key]}>
                    {cell.isLink ? (
                      <Link className={style.link} to={`/${item.id}`}>
                        {item[cell.key]}
                      </Link>
                    ) : cell.fullPrice ? (
                      formatNumber(item[cell.key], true)
                    ) : cell.price ? (
                      "$" + formatNumber(item[cell.key])
                    ) : cell.supply ? (
                      formatNumber(item[cell.key])
                    ) : cell.percent ? (
                      formatNumber(item[cell.key]) + "%"
                    ) : (
                      item[cell.key]
                    )}
                  </td>
                ))}
                <td>
                  <Button onClick={() => showModal(item)}>add</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={style.button}>
        <Button onClick={viewMore} disabled={limit >= 2000}>
          {isFetching ? "loading" : "View more"}
        </Button>
      </div>
      <AddCurrencyModal
        active={modalActive}
        setActive={setModalActive}
        currency={selected}
        setCurrency={setSelected}
      />
    </div>
  );
};

export { CoinTable };
