import React from "react";
import { Header } from "../header/header";
import style from "./defaultLayout.module.scss";

const DefaultLayout = ({ children }) => {
  return (
    <div className={style.app}>
      <div className={style.container}>{children}</div>
      <header className={style.header}>
        <Header />
      </header>
    </div>
  );
};

export { DefaultLayout };
