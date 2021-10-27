const formatNumber = (number: number, decimals: number = 2): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(number);
};

export default formatNumber;
