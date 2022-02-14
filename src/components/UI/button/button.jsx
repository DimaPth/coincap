import React from "react";
import "./button.module.scss";

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export { Button };
