export const getNewWalletPrice = (oldArr, newData) => {
  const counts = oldArr
  .slice()
  .sort((a, b) => +a.rank - +b.rank)
  .map((item) => item.count);

  const newWalletCurrencies = [];

  if(newData){
    for (let i = 0; i < counts.length; i++) {
      newWalletCurrencies.push(+newData.data[i].priceUsd * counts[i]);
    }
  } else {
    return null
  }

  return newWalletCurrencies.reduce((acc, val) => acc + val, 0);
}