import { formatNumber } from "./formatNumber";

export const getWalletPrice = (arr) => {
  const currencyPrice = arr.map((item) => +item.priceUsd * +item.count);
  return formatNumber(currencyPrice.reduce((acc, value) => acc + value, 0), true);
}