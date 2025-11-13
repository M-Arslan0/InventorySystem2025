import { useEffect, useState } from "react";
import { request } from "../util/fetchAPI";

export default function LedgerBookModal({ onClose, ledgerAccountId, ledgerAccountName, ledgerEntityType }) {
  const [ledgerBookData, setLedgerBookData] = useState([]);
  const [calculatedLedger, setCalculatedLedger] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, debit, credit

  const fetchLedgerBook = async () => {
    try {
      const { data, status } = await request(
        `/ledgerBook/getLedgerBy/${ledgerAccountId}?ledgerEntityType=${ledgerEntityType}`,
        "GET"
      );
      if (status === 200 && Array.isArray(data)) setLedgerBookData(data);
    } catch (error) {
      console.log("Error fetching ledger:", error);
    }
  };

  useEffect(() => {
    if (ledgerBookData.length > 0) {
      let runningBalance = 0;
      const updated = ledgerBookData.map((entry) => {
        const balanceAmount = parseFloat(entry.balanceAmount || 0);
        const isCredit = entry.transectionType?.toLowerCase() === "credit";
        runningBalance += isCredit ? -balanceAmount : +balanceAmount;

        return {
          ...entry,
          credit: isCredit ? balanceAmount : 0,
          debit: isCredit ? 0 : balanceAmount,
          runningBalance,
        };
      });
      setCalculatedLedger(updated);
    }
  }, [ledgerBookData]);

  useEffect(() => {
    fetchLedgerBook();
  }, [ledgerAccountId]);

  const filteredLedger = calculatedLedger.filter((entry) => {
    const matchesSearch =
      entry.ledgerAccount?.accountName.toLowerCase().includes(searchText.toLowerCase()) ||
      entry.ledgerEntityType.toLowerCase().includes(searchText.toLowerCase()) ||
      entry.referenceId?.voucherRefNo?.toLowerCase().includes(searchText.toLowerCase());

    if (filterType === "all") return matchesSearch;
    if (filterType === "debit") return matchesSearch && entry.debit > 0;
    if (filterType === "credit") return matchesSearch && entry.credit > 0;
    return matchesSearch;
  });


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-[95%] max-w-[1400px] overflow-hidden">
        {/* Header */}
        <div className="bg-teal-700 text-white px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase">Ledger Book</h2>
          <button className="text-white hover:text-gray-200" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <h4 className="font-semibold text-gray-700">
              Ledger Account of <span className="font-bold text-black">{ledgerAccountName}</span>
            </h4>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-3 py-1 w-48"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                className="border rounded px-2 py-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto max-h-[500px]">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100 uppercase text-gray-600 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Ledger A/c</th>
                  <th className="px-3 py-2 text-center">Entity</th>
                  <th className="px-3 py-2 text-center">Particulars</th>
                  <th className="px-3 py-2 text-center">Ref. No</th>
                  <th className="px-3 py-2 text-center">Remarks</th>
                  <th className="px-3 py-2 text-center">Credit</th>
                  <th className="px-3 py-2 text-center">Debit</th>
                  <th className="px-3 py-2 text-center">Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredLedger.map((data, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{new Date(data.ledgerDate).toLocaleDateString("en-GB")}</td>
                    <td className="px-3 py-2">{data.ledgerAccount?.accountName}</td>
                    <td className="px-3 py-2 text-center">{data.ledgerEntityType}</td>
                    <td className="px-3 py-2 text-center">{data?.referenceId?.voucherType}-{data?.referenceModel}</td>
                    <td className="px-3 py-2 text-center">{data.referenceId?.voucherRefNo}</td>
                    <td className="px-3 py-2 text-center">{data.remarks}</td>
                    <td className="px-3 py-2 text-center text-red-600">{data.credit?.toFixed(2) || "0.00"}</td>
                    <td className="px-3 py-2 text-center text-green-600">{data.debit?.toFixed(2) || "0.00"}</td>
                    <td className={`px-3 py-2 text-center font-semibold ${data.runningBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {data.runningBalance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Footer Total */}

            </table>
          </div>

          {/* Footer Buttons */}
          <div className="mt-4 flex flex-col md:flex-row gap-3 justify-between items-center">
            <input type="text" placeholder="Memo..." className="border rounded px-3 py-2 w-full md:w-2/3" />
            <div className="flex gap-2">
              <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800">Print</button>
              <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800">PDF</button>
              <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
