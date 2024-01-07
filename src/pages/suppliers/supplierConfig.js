//General supplier Info
const supplierTitle = "Supplier Info"

const supplierInfoArr = [
  "Name",
  "Address",
  "Email Address",
  "Phone Number",
]
const supplierInfoMappings = {
  "Name": "name",
  "Address": "address",
  "Email Address": "email_address",
  "Phone Number": "phone_number",
}

// Supplier Products Table Section
const supplierProductsTitle = "Supplier Products";
const supplierProductItemTitle = "Products Supplied";
const supplierProductsColumn = [
  { id: "category", label: "Category" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "product_type", label: "Product Type" },
  { id: "active_for_sale", label: "Active for Sale" },
  { id: "tax_type", label: "Tax Type" }
];

export {
  supplierTitle,
  supplierInfoArr,
  supplierInfoMappings,
  supplierProductsTitle,
  supplierProductItemTitle,
  supplierProductsColumn,
}