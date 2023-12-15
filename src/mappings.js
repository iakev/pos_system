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

// Function to covenert API date format to
// required format for application
function convertDate(dateVal) {
  const dateObj = new Date(dateVal);
  return `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}
  -${dateObj.getFullYear()}`;
}

function reduceToGetObjects(objMaping, mappingKey, actualObj) {
  const rawItemValue = objMaping[mappingKey].split(".").reduce((obj, key) => (obj || {})[key], actualObj) || `No ${mappingKey}`;
  return rawItemValue === undefined ? `No ${mappingKey}` : rawItemValue;
}

export { paymentMethodMapping, salesStatusMapping, convertDate, reduceToGetObjects };