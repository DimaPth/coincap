import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAssetsQuery } from "../../redux";
import { formatNumber } from "../../services/formatNumber";
import { getWalletPrice } from "../../services/getWalletPrice";
import { Button } from "../UI/button/button";
import { Modal } from "../UI/modal/modal";
import { Wallet } from "../wallet/wallet";
import style from "./header.module.scss";

const Header = () => {
  const [modalActive, setModalActive] = useState(false);
  const { data = {}, isSuccess, error } = useGetAssetsQuery(3);
  const { localData } = useSelector((state) => state.local);
  const walletPrice = getWalletPrice(localData);

  const result = data.data;

  return (
    <div className={style.wrap}>
      <div className={style.popular}>
        {error && error.error}
        {isSuccess &&
          result.map((item) => (
            <div key={item.id}>
              {item.name}: {formatNumber(item.priceUsd, true)}
            </div>
          ))}
      </div>
      <div className={style.wallet}>
        {walletPrice}
        <Button onClick={() => setModalActive(true)}>info</Button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <Wallet />
      </Modal>
    </div>
  );
};

export { Header };
