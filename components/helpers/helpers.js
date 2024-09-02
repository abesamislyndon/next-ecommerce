export const formatPrice = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2, // Ensures two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
};
