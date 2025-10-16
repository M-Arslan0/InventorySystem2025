import React, { useEffect, useState, useMemo } from "react";
import { FaXmark } from "react-icons/fa6";
import useGetAllAccountsWithChild from "../hooks/useGetAllAccountsWithChild";
import { FaSync } from "react-icons/fa";
import "./Modal.css";

export default function AccountChartModal({ onClose, selectAccount, transactionType }) {
  const { accountChildData, fetchAccountsWithChilds } = useGetAllAccountsWithChild();
  console.log(accountChildData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [natureFilter, setNatureFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const natureOptions = ["Asset", "Liability", "Income", "Expense", "Equity"];
  const typeOptions = [
    "Receivable",
    "Payable",
    "Cash",
    "Bank",
    "Capital",
    "Others",
  ];

  // 🧠 Extract unique account sources
  const sourceOptions = useMemo(() => {
    if (!accountChildData) return [];
    const unique = [
      ...new Set(accountChildData.map((acc) => acc.accountSource).filter(Boolean)),
    ];
    return unique;
  }, [accountChildData]);

  // ⚡ Auto filtering (no button)
  useEffect(() => {
    if (!accountChildData) return;

    const filtered = accountChildData.filter((acc) => {
      const nameMatch = acc.accountChildId?.customerName || acc.accountChildId?.bankName || acc.accountChildId?.subAccountName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const natureMatch = natureFilter
        ? acc.accountGroupId?.accountNature === natureFilter
        : true;
      const typeMatch = typeFilter
        ? acc.accountGroupId?.accountType === typeFilter
        : true;
      const sourceMatch = sourceFilter
        ? acc.accountSource === sourceFilter
        : true;

      return nameMatch && natureMatch && typeMatch && sourceMatch;
    });

    setFilteredData(filtered);
  }, [searchTerm, natureFilter, typeFilter, sourceFilter, accountChildData]);

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "70%", backgroundColor: "white", height: "80vh", margin: "0", padding: "0", overflow: "auto" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Chart Of A/c</span>
          <button
            onClick={onClose}
            style={{ width: "15%" }}
            className="flex items-center justify-center gap-1 bg-white text-[#006666] px-3 py-1 rounded-md font-semibold ml-auto hover:bg-teal-50"
          >
            <FaXmark className="text-lg" /> Close
          </button>
        </div>
        {/* Header */}
        {/* Filters */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 ">
          <input
            type="text"
            placeholder="Search by Account Name..."
            className="border border-gray-300 rounded px-3 py-2 w-[30%]"
            style={{ width: "60%" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={natureFilter}
            onChange={(e) => setNatureFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            style={{ width: "20%" }}
          >
            <option value="">All Natures</option>
            {natureOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            style={{ width: "20%" }}
          >
            <option value="">All Types</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            style={{ width: "20%" }}
          >
            <option value="">All Sources</option>
            {sourceOptions.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>

          <button
          style={{ width: "15%", color:"white"}}
            className="flex items-center justify-center gap-1 px-3 py-1 bg-[#006666] text-white text-sm rounded hover:bg-[#004d4d] transition-all"
            onClick={fetchAccountsWithChilds}
          >
            <FaSync /> Refresh
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-y-auto flex-1">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-[#004d4d] font-semibold border-b sticky top-0">
                <th className="py-2 px-3 border">ID</th>
                <th className="py-2 px-3 border text-left">Sub A/c Name</th>
                <th className="py-2 px-3 border text-center">Source</th>
                <th className="py-2 px-3 border text-center">Parent A/c</th>
                <th className="py-2 px-3 border text-center">Nature</th>
                <th className="py-2 px-3 border text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr
                    key={data._id}
                    onClick={() => selectAccount({
                      [transactionType + "Account"]: data?.accountChildId?._id,
                      accountName: data.accountChildId?.customerName || data.accountChildId?.bankName || data.accountChildId?.subAccountName,
                      accountSource: data.accountSource,
                      parentAccountId: data.accountGroupId?._id,
                      parentAccount: data.accountGroupId?.accountName,
                    })}
                    className="hover:bg-[#f9f9f9] cursor-pointer border-b"
                  >
                    <td className="py-2 px-3 text-center">{index + 1}</td>
                    <td className="py-2 px-3 font-semibold">
                      {data.accountChildId?.customerName || data.accountChildId?.bankName || data.accountChildId?.subAccountName}
                    </td>
                    <td className="py-2 px-3 text-center font-semibold">
                      {data.accountSource}
                    </td>
                    <td className="py-2 px-3 text-center font-semibold">
                      {data.accountGroupId?.accountName}
                    </td>
                    <td className="py-2 px-3 text-center text-blue-700 font-semibold">
                      {data.accountGroupId?.accountNature}
                    </td>
                    <td className="py-2 px-3 text-center text-blue-700 font-semibold">
                      {data.accountGroupId?.accountType}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3 text-gray-500">
                    No accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
