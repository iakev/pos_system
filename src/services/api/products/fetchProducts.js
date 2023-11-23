import makeRequest from "../makeRequests";

const fetchProducts = async function fetchProductsService(context) {
  const uri = "/api/v1/products/";
  const method = "GET";
  let products;
  try {
    products = await makeRequest(context, uri, { method });
  } catch (error) {
    const getProductsError = { message: ("There is a problem in getting Products:", error) }
    throw getProductsError;
  }
  return products;
}

const fetchSingleProduct = async function fetchProductService(context, uuid) {
  const uri = `/api/v1/products/${uuid}`;
  const method = "GET";
  let product;
  try {
    product = await makeRequest(context, uri, { method });
  } catch (error) {
    const getProductError = { message: ("There is a problem in getting Product:", error) }
    throw getProductError;
  }
  return product;
}

const fetchAllSuppliersForProduct = async function fetchAllSuppliersProduct(context, product_uuid) {
  const uri = `/api/v1/products/${product_uuid}/list_suppliers/`;
  const method = "GET";
  let suppliers;
  try {
    suppliers = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSuppliersError = { message: ("There is a problem in getting all Suppliers for Product:", error) }
    throw getSuppliersError;
  }
  return suppliers;
}

const fetchStockForProduct = async function fetchStockProduct(context, product_uuid) {
  const uri = `/api/v1/products/${product_uuid}/stock_information/`;
  const method = "GET";
  let stock;
  try {
    stock = await makeRequest(context, uri, { method });
  } catch (error) {
    const getStockError = { message: ("There is a problem in getting Stock for Product:", error) }
    throw getStockError;
  }
  return stock;
}

const fetchSalesForProduct = async function fetchSalesProduct(context, product_uuid) {
  const uri = `/api/v1/products/${product_uuid}/sale_information/`;
  const method = "GET";
  let sales;
  try {
    sales = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSalesError = { message: ("There is a problem in getting Sales for Product:", error) };
    throw getSalesError;
  }
  return sales;
}

const fetchPurchasesForProduct = async function fetchPurchasesProduct(context, product_uuid) {
  const uri = `/api/v1/products/${product_uuid}/purchase_information/`;
  const method = "GET";
  let purchases;
  try {
    purchases = await makeRequest(context, uri, { method });
  } catch (error) {
    const getPurchasesError = { message: ("There is a problem in getting Purchases for Products:", error) };
    throw getPurchasesError;
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