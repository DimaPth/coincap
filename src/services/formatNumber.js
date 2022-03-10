export const formatNumber = (num, price) => {
  if(price) {
      return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: (num < 2) ? 5 : 2,
      }).format(num);
    }
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    minimumFractionDigits: 2,
  }).format(num);
};