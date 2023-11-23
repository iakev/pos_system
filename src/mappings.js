const paymentMethodMapping = {
  "01": "CASH",
  "02": "CREDIT",
  "03": "CASH/CREDIT",
  "04": "BANK CHECK",
  "05": "DEBIT AND CREDIT CARD",
  "06": "MOBILE MONEY",
  "07": "OTHER"
};
const salesStatusMapping = {
  "01": "Wait for Approval",
  "02": "Approved",
  "03": "Credit Note Requested",
  "04": "Cancelled",
  "05": "Credit Note Generated",
  "06": "Transferred"
};

export { paymentMethodMapping, salesStatusMapping };