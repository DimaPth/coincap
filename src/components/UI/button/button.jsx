import React from "react";
import style from "./button.module.scss";

const Button = ({ children, ...props }) => {
  return (
    <button className={style.btn} {...props}>
      {children}
    </button>
  );
};

export { Button };
