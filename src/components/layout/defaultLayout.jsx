import React from "react";
import style from "./defaultLayout.module.scss";

const DefaultLayout = ({ children }) => {
  return (
    <div className={style.app}>
      <header className={style.header}>header</header>
      <div className={style.container}>{children}</div>
    </div>
  );
};

export { DefaultLayout };
