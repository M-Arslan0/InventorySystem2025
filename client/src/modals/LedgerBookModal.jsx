import { useEffect, useState } from "react";
import { request } from "../util/fetchAPI";

export default function LedgerBookModal({ onClose, ledgerAccountId }) {
  const [ledgerBookData, setLedgerBookData] = useState([]);
  const [calculatedLedger, setCalculatedLedger] = useState([]);

  // ✅ Fetch ledger data
  const fetchLedgerBook = async () => {
    try {
      const { data, status } = await request(
        `/ledgerBook/getLedger/${ledgerAccountId}`,
        "GET"
      );
      if (status === 200 && Array.isArray(data)) {
        setLedgerBookData(data);
      }
    } catch (error) {
      console.log("Error fetching ledger:", error);
    }
  };

  // ✅ Calculate running balance
  useEffect(() => {
    if (ledgerBookData.length > 0) {
      let runningBalance = 0;
      const updated = ledgerBookData.map((entry) => {
        const amount = parseFloat(entry.amount || 0);
        const isCredit = entry.transectionType?.toLowerCase() === "credit";

        // Credit increases balance, Debit decreases
        runningBalance += isCredit ? amount : -amount;

        return {
          ...entry,
          credit: isCredit ? amount : 0,
          debit: isCredit ? 0 : amount,
          runningBalance,
        };
      });
      setCalculatedLedger(updated);
    }
  }, [ledgerBookData]);

  useEffect(() => {
    fetchLedgerBook();
  }, [ledgerAccountId]);

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{
          maxWidth: "70%",
          backgroundColor: "white",
          margin: "0",
          padding: "0",
        }}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Ledger Book
          </span>
        </div>

        <form>
          <div className="cards">
            <div className="card">
              {/* Filter Header */}
              <div className="w-[100%] flex justify-between p-2">
                <div className="w-[60%]">
                  <h4>
                    Ledger Account of <span>Customer</span>
                  </h4>
                </div>
                <div className="w-[35%] flex gap-2">
                  <input type="date" />
                  <input type="date" />
                  <button
                    style={{ width: "95%", padding: "8px" }}
                    type="button"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>

              {/* Ledger Table */}
              <table className="w-full border mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th>DATE</th>
                    <th className="td-left">PARTICULARS</th>
                    <th className="td-left">REMARKS</th>
                    <th className="td-right">CREDIT</th>
                    <th className="td-right">DEBIT</th>
                    <th className="td-right">BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {calculatedLedger.map((data, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="text-start">
                        {new Date(data.ledgerDate).toLocaleDateString("en-GB")}
                      </td>
                      <td>{data.ledgerEntityType || "Transaction"}</td>
                      <td>{data.remarks}</td>
                      <td className="td-right">
                        {data.credit ? data.credit.toFixed(2) : "0.00"}
                      </td>
                      <td className="td-right">
                        {data.debit ? data.debit.toFixed(2) : "0.00"}
                      </td>
                      <td
                        className={`td-right font-semibold ${
                          data.runningBalance >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {data.runningBalance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <br />

              {/* Footer Buttons */}
              <div className="flex gap-2 justify-between">
                <div className="w-[65%]">
                  <input type="text" placeholder="Memo.....!" />
                </div>
                <div className="w-[30%] flex gap-2">
                  <button type="button">Print</button>
                  <button type="button">PDF</button>
                  <button type="button" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
