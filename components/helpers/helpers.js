export const formatPrice = (amount) => {
  // Ensure the amount is a number; if not, default to 0
  const validAmount = typeof amount === "number" && !isNaN(amount) ? amount : 0;

  return validAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2, // Ensures two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
};
