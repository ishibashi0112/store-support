export const calculatePriceWithTax = (
  price: number,
  taxRate: number = 0.1
): number => {
  const taxAmount = price * taxRate;
  const priceWithTax = price + taxAmount;
  const roundedPriceWithTax = Math.ceil(priceWithTax);
  return roundedPriceWithTax;
};

type Method = "POST" | "PUT" | "DELETE";
export const fetcher = async (url: string, method: Method, bodyData: any) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) {
    throw Error;
  }

  return await res.json();
};
