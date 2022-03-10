export const getWalletPrice = (arr) => {
  const currencyPrice = arr.map((item) => +item.priceUsd * +item.count);
  return currencyPrice.reduce((acc, value) => acc + value, 0);
}