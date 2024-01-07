import { useContext, useCallback } from "react";

import APIContext from "./APIContext";
import { authenticate, silentRefresh } from "./auth/authenticate";
import {
  fetchProducts,
  fetchSingleProduct,
  fetchAllSuppliersForProduct,
  fetchStockForProduct,
  fetchSalesForProduct,
  fetchPurchasesForProduct
} from "./products/fetchProducts";

import { fetchStocks, fetchSingleStock, fetchSingleStockMovement } from "./stocks/fetchStocks";

const services = [
  authenticate,
  silentRefresh,
  fetchProducts,
  fetchSingleProduct,
  fetchAllSuppliersForProduct,
  fetchStockForProduct,
  fetchSalesForProduct,
  fetchPurchasesForProduct,
  fetchStocks,
  fetchSingleStock,
  fetchSingleStockMovement
]

export const useAPI = () => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("useAPI must be used within an APIProvider");
  }

  // The map method treats the service argument as the entire arrow function 
  // that's being created. In other words, the arrow 
  // function (service) => [key, (...args) => service(context, ...args)] 
  // is constructed within the map method.
  const bindContext = useCallback((services) => {
    return Object.fromEntries(Object.entries(services).map(([key, service]) => {
      return [key, (...args) => service(context, ...args)]
    }))
  }, [context]);

  const augmentedContext = {
    ...context,
    ...bindContext(services)
  };

  return augmentedContext;
}