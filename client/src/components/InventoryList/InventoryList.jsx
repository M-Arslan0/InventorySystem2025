import { useState } from "react";
import ReactSelect from "react-select";
// Hooks
import useGetAllBrands from "../../hooks/useGetAllBrand";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import useGetAllProducts from "../../hooks/useGetAllProducts";
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
import { FaExclamationTriangle, FaClipboardList } from "react-icons/fa";
// Modals
import ProductRegFormModal from "../../modals/ProductRegFromModal";
import BrandFormModal from "../../modals/BrandFormModal";
import CategoryFormModal from "../../modals/CategoryFormModal";
import ProductPriceUpdateListModal from "../../modals/ProductPriceUpdateListModal";
import ProductPriceUpdateFormModal from "../../modals/ProductPriceUpdateFormModal";
import StockAdjFormModal from "../../modals/StockAdjFormModal";


export default function InventoryList() {
  //Hooks
  const { products, refetchProduct, isLoading } = useGetAllProducts();
  const { brandData = [] } = useGetAllBrands();
  const { categoryData = [] } = useGetAllCategories();
  //Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductPriceUpdateListModalOpen, setIsProductPriceUpdateListModalOpen] = useState(false);
  const [isProductPriceUpdateFormModalOpen, setIsProductPriceUpdateFormModalOpen] = useState(false);
  const [isStockAdjFormModalOpen, setIsStockAdjFormModalOpen] = useState(false);
  //Search
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 📌 Page Menu Config
  const pageMenu = [
    { label: "Add New Item", icon: FaBoxArchive, onClick: () => setIsProductModalOpen(true) },
    { label: "Add Brand", icon: FaBeerMugEmpty, onClick: () => setIsBrandModalOpen(true) },
    { label: "Add Category", icon: FaDolly, onClick: () => setIsCategoryModalOpen(true) },
    { label: "Update Prices", icon: FaPenNib, onClick: () => setIsProductPriceUpdateFormModalOpen(true) },
    { label: "Update Prices List", icon: FaClipboardList, onClick: () => setIsProductPriceUpdateListModalOpen(true) },
    { label: "Stock Adjustment", icon: FaSliders, onClick: () => setIsStockAdjFormModalOpen(true) },
  ];


const lowStockCount = products
  ? products.filter(p => p.currentQty <= p.minQty).length
  : "--";

const outOfStockCount = products
  ? products.filter(p => p.currentQty <= 0).length
  : "--";

const stockCards = [
  { title: "Low Stock", value: lowStockCount, icon: FaExclamationTriangle, color: "text-orange-500" },
  { title: "Out of Stock", value: outOfStockCount, icon: FaHourglass, color: "text-green-600" },
  { title: "Wrong Price", value: "--", icon: FaDownLong, color: "text-pink-500" },
  { title: "Dead Stock", value: "--", icon: FaExclamationTriangle, color: "text-purple-600" },
];

const filteredProducts = products.filter((p) => {
  const matchesSearch =
    p.productName?.toLowerCase().includes(search.toLowerCase()) ||
    p.productCode?.toLowerCase().includes(search.toLowerCase());

  // handle populated object or plain id
  const productBrandId = typeof p.brandId === "object" ? p.brandId?._id : p.brandId;
  const productCategoryId = typeof p.categoryId === "object" ? p.categoryId?._id : p.categoryId;

  const matchesBrand = selectedBrand ? productBrandId === selectedBrand : true;
  const matchesCategory = selectedCategory ? productCategoryId === selectedCategory : true;

  return matchesSearch && matchesBrand && matchesCategory;
});



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
            <div className="flex gap-2 mb-4">
              <input
                type="search"
                placeholder="Search Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg p-2 flex-1 shadow-sm focus:ring-2 focus:ring-blue-300"
              />

              <ReactSelect
                options={brandData.map(d => ({ label: d.brandName, value: d._id }))}
                placeholder="Brand"
                className="w-40"
                onChange={e => setSelectedBrand(e?.value || "")}
                isClearable
              />
              <ReactSelect
                options={categoryData.map(d => ({ label: d.categoryName, value: d._id }))}
                placeholder="Category"
                className="w-40"
                onChange={e => setSelectedCategory(e?.value || "")}
                isClearable
              />
              <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
                onClick={() => refetchProduct()}>
                Refresh
              </button>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("");
                  setSelectedCategory("");
                }}
                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                RESET
              </button>
            </div>

            {/* Table */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    {["CODE", "PRODUCT NAME", "COST", "SP RATE", "WHOLE SALE", "RETAIL", "In-Hand"].map((h, i) => (
                      <th key={i} className="p-2 text-sm font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((data, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-2">{data.productCode}</td>
                      <td className="p-2 w-[30%]">{data.productName}</td>
                      <td className="p-2 text-center">{data.productCost.toFixed(2)}</td>
                      <td className="p-2 text-center">{data.productSpRate.toFixed(2)}</td>
                      <td className="p-2 text-center">{data.productWhRate.toFixed(2)}</td>
                      <td className="p-2 text-center">{data.productRtRate.toFixed(2)}</td>
                      <td className="p-2 text-center">{data.currentQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
                  {products.filter((data)=>data.currentQty <=  0).map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.productName}</td>
                      <td>{item.currentQty}</td>
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
          onClose={() => setIsProductModalOpen(false)}
        />}

      {isBrandModalOpen &&
        <BrandFormModal
          onClose={() => setIsBrandModalOpen(false)}
        />}

      {isCategoryModalOpen &&
        <CategoryFormModal
          onClose={() => setIsCategoryModalOpen(false)}
        />}

      {isProductPriceUpdateListModalOpen &&
        <ProductPriceUpdateListModal
          onClose={() => setIsProductPriceUpdateListModalOpen(false)}
        />}

      {isProductPriceUpdateFormModalOpen &&
        <ProductPriceUpdateFormModal
          onClose={() => setIsProductPriceUpdateFormModalOpen(false)}
        />}

      {isStockAdjFormModalOpen &&
        <StockAdjFormModal
          onClose={() => setIsStockAdjFormModalOpen(false)}
        />}
    </div>
  );
}
