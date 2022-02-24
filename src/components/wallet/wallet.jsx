import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeLocalItem } from "../../redux/localstoreSlice";
import { formatNumber } from "../../services/formatNumber";
import { getWalletPrice } from "../../services/getWalletPrice";
import { Button } from "../UI/button/button";
import style from "./wallet.module.scss";

const Wallet = () => {
  const { localData } = useSelector((state) => state.local);
  const dispatch = useDispatch();
  const walletPrice = getWalletPrice(localData);
  const tableConfig = [
    { header: "Name", key: "name" },
    { header: "Count", key: "count" },
    { header: "Price", key: "priceUsd", price: true },
  ];
  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            {tableConfig.map((cell) => (
              <th key={cell.header}>{cell.header}</th>
            ))}
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {localData.map((item) => (
            <tr key={item.id}>
              {tableConfig.map((cell) => (
                <td key={cell.header}>
                  {cell.price
                    ? formatNumber(item[cell.key], true)
                    : item[cell.key]}
                </td>
              ))}
              <td>
                <Button onClick={() => dispatch(removeLocalItem(item.id))}>
                  remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total:</td>
            <td colSpan={3}>{walletPrice}</td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export { Wallet };
