import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAssetsQuery } from "../../redux";
import { addLocalItem } from "../../redux/localstoreSlice";
import { formatNumber } from "../../services/formatNumber";
import { Button } from "../UI/button/button";
import { Modal } from "../UI/modal/modal";
import style from "./coinTable.module.scss";

const CoinTable = () => {
  const [modalActive, setModalActive] = useState(false);
  const [count, setCount] = useState("");
  const [selected, setSelected] = useState({});
  const { data = [], isLoading, error } = useGetAssetsQuery(20);
  const dispatch = useDispatch();
  const result = data.data;

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

  const showModal = (selected) => {
    setSelected(selected);
    setModalActive(true);
  };

  const setStorage = (selected, count) => {
    let localItem = JSON.parse(localStorage.getItem(selected.id));
    if (localItem) {
      setSelected(
        (selected = { ...localItem, count: localItem.count + +count })
      );
    } else {
      setSelected((selected = { ...selected, count: +count }));
    }
    dispatch(addLocalItem(selected));
    setModalActive(false);
    setCount("");
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.error}</h1>;

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
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={style.modal}>
          <div>
            <label id="count" className={style.label}>
              Enter count
            </label>
            <input
              name="count"
              className={style.input}
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
              type="number"
            />
          </div>
          <div className={style.btnWrap}>
            <Button
              onClick={() => setStorage(selected, count)}
              disabled={count < 1}
            >
              add
            </Button>
            <Button
              onClick={() => {
                setModalActive(false);
                setCount("");
              }}
            >
              cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { CoinTable };
