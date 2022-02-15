import React from "react";
import { useParams } from "react-router-dom";

const Currency = () => {
  const { id } = useParams();
  return <div>Currency</div>;
};

export { Currency };
