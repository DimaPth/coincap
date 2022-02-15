export const formatNumber = (num, price) => {
  if(price) {
    return new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  }
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);
};