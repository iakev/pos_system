// General stock information
const stockTitle = "Stock Information";
const stockInfoArr = [
  "Category",
  "Name",
  "Code",
  "Quantity",
  "Date Added",
  "Unit Cost",
  "Retail Price",
  "Wholesale Price",
  "Reorder level",
  "Reorder Quantity",
  "Latest Movement on",
  "Latest Movement",
  "Latest Movement Quantity",
  "Latest Movement Remarks"
];

const stockInfoArrMappings = {
  "Category": "product.category.name",
  "Name": "product.name",
  "Code": "product.code",
  "Quantity": "stock_quantity",
  "Date Added": "created_at",
  "Unit Cost": "cost_per_unit",
  "Retail Price": "price_per_unit_retail",
  "Wholesale Price": "price_per_unit_wholesale",
  "Reorder level": "reorder_level",
  "Reorder Quantity": "reorder_quantity",
  "Latest Movement on": "updated_at",
  "Latest Movement": "latest_stock_movement_type",
  "Latest Movement Quantity": "latest_stock_movement_quantity",
  "Latest Movement Remarks": "latest_stock_movement_remarks"
};

// StockMovements Table Section
const stockMovementTitle = "Stock Movement history";
const stockMovementItemTitle = "Recent Stock Movement";
const stockMovementColumns = [
  { id: "movement_type", label: "Movement Type" },
  { id: "movement_quantity", label: "Movement Quantity" },
  { id: "remarks", label: "Movement Remarks" },
  { id: "previous_stock_quantity", label: "Quantity before Movement" },
  { id: "employee", label: "Employee Responsible" },
  { id: "product", label: "Product Name" }
];



export {
  stockInfoArr,
  stockInfoArrMappings,
  stockTitle,
  stockMovementColumns,
  stockMovementItemTitle,
  stockMovementTitle
};