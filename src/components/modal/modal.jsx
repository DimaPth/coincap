import React from "react";
import style from "./modal.module.scss";

const Modal = ({ active, setActive, children }) => {
  console.log(style.active);
  return (
    <div
      className={active ? `${style.modal} ${style.active}` : style.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={style.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export { Modal };
