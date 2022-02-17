export const formatNumber = (num, price) => {
  if(price) {
    if(num < 2) {
      return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 5
      }).format(num);
    }
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