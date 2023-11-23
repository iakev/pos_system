import makeRequest from "../makeRequests";

const fetchSuppliers = async function fetchSuppliersService(context) {
  const uri = "/api/v1/suppliers/";
  const method = "GET";
  let suppliers;
  try {
    suppliers = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSuppliersError = { message: ("There is a problem in getting Suppliers:", error) }
    throw getSuppliersError;
  }
  return suppliers;
}

const fetchSingleSupplier = async function fetchSingleSupplierService(context, uuid) {
  const uri = `/api/v1/suppliers/${uuid}`;
  const method = "GET";
  let supplier;
  try {
    supplier = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSuppliersError = { message: ("There is a problem in getting Supplier:", error) }
    throw getSuppliersError;
  }
  return supplier;
}

const fetchAllProductsForSupplier = async function fetchAllProductsSupplier(context, supplier_uuid) {
  const uri = `/api/v1/suppliers/${supplier_uuid}/list_all_products/`;
  const method = "GET";
  let products;
  try {
    products = await makeRequest(context, uri, { method });
  } catch (error) {
    const getProductsError = { message: ("There is a problem in getting all Suppliers for Product:", error) }
    throw getProductsError;
  }
  return products;
}

export { fetchSuppliers, fetchSingleSupplier, fetchAllProductsForSupplier };