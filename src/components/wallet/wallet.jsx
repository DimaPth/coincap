import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeLocalItem } from "../../redux/localStoreSlice";
import { Button } from "../UI/button/button";
import style from "./wallet.module.scss";

const Wallet = () => {
  const { localData } = useSelector((state) => state.local);
  const dispatch = useDispatch();

  const tableConfig = [
    { header: "Name", key: "name" },
    { header: "Count", key: "count" },
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
          {localData.length < 1 ? (
            <tr>
              <td colSpan={3}>empty</td>
            </tr>
          ) : (
            localData.map((item) => (
              <tr key={item.id}>
                {tableConfig.map((cell) => (
                  <td key={cell.header}>{item[cell.key]}</td>
                ))}
                <td>
                  <Button onClick={() => dispatch(removeLocalItem(item.id))}>
                    remove
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export { Wallet };
