import { useState, useEffect } from "react";
//Cards
import SupplierCards from "../SupplierCards/SupplierCards";
import SupplierInfoCards from "../SupplierCards/SupplierInfoCards";

//Modal
import SupplierRegFormModal from "../../modals/SupplierRegFormModal";
import LedgerBookModal from "../../modals/LedgerBookModal";
import PaymentGivingModal from "../../modals/PaymentGivingModal";
import SupplierReturnModal from "../../modals/SupplierReturnModal";

//Hooks
import useGetAllSuppliers from "../../hooks/useGetAllSuppliers";

//Icons
import { IoMdPersonAdd } from "react-icons/io";
import { FaCreditCard, FaRotateLeft } from "react-icons/fa6"
import { FaSync, FaEllipsisV, FaFolderOpen, FaTrash, FaEye, FaEdit, FaPrint } from "react-icons/fa";

export default function SupplierList() {
  const { supplierData, isLoading, error, fetchSuppliers } = useGetAllSuppliers();
  const [supplierInfo, setSupplierInfo] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Modal states
  const [supplierRegModalOpen, setSupplierRegModalOpen] = useState(false);
  const [ledgerBookModalOpen, setLedgerBookModalOpen] = useState(false);
  const [paymentGivingModalOpen, setPaymentGivingModalOpen] = useState(false);
  const [supplierReturnModalOpen, setSupplierReturnModalOpen] = useState(false);

  const actionButtons = [
    {
      label: "New Supplier",
      icon: <IoMdPersonAdd className="text-lg" />,
      onClick: () => setSupplierRegModalOpen(true),
      disabled: false,
    },
    {
      label: "Ledger",
      icon: <FaFolderOpen className="text-lg" />,
      onClick: () => setLedgerBookModalOpen(true),
      disabled: !supplierInfo,
    },
    {
      label: "Payments",
      icon: <FaCreditCard className="text-lg" />,
      onClick: () => setPaymentGivingModalOpen(true),
      disabled: !supplierInfo,
    },
    {
      label: "Return Items",
      icon: <FaRotateLeft className="text-lg" />,
      onClick: () => setSupplierReturnModalOpen(true),
      disabled: false,
    },
  ];

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => setFilteredSuppliers(supplierData), [supplierData]);
  useEffect(() => {
    const filtered = supplierData.filter((s) =>
      s.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [searchTerm, supplierData]);

  return (
    <div className="w-full">
      {/* Header Menu */}
      <div className="p-[1px] bg-[#d1e0e0] border-b-2 border-[#94b8b8] mb-3 flex items-center">
        <div className="w-[20%] p-2">
          <h2 className="font-bold text-[#004d4d]">SUPPLIERS</h2>
        </div>

        <div className="flex justify-start items-center gap-3">
          {actionButtons.map((btn, index) => {
            const isActive =
              (btn.label === "New Supplier" && supplierRegModalOpen) ||
              (btn.label === "Ledger" && ledgerBookModalOpen) ||
              (btn.label === "Payments" && paymentGivingModalOpen) ||
              (btn.label === "Return Items" && supplierReturnModalOpen);

            return (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-[#708090]">|</span>}
                <button
                  onClick={btn.onClick}
                  disabled={btn.disabled}
                  className={`flex items-center gap-2 px-2 py-1 rounded text-sm font-semibold transition-all
                    ${btn.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${isActive
                      ? "bg-[#006666] text-white shadow-md scale-[1.05]"
                      : "text-[#004d4d] hover:bg-gray-200"
                    }`}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layout */}
      <div className="flex justify-between">
        {/* Supplier Table */}
        <div className="w-[40%] cards p-2">
          <div className="card" style={{ minHeight: "75vh" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="card-title-info">Supplier List</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded pl-8 pr-2 py-1 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="px-3 py-1 bg-[#006666] text-white rounded flex items-center gap-1 text-sm hover:bg-[#004d4d]"
                  onClick={fetchSuppliers}
                >
                  <FaSync /> Refresh
                </button>
              </div>
            </div>

            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border text-center">#</th>
                    <th className="py-2 px-3 border text-left">Name</th>
                    <th className="py-2 px-3 border text-center">Status</th>
                    <th className="py-2 px-3 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier, index) => (
                      <tr
                        key={supplier._id}
                        className={`relative transition-all border-b ${supplier._id === supplierInfo._id ? "bg-[#f9facd]" : "hover:bg-gray-50"
                          }`}
                        onClick={() =>
                          !supplierInfo
                            ? setSupplierInfo(supplier)
                            : setSupplierInfo("")
                        }
                      >
                        <td className="py-2 px-3 text-center">{index + 1}</td>

                        <td className="py-2 px-3 cursor-pointer">
                          {supplier.supplierName}
                        </td>

                        <td className="text-center py-2 px-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${supplier.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {supplier.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td
                          className="td-center py-2 px-3 text-[#004d4d] relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(supplier._id);
                          }}
                        >
                          <FaEllipsisV className="cursor-pointer text-gray-600 hover:text-[#004d4d]" />

                          {openMenuId === supplier._id && (
                            <div className="absolute right-8 top-8 bg-white border rounded-md shadow-md z-50 w-32 text-left animate-fadeIn">
                              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm">
                                <FaEye className="text-blue-500" /> Preview
                              </button>
                              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm">
                                <FaEdit className="text-green-500" /> Edit
                              </button>
                              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm">
                                <FaTrash className="text-red-500" /> Delete
                              </button>
                              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm">
                                <FaPrint className="text-gray-500" /> Print
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-3 text-gray-500">
                        No suppliers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Info Panel */}
        <div className="w-[70%]">
          <SupplierCards totalSuppliers={supplierData.length} />
          <SupplierInfoCards supplierInfo={supplierInfo} />
        </div>
      </div>

      {/* Modals */}
      {supplierRegModalOpen && (
        <SupplierRegFormModal onClose={() => setSupplierRegModalOpen(false)} />
      )}

      {ledgerBookModalOpen && (
        <LedgerBookModal
          onClose={() => setLedgerBookModalOpen(false)}
          ledgerAccountId={supplierInfo._id}
          ledgerAccountName={supplierInfo.supplierName}
          ledgerEntityType="Supplier"
        />
      )}

      {paymentGivingModalOpen && (
        <PaymentGivingModal
          onClose={() => setPaymentGivingModalOpen(false)}
          supplierId={supplierInfo._id}
        />
      )}

      {supplierReturnModalOpen && (
        <SupplierReturnModal onClose={() => setSupplierReturnModalOpen(false)} />
      )}
    </div>
  );
}
