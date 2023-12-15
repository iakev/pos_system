import makeRequest from "../makeRequests";

const fetchStocks = async function fetchStocksService(context) {
  const uri = "/api/v1/stocks/";
  const method = "GET";
  let stocks;
  try {
    stocks = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStocksError = { message: ("There is a problem in getting Stocks:", error) };
    throw getStocksError;
  }
  return stocks;
};

const fetchSingleStock = async function fetchSingleStockService(context, uuid) {
  const uri = `/api/v1/stocks/${uuid}`;
  const method = "GET";
  let stock;
  try {
    stock = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStockError = { message: ("There is a problem in getting Stock:", error) };
    throw getStockError;
  }
  return stock;
};

const fetchSingleStockMovement = async function fetchSingleStockMovementService(context, uuid) {
  const uri = `/api/v1/stocks/${uuid}/list_all_stock_movements/`;
  const method = "GET";
  let stockMovement;
  try {
    stockMovement = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStockMovementError = { mesage: ("There is a problem in getting the stock movement:", error) };
    throw getStockMovementError;
  }
  return stockMovement;
}

export { fetchStocks, fetchSingleStock, fetchSingleStockMovement };