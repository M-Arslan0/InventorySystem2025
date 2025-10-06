import { useState } from "react";
//Icons
import {
  FaMagnifyingGlass,
  FaHourglass,
  FaDownLong,
  FaBeerMugEmpty,
  FaBoxArchive,
  FaDolly,
  FaPenNib,
  FaSliders,
} from "react-icons/fa6";
import { FaExclamationTriangle,FaClipboardList } from "react-icons/fa";
//Modals
import ProductRegFormModal from "../../modals/ProductRegFromModal";
import BrandFormModal from "../../modals/BrandFormModal";
import CategoryFormModal from "../../modals/CategoryFormModal";
import ProductPriceUpdateListModal from "../../modals/ProductPriceUpdateListModal";
import ProductPriceUpdateFormModal from "../../modals/ProductPriceUpdateFormModal";
import StockAdjFormModal from "../../modals/StockAdjFormModal";


export default function InventoryList({
  onUpdatePrices,
  onStockAdjustment,
}) {

    // 📌 All States
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [isProductPriceUpdateListModalOpen, setIsProductPriceUpdateListModalOpen] = useState(false)
    const [isProductPriceUpdateFormModalOpen, setIsProductPriceUpdateFormModalOpen] = useState(false)
    const [isStockAdjFormModalOpen, setIsStockAdjFormModalOpen] = useState(false)

  // 📌 Page Menu Config
  const pageMenu = [
    { label: "Add New Item", icon: FaBoxArchive, onClick: () => setIsProductModalOpen(true)},
    { label: "Add Brand", icon: FaBeerMugEmpty, onClick: () => setIsBrandModalOpen(true) },
    { label: "Add Category", icon: FaDolly, onClick: () => setIsCategoryModalOpen(true) },
    { label: "Update Prices", icon: FaPenNib, onClick: () => setIsProductPriceUpdateFormModalOpen(true) },
    { label: "Update Prices List", icon: FaClipboardList, onClick: () => setIsProductPriceUpdateListModalOpen(true) },
    { label: "Stock Adjustment", icon: FaSliders,onClick: () => setIsStockAdjFormModalOpen(true) },
  ];

  // 📌 Stock Summary Config
  const stockCards = [
    { title: "Low Stock", value: 150, icon: FaExclamationTriangle, color: "text-orange-500" },
    { title: "Out of Stock", value: 150, icon: FaHourglass, color: "text-green-600" },
    { title: "Wrong Price", value: 16, icon: FaDownLong, color: "text-pink-500" },
    { title: "Dead Stock", value: 418, icon: FaExclamationTriangle, color: "text-purple-600" },
  ];

  // 📌 Table Data Config
  const tableData = [
    { cord: "DRSP-246", name: "DOLLAR Stapler Pin 24/6", cost: "VP", wholesale: "Rs. 60.00", retail: "Rs. 70.00", stock: 328 },
    { cord: "DXSP-246", name: "DUX Stapler Pin 24/6", cost: "#B", wholesale: "Rs. 55.00", retail: "Rs. 60.00", stock: 1380 },
    { cord: "DRSP-246", name: "DOLLAR Stapler Pin 24/6", cost: "CZ", wholesale: "Rs. 60.00", retail: "Rs. 70.00", stock: 670 },
  ];

  // 📌 Out of Stock Items
  const outOfStockItems = [
    { name: "ORO Lead Pencil 512", qty: 27 },
    { name: "ORO Lead Pencil 512", qty: 27 },
    { name: "ORO Lead Pencil 512", qty: 27 },
    { name: "ORO Lead Pencil 512", qty: 27 },
  ];

  return (
    <div className="w-full">
      {/* Page Menu */}
      <div className="row page-menu flex w-full p-1 border-b-2 border-[#b0c4c4]">
        <div className="w-[20%]">
          <h2 className="font-bold">INVENTORY</h2>
        </div>
        <div className="flex justify-start">
          {pageMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-1">
                <button onClick={item.onClick} className="flex items-center gap-1">
                  <Icon /> {item.label}
                </button>
                {index < pageMenu.length - 1 && <span>|</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {/* Right Side - Product Search & Table */}
        <div className="col-span-2 cards">
          <div className="card data-entery min-h-[85vh] p-2 bg-white shadow rounded">
            {/* Search Header */}
            <div className="data-entery-header flex gap-2">
              <label>Search products</label>
              <input type="search" className="bg-white" />
              <button className="flex items-center justify-center">
                <FaMagnifyingGlass />
              </button>
              <button>RESET</button>

              <select className="bg-white">
                <option>CATEGORY</option>
                <option>Category -1</option>
                <option>Category -2</option>
                <option>Category -3</option>
                <option>Category -4</option>
              </select>

              <select className="bg-white">
                <option>BRAND</option>
                <option>Brand -1</option>
                <option>Brand -2</option>
                <option>Brand -3</option>
                <option>Brand -4</option>
              </select>
            </div>

            {/* Table */}
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>CODE</th>
                  <th>ITEM NAME</th>
                  <th className="text-center">COST</th>
                  <th className="text-right">WHOLESALE</th>
                  <th className="text-right">RETAIL</th>
                  <th className="text-center">IN HAND</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.cord}</td>
                    <td>{row.name}</td>
                    <td className="text-center">{row.cost}</td>
                    <td className="text-right">{row.wholesale}</td>
                    <td className="text-right">{row.retail}</td>
                    <td className="text-center">{row.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Left Side */}
        <div className="col-span-1 grid grid-cols-4 gap-0">
          {/* Stock Summary Cards */}
          {stockCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="col-span-2 cards">
                <div className="card transition bg-white shadow rounded p-4 flex justify-between items-center">
                  <div>
                    <div className="card-title font-bold">{card.title}</div>
                    <div className="card-value text-xl">{card.value}</div>
                  </div>
                  <div className={`card-icon text-2xl ${card.color}`}>
                    <Icon />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Out of Stock List */}
          <div className="col-span-4 cards">
            <div className="card bg-white shadow rounded p-2 h-[64vh] overflow-auto">
              <div className="data-entery-header">
                <label className="font-bold">Out of Stock</label>
              </div>
              <table className="w-full border">
                <tbody>
                  {outOfStockItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isProductModalOpen &&
      <ProductRegFormModal
      onClose={()=>setIsProductModalOpen(false)}
      />}

      {isBrandModalOpen &&
      <BrandFormModal
      onClose={()=>setIsBrandModalOpen(false)}
      />}

      {isCategoryModalOpen &&
      <CategoryFormModal
      onClose={()=>setIsCategoryModalOpen(false)}
      />}

      {isProductPriceUpdateListModalOpen &&
      <ProductPriceUpdateListModal
      onClose={()=>setIsProductPriceUpdateListModalOpen(false)}
      />}

      {isProductPriceUpdateFormModalOpen &&
      <ProductPriceUpdateFormModal
      onClose={()=>setIsProductPriceUpdateFormModalOpen(false)}
      />}

      {isStockAdjFormModalOpen &&
      <StockAdjFormModal
      onClose={()=>setIsStockAdjFormModalOpen(false)}
      />}
    </div>
  );
}
