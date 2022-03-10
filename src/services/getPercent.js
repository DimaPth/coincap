export const getPercent = (a, b) => {
    if (a > b) {
      return `${(((a - b) / a) * 100).toFixed(2)}%`;
    } else {
      return `${(((b - a) / a) * 100).toFixed(2)}%`;
    }
  };