import makeRequest from "../makeRequests";
import { toast } from "react-toastify";

const fetchStocks = async function fetchStocksService(context) {
  const uri = "stocks/";
  const method = "GET";
  let stocks;
  try {
    stocks = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStocksError = { message: ("There is a problem in getting Stocks:", error) };
    toast.error(getStocksError, { autoClose: 5000 });
  }
  return stocks;
};

const fetchSingleStock = async function fetchSingleStockService(context, uuid) {
  const uri = `stocks/${uuid}`;
  const method = "GET";
  let stock;
  try {
    stock = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStockError = { message: ("There is a problem in getting Stock:", error) };
    toast.error(getStockError, { autoClose: 5000 });
  }
  return stock;
};

const fetchSingleStockMovement = async function fetchSingleStockMovementService(context, uuid) {
  const uri = `stocks/${uuid}/list_all_stock_movements/`;
  const method = "GET";
  let stockMovement;
  try {
    stockMovement = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStockMovementError = { mesage: ("There is a problem in getting the stock movement:", error) };
    toast.error(getStockMovementError, { autoClose: 5000 });
  }
  return stockMovement;
}

export { fetchStocks, fetchSingleStock, fetchSingleStockMovement };