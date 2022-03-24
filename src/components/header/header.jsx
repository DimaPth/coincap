import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAssetsByIdsQuery, useGetAssetsQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import { getNewWalletPrice } from "../../services/getNewWalletPrice";
import { getPercent } from "../../services/getPercent";
import { getWalletPrice } from "../../services/getWalletPrice";
import { Button } from "../UI/button/button";
import { Modal } from "../UI/modal/modal";
import { Wallet } from "../wallet/wallet";
import style from "./header.module.scss";

const Header = () => {
  const [modalActive, setModalActive] = useState(false);
  const [walletPrice, setWalletPrice] = useState(0);
  const [newWalletPrice, setNewWalletPrice] = useState(0);
  const [difference, setDifference] = useState("0.00");
  const [percent, setPercent] = useState("0.00%");
  const { data = {}, isLoading, isSuccess, error } = useGetAssetsQuery(3);
  const { localData } = useSelector((state) => state.local);

  const ids = localData
    .map((item) => {
      return item.id;
    })
    .join(",");

  const { data: dataByIds = {}, isSuccess: newDataSuccess } =
    useGetAssetsByIdsQuery(ids);

  useEffect(() => {
    if (newDataSuccess) {
      setWalletPrice(getWalletPrice(localData));
      setNewWalletPrice(getNewWalletPrice(localData, dataByIds));
    }
  }, [localData, dataByIds]);

  useEffect(() => {
    if (newWalletPrice && walletPrice) {
      setDifference((newWalletPrice - walletPrice).toFixed(2));
      setPercent(getPercent(newWalletPrice, walletPrice));
    } else {
      setDifference("0.00");
      setPercent("0.00%");
    }
  }, [walletPrice, newWalletPrice]);

  const result = data.data;

  return (
    <div className={style.wrap}>
      <div className={style.popular}>
        {error && error.error}
        {isLoading && <h2>...</h2>}
        {isSuccess &&
          result.map((item) => (
            <div key={item.id} className={style.popular__item}>
              {item.name}: {formatNumber(item.priceUsd, true)}
            </div>
          ))}
      </div>
      <div className={style.wallet}>
        <div className={style.wallet__price}>
          <span>{formatNumber(newWalletPrice, true)}</span>
          <span>
            {difference > 0 ? "+" + difference : difference} ({percent})
          </span>
        </div>
        <Button onClick={() => setModalActive(true)}>Wallet</Button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <Wallet
          walletPrice={newWalletPrice}
          difference={difference}
          percent={percent}
        />
      </Modal>
    </div>
  );
};

export { Header };
