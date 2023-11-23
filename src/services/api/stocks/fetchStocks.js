import makeRequest from "../makeRequests";

const fetchStocks = async function fetchStocksService(context) {
  const uri = "/api/v1/stocks/";
  const method = "GET";
  let stocks;
  try {
    stocks = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStocksError = { message: ("There is a problem in getting Stocks:", error) }
    throw getStocksError;
  }
  return stocks;
}

const fetchSingleStock = async function fetchSingleStockService(context, uuid) {
  const uri = `/api/v1/stocks/${uuid}`;
  const method = "GET";
  let stock;
  try {
    stock = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStocksError = { message: ("There is a problem in getting Stock:", error) }
    throw getStocksError;
  }
  return stock;
}

export { fetchStocks, fetchSingleStock };