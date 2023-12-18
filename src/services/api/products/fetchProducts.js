import makeRequest from "../makeRequests";
import { toast } from "react-toastify";

const fetchProducts = async function fetchProductsService(context) {
  const uri = "products/";
  const method = "GET";
  let products;
  try {
    products = await makeRequest(context, uri, { method });
  } catch (error) {
    const getProductsError = { message: ("There is a problem in getting Products:", error) };
    toast.error(getProductsError, { autoClose: 5000 });
  }
  return products;
}

const fetchSingleProduct = async function fetchProductService(context, uuid) {
  const uri = `products/${uuid}`;
  const method = "GET";
  let product;
  try {
    product = await makeRequest(context, uri, { method });
  } catch (error) {
    const getProductError = { message: ("There is a problem in getting Product:", error) };
    toast.error(getProductError, { autoClose: 5000 });
  }
  return product;
}

const fetchAllSuppliersForProduct = async function fetchAllSuppliersProduct(context, product_uuid) {
  const uri = `products/${product_uuid}/list_suppliers/`;
  const method = "GET";
  let suppliers;
  try {
    suppliers = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSuppliersError = { message: ("There is a problem in getting all Suppliers for Product:", error) };
    toast.error(getSuppliersError, { autoClose: 5000 });
  }
  return suppliers;
}

const fetchStockForProduct = async function fetchStockProduct(context, product_uuid) {
  const uri = `products/${product_uuid}/stock_information/`;
  const method = "GET";
  let stock;
  try {
    stock = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStockError = { message: ("There is a problem in getting Stock for Product:", error) };
    toast.error(getStockError, { autoClose: 5000 });
  }
  return stock;
}

const fetchSalesForProduct = async function fetchSalesProduct(context, product_uuid) {
  const uri = `products/${product_uuid}/sale_information/`;
  const method = "GET";
  let sales;
  try {
    sales = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSalesError = { message: ("There is a problem in getting Sales for Product:", error) };
    toast.error(getSalesError, { autoClose: 5000 });
  }
  return sales;
}

const fetchPurchasesForProduct = async function fetchPurchasesProduct(context, product_uuid) {
  const uri = `products/${product_uuid}/purchase_information/`;
  const method = "GET";
  let purchases;
  try {
    purchases = await makeRequest(context, uri, { method });
  } catch (error) {
    const getPurchasesError = { message: ("There is a problem in getting Purchases for Products:", error) };
    toast.error(getPurchasesError, { autoClose: 5000 });
  }
  return purchases;
}

export {
  fetchProducts,
  fetchSingleProduct,
  fetchAllSuppliersForProduct,
  fetchStockForProduct,
  fetchSalesForProduct,
  fetchPurchasesForProduct
};