import React from "react";
import { Header } from "../header/header";
import style from "./defaultLayout.module.scss";

const DefaultLayout = ({ children }) => {
  return (
    <div className={style.app}>
      <header className={style.header}>
        <Header />
      </header>
      <div className={style.container}>{children}</div>
    </div>
  );
};

export { DefaultLayout };
