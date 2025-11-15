import { useState, useEffect } from "react";

//Modal
import LedgerBookModal from "../../modals/LedgerBookModal";
//Hooks
import useGetAllBank from "../../hooks/useGetAllBank";

//Icons
import { FaEllipsisV, FaEdit, FaTrash, FaEye, FaPrint, FaSync } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
export default function BankList() {
  const { bankData = [], fetchBanks, isLoading, error } = useGetAllBank();
  const [bankInfo, setBankInfo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null); // 🔹 Track which row menu is open

  // Modal states
  const [ledgerBookModalOpen, setLedgerBookModalOpen] = useState(false);

  // 🔍 Filter accounts on search
  useEffect(() => {
    const filtered = bankData.filter((bank) =>
      bank.bankName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.accountTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [searchTerm, bankData]);

  // 🔹 Toggle menu for specific row
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // 🔹 Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white relative">
      {/* 🔹 Header Section */}
      <div className="flex justify-between items-center p-4 border-b-2 border-[#b0c4c4] bg-[#f9f9f9]">
        <h2 className="text-lg font-bold text-[#004d4d]">Bank List</h2>

        {/* 🔍 Search + Refresh */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search bank..."
            className="pl-3 pr-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006666]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center gap-1 px-3 py-1 bg-[#006666] text-white text-sm rounded hover:bg-[#004d4d] transition-all"
            onClick={fetchBanks}
          >
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {/* 🔹 Table Section */}
      <div className="p-3 m-2">
        {isLoading ? (
          <p className="text-center text-gray-500 py-4">Loading accounts...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">Error: {error}</p>
        ) : (
          <table className="w-full border-collapse text-sm relative">
            <thead>
              <tr className="bg-gray-100 text-[#004d4d] font-semibold border-b">
                <th className="text-left py-2 px-3 border">#</th>
                <th className="text-left py-2 px-3 border">Bank Name</th>
                <th className="text-center py-2 px-3 border">Branch Code</th>
                <th className="text-left py-2 px-3 border">A/c Title</th>
                <th className="text-center py-2 px-3 border">A/c Number</th>
                <th className="text-center py-2 px-3 border">Bank IBAN</th>
                <th className="text-center py-2 px-3 border">Ledger A/c</th>
                <th className="text-center py-2 px-3 border">Status</th>
                <th className="text-center py-2 px-3 border"></th>
              </tr>
            </thead>

            <tbody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((data, index) => (
                  <tr
                    key={data._id}
                    className="hover:bg-[#f9f9f9] transition-all border-b relative"
                  >
                    <td className="text-left py-2 px-3">{index + 1}</td>
                    <td className="text-left py-2 px-3 font-semibold">{data.bankName}</td>
                    <td className="text-center py-2 px-3">{data.bankBranchCode}</td>
                    <td className="text-left py-2 px-3">{data.accountTitle}</td>
                    <td className="text-center py-2 px-3">{data.accountNumber}</td>
                    <td className="text-center py-2 px-3">{data.bankIBAN}</td>
                    <td className="text-center py-2 px-3">{data.ledgerAccount?.accountName} | {data.ledgerAccount?.accountNature} | {data.ledgerAccount?.accountType}</td>
                    <td className="td-center py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${data.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* 🔹 Burger Menu Icon */}
                    <td
                      className="td-center py-2 px-3 text-[#004d4d] relative"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent closing immediately
                        toggleMenu(data._id);
                      }}
                    >
                      <FaEllipsisV className="cursor-pointer text-gray-600 hover:text-[#004d4d]" />

                      {/* 🔽 Dropdown Menu */}
                      {openMenuId === data._id && (
                        <div className="absolute right-8 top-8 bg-white border rounded-md shadow-md z-50 w-32 text-left animate-fadeIn">
                          <button
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => { setLedgerBookModalOpen(true); setBankInfo(data); }}
                          >
                            <FaBook className="text-blue-500" /> Ledger
                          </button>
                          <button
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => console.log("Preview", data)}
                          >
                            <FaEye className="text-blue-500" /> Preview
                          </button>
                          <button
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => console.log("Edit", data)}
                          >
                            <FaEdit className="text-green-500" /> Edit
                          </button>
                          <button
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => console.log("Delete", data._id)}
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
                  <td colSpan="7" className="text-center py-3 text-gray-500">
                    No accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {ledgerBookModalOpen && (
        <LedgerBookModal
          onClose={() => setLedgerBookModalOpen(false)}
          ledgerAccountId={bankInfo._id}
          ledgerAccountName={bankInfo.bankName}
          ledgerEntityType="Bank"
        />
      )}
    </div>
  );
}
