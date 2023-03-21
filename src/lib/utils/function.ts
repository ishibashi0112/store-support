export const calculatePriceWithTax = (
  price: number,
  taxRate: number = 0.1
): number => {
  const taxAmount = price * taxRate;
  const priceWithTax = price + taxAmount;
  const roundedPriceWithTax = Math.ceil(priceWithTax);
  return roundedPriceWithTax;
};
