export const calculateWaterLiters = (percentage: number, capacity: number) => {
  return +(capacity * (percentage / 100)).toFixed(1);
};
