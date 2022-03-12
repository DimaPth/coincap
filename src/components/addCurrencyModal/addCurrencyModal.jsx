import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLocalItem } from "../../redux/localStoreSlice";
import { Button } from "../UI/button/button";
import { Modal } from "../UI/modal/modal";
import style from "./addCurrencyModal.module.scss";

const AddCurrencyModal = ({ active, setActive, currency, setCurrency }) => {
  const [count, setCount] = useState("");
  const dispatch = useDispatch();

  const setStorage = (currency, count) => {
    let localItem = JSON.parse(localStorage.getItem(currency?.id));
    if (localItem) {
      setCurrency(
        (currency = { ...localItem, count: localItem.count + +count })
      );
    } else {
      setCurrency((currency = { ...currency, count: +count }));
    }
    dispatch(addLocalItem(currency));
    setActive(false);
    setCount("");
  };

  return (
    <Modal active={active} setActive={setActive}>
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
            onClick={() => setStorage(currency, count)}
            disabled={count < 1}
          >
            add
          </Button>
          <Button
            onClick={() => {
              setActive(false);
              setCount("");
            }}
          >
            cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { AddCurrencyModal };
