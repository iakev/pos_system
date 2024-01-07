// General information section info
const generalTitle = "General Information";
const generalInfoArr = [
  "Description",
  "Active for sale",
  "Category",
  "Unit"
];
const generalInfoMappings = {
  "Description": "description",
  "Active for sale": "active_for_sale",
  "Category": "category.name",
  "Unit": "unit"
};

// Logistics Table information
const logisticsTitle = "Logistics and Supply Chain";
const logisticsItemTitle = "Suppliers Information";
const logisticColumns = [
  { id: 'name', label: 'Name' },
  { id: 'address', label: 'Address' },
  { id: 'email_address', label: 'Email Address' },
  { id: 'phone_number', label: 'Phone Number' },
  { id: 'lead_time', label: 'Lead Time' },
];

// Inventory information section
const inventoryTitle = "Inventory Information";
const inventoryInfoArr = [
  "Avaialable Units",
  "Price Per Unit WholeSale",
  "Price Per Unit Retail",
  "Reorder Level",
  "Reorder Quantity",
  "Unit Cost",
  "Total Cost"
];
const inventoryInfoMappings = {
  "Avaialable Units": "stock_quantity",
  "Price Per Unit WholeSale": "price_per_unit_wholesale",
  "Price Per Unit Retail": "price_per_unit_retail",
  "Reorder Level": "reorder_level",
  "Reorder Quantity": "reorder_quantity",
  "Unit Cost": "cost_per_unit"
};

// Sales transaction Table section
const salesTitle = "Sales history & Transactions";
const salesItemTitle = "Recent Sales";
const salesColumns = [
  { id: "created_at", label: "Date" },
  { id: "customer", label: "Customer Name" },
  { id: "employee", label: "Sales Person" },
  { id: "payment", label: "Payment Mode" },
  { id: "sale_status", label: "Sale Status" },
  { id: "quantity_sold", label: "Quantity Sold" },
  { id: "price_per_unit", label: "Sold at" },
  { id: "price", label: "Total Sold Amount" }
];

// Purchases Table Section
const purchasesTitle = "Purchases history & Transactions";
const purchaseItemTitle = "Recent Purchases";
const purchaseColumns = [
  { id: "created_at", label: "Date of Purchase" },
  { id: "supplier", label: "Supplier" },
  { id: "employee", label: "Employee Name" },
  { id: "quantity", label: "Quantity Purchased" },
  { id: "unit_price", label: "Unit Price" },
  { id: "total_cost", label: "Total  Cost" },
  { id: "discount", label: "Purchase Discount" },
];

// Additional information section info
const aditionalTitle = "Additional Information";
const additionalInfoArr = [
  "Packaging unit",
  "Limited",
  "Tax Information",
  "Product Type"
];
const additionalinfoMappings = {
  "Packaging unit": "packaging_unit",
  "Limited": "limited",
  "Tax Information": "tax_type",
  "Product Type": "product_type"
};

export {
  generalInfoArr,
  generalInfoMappings,
  generalTitle,
  logisticsTitle,
  logisticsItemTitle,
  logisticColumns,
  inventoryInfoArr,
  inventoryInfoMappings,
  inventoryTitle,
  salesTitle,
  salesItemTitle,
  salesColumns,
  purchasesTitle,
  purchaseItemTitle,
  purchaseColumns,
  additionalInfoArr,
  additionalinfoMappings,
  aditionalTitle
};