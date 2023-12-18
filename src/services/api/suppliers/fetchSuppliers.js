import makeRequest from "../makeRequests";
import { toast } from "react-toastify";

const fetchSuppliers = async function fetchSuppliersService(context) {
  const uri = "suppliers/";
  const method = "GET";
  let suppliers;
  try {
    suppliers = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSuppliersError = { message: ("There is a problem in getting Suppliers:", error) };
    toast.error(getSuppliersError, { autoClose: 5000 });
  }
  return suppliers;
}

const fetchSingleSupplier = async function fetchSingleSupplierService(context, uuid) {
  const uri = `suppliers/${uuid}`;
  const method = "GET";
  let supplier;
  try {
    supplier = await makeRequest(context, uri, { method });
  } catch (error) {
    const getSupplierError = { message: ("There is a problem in getting Supplier:", error) };
    toast.error(getSupplierError, { autoClose: 5000 });
  }
  return supplier;
}

const fetchAllProductsForSupplier = async function fetchAllProductsSupplier(context, supplier_uuid) {
  const uri = `suppliers/${supplier_uuid}/list_all_products/`;
  const method = "GET";
  let products;
  try {
    products = await makeRequest(context, uri, { method });
  } catch (error) {
    const getProductsError = { message: ("There is a problem in getting all Suppliers for Product:", error) };
    toast.error(getProductsError, { autoClose: 5000 });
  }
  return products;
}

export { fetchSuppliers, fetchSingleSupplier, fetchAllProductsForSupplier };