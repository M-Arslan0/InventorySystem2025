import { useState, useEffect } from "react";
//Cards
import CustomerCards from "../CustomerCards/CustomerCards";
import CustomerInfoCards from "../CustomerCards/CustomerInfoCards";

//Modal
import CustomerRegFormModal from "../../modals/CustomerRegFormModal";
import LedgerBookModal from "../../modals/LedgerBookModal";
import PaymentRecevingModal from "../../modals/PaymentRecevingModal";
import CustomerReturnModal from "../../modals/CustomerReturnModal";

//Hooks
import useGetAllCustomers from "../../hooks/useGetAllCustomer";

//Icons
import { IoMdPersonAdd } from "react-icons/io";
import { FaCreditCard, FaRotateLeft } from "react-icons/fa6"
import { FaSync, FaEllipsisV, FaFolderOpen, FaTrash, FaEye, FaEdit, FaPrint } from "react-icons/fa";

export default function CustomerList() {
  const { customerData, isLoading, error, fetchCustomers } = useGetAllCustomers();
  const [customerInfo, setCustomerInfo] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Modal states
  const [custumerRegModalOpen, setCustumerRegModalOpen] = useState(false);
  const [ledgerBookModalOpen, setLedgerBookModalOpen] = useState(false);
  const [paymentRecevingModalOpen, setPaymentRecevingModalOpen] = useState(false);
  const [customerReturnModalOpen, setCustomerReturnModalOpen] = useState(false);

  const actionButtons = [
    {
      label: "New Customer",
      icon: <IoMdPersonAdd className="text-lg" />,
      onClick: () => setCustumerRegModalOpen(true),
      disabled: false,
    },
    {
      label: "Ledger",
      icon: <FaFolderOpen className="text-lg" />,
      onClick: () => setLedgerBookModalOpen(true),
      disabled: !customerInfo,
    },
    {
      label: "Payments",
      icon: <FaCreditCard className="text-lg" />,
      onClick: () => setPaymentRecevingModalOpen(true),
      disabled: !customerInfo,
    },
    {
      label: "Return Items",
      icon: <FaRotateLeft className="text-lg" />,
      onClick: () => setCustomerReturnModalOpen(true),
      disabled: false,
    },
  ];

  // 🔹 Toggle menu for specific row
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => setFilteredCustomers(customerData), [customerData]);
  useEffect(() => {
    const filtered = customerData.filter((c) =>
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customerData]);

  return (
    <div className="w-full">
      {/* Header Menu */}
      <div className="p-[1px] bg-[#d1e0e0] border-b-2 border-[#94b8b8] mb-3 flex items-center">
        <div className="w-[20%] p-2">
          <h2 className="font-bold text-[#004d4d]">CUSTOMERS</h2>
        </div>

        <div className="flex justify-start items-center gap-3">
          {actionButtons.map((btn, index) => {
            const isActive =
              (btn.label === "New Customer" && custumerRegModalOpen) ||
              (btn.label === "Ledger" && ledgerBookModalOpen) ||
              (btn.label === "Payments" && paymentRecevingModalOpen) ||
              (btn.label === "Return Items" && customerReturnModalOpen);

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
        {/* Customer Table */}
        <div className="w-[40%] cards p-2">
          <div className="card" style={{ minHeight: "75vh" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="card-title-info">Customer List</h2>
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
                  onClick={fetchCustomers}
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
                    <th className="td-left py-2 px-3 border">#</th>
                    <th className="td-left py-2 px-3 border">Name</th>
                    <th className="td-center py-2 px-3 border">Status</th>
                    <th className="td-center py-2 px-3 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, index) => (
                      <tr
                        key={customer._id}
                        className={`relative transition-all border-b ${customer._id === customerInfo._id ? "bg-[#f9facd]" : "hover:bg-gray-50"
                          }`}
                        onClick={() => !customerInfo ? setCustomerInfo(customer) : setCustomerInfo("")}
                      >
                        <td className="py-2 px-3">{index + 1}</td>
                        <td
                          className="py-2 px-3 cursor-pointer"

                        >
                          {customer.customerName}
                        </td>
                        <td className="td-center py-2 px-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${customer.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {customer.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Burger Menu */}
                        <td
                          className="td-center py-2 px-3 text-[#004d4d] relative"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent closing immediately
                            toggleMenu(customer._id);
                          }}
                        >
                          <FaEllipsisV className="cursor-pointer text-gray-600 hover:text-[#004d4d]" />

                          {/* 🔽 Dropdown Menu */}
                          {openMenuId === customer._id && (
                            <div className="absolute right-8 top-8 bg-white border rounded-md shadow-md z-50 w-32 text-left animate-fadeIn">
                              <button
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                                onClick={() => console.log("Preview", customer)}
                              >
                                <FaEye className="text-blue-500" /> Preview
                              </button>
                              <button
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                                onClick={() => console.log("Edit", customer)}
                              >
                                <FaEdit className="text-green-500" /> Edit
                              </button>
                              <button
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                                onClick={() => console.log("Delete", customer._id)}
                              >
                                <FaTrash className="text-red-500" /> Delete
                              </button>
                              <button
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                                onClick={() => console.log("Print", data)}
                              >
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
                        No customers found
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
          <CustomerCards totalCustomers={customerData.length} />
          <CustomerInfoCards customerInfo={customerInfo} />
        </div>
      </div>

      {/* Modals */}
      {custumerRegModalOpen && (
        <CustomerRegFormModal onClose={() => setCustumerRegModalOpen(false)} />
      )}
      {ledgerBookModalOpen && (
        <LedgerBookModal
          onClose={() => setLedgerBookModalOpen(false)}
          ledgerAccountId={customerInfo._id}
          ledgerAccountName={customerInfo.customerName}
          ledgerEntityType="Customer"
        />
      )}
      {paymentRecevingModalOpen && (
        <PaymentRecevingModal
          onClose={() => setPaymentRecevingModalOpen(false)}
          customerId={customerInfo._id}
        />
      )}
      {customerReturnModalOpen && (
        <CustomerReturnModal onClose={() => setCustomerReturnModalOpen(false)} />
      )}
    </div>
  );
}
