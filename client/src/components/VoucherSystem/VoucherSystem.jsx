import { useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../util/fetchAPI";
//Hooks
import useGetAllVouchers from "../../hooks/useGetAllVoucher";
import AccountChartModal from "../../modals/AccountChartModal";


//Icons
import { FaEllipsisV, FaEdit, FaTrash, FaEye, FaPrint, FaSync, FaSearch } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

export default function VoucherSystem() {
  const { voucherData, fetchVouchersList } = useGetAllVouchers();
  const [isAccountChartModalOpen, setIsAccountChartModalOpen] = useState(false);
  const [selectedDebitAccount, setSelectedDebitAccount] = useState(null);
  const [selectedCreditAccount, setSelectedCreditAccount] = useState(null);
  const [transactionType, setTransactionType] = useState(""); // "debit" or "credit"
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null); // 🔹 Track which row menu is open
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  //selectAccount
  const selectAccount = (account) => {
    if (transactionType === "debit") {
      if (selectedCreditAccount && selectedCreditAccount.creditAccount === account.debitAccount) {
        alert("❌ Debit aur Credit account same nahi ho sakte!");
        return;
      }
      setSelectedDebitAccount(account);
    } else if (transactionType === "credit") {
      if (selectedDebitAccount && selectedDebitAccount.debitAccount === account.creditAccount) {
        alert("❌ Debit aur Credit account same nahi ho sakte!");
        return;
      }
      setSelectedCreditAccount(account);
    }
    setIsAccountChartModalOpen(false);
  }

  const onSubmit = async (formData) => {
    try {
      const payload = {
        voucherRefNo: `RCV-${Date.now()}`,
        //debit A/c from user selection
        accountDebitSource: selectedDebitAccount?.accountSource,
        debitAccount: selectedDebitAccount?.debitAccount, // e.g. Bank
        debitParentAccount: selectedDebitAccount?.parentAccountId,
        //credit A/c from customer ledger
        accountCreditSource:  selectedCreditAccount?.accountSource,
        creditAccount:selectedCreditAccount?.creditAccount,
        creditParentAccount: selectedCreditAccount?.parentAccountId,
         // Customer Ledger
        ...formData
      }
      const { data, status } = await request(
        "/voucher/createVoucher",
        "POST",
        { "Content-Type": "application/json" },
        {...payload}
      );
      if (status === 201) {
        fetchVouchersList();
        reset();
      }
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };


  // 🔍 Filtered Voucher List
  const filteredVouchers = voucherData.filter(
    (data) =>
      data.voucherType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.amount?.toString().includes(searchTerm)
  );

  return (
    <div className="w-[100%] border-[2px] border-[#006666] rounded-lg -z-50">
      {/* Header */}
      <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
        <span className="text-sm uppercase font-bold">Voucher Management</span>
      </div>

      <div className="flex gap-2">
        {/* Left: Voucher Form */}
        <div className="w-[50%] card bg-[#f9f9f9] p-3 rounded-md shadow-sm border">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-header flex justify-between items-center mb-3">
              <div className="card-title text-[#004d4d] font-semibold">
                Create New Voucher
              </div>
              <div className="bg-blue-500 rounded-full p-3">
                <IoDocumentText className="text-lg text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Voucher Type</label>
              <select {...register("voucherType", { required: true })}>
                <option selected hidden>Select Type</option>
                <option value="Receipt">Receipt - Debit In</option>
                <option value="Payment">Payment - Debit Out</option>
                <option value="Journal">Journal - Adjustment</option>
                <option value="Contra">Contra   - Transfer</option>
              </select>

              <label>Date</label>
              <input type="date" {...register("voucherDate", { required: true })} />

              {/* Debit Account */}
              <label className="font-medium text-[#004d4d]">Debit Account</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedDebitAccount ? selectedDebitAccount?.accountName + " | " + selectedDebitAccount?.accountSource + " | " + selectedDebitAccount?.parentAccount : ""}
                  placeholder="Select Debit Account"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#006666] bg-white cursor-pointer"
                  onClick={() => {
                    setTransactionType("debit");
                    setIsAccountChartModalOpen(true);
                  }}
                />
                {selectedDebitAccount ?
                  <button
                    type="button"
                    onClick={() => { setSelectedDebitAccount(null); }}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm font-semibold"
                  >
                    Clear
                  </button>
                  :
                  <button
                    type="button"
                    onClick={() => {
                      setTransactionType("debit");
                      setIsAccountChartModalOpen(true);
                    }}
                    className="bg-[#006666] text-white px-3 py-2 rounded hover:bg-[#004d4d] text-sm font-semibold"
                  >
                    Select
                  </button>}
              </div>

              {/* Credit Account */}
              <label className="font-medium text-[#004d4d] mt-3">Credit Account</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedCreditAccount ? selectedCreditAccount?.accountName + " | " + selectedCreditAccount?.accountSource + " | " + selectedCreditAccount?.parentAccount : ""}
                  placeholder="Select Credit Account"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#006666] bg-white cursor-pointer"
                  onClick={() => {
                    setTransactionType("credit");
                    setIsAccountChartModalOpen(true);
                  }}
                />
                {selectedCreditAccount ?
                  <button
                    type="button"
                    onClick={() => { setSelectedCreditAccount(null); }}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm font-semibold"
                  >
                    Clear
                  </button>
                  :
                  <button
                    type="button"
                    onClick={() => {
                      setTransactionType("credit");
                      setIsAccountChartModalOpen(true);
                    }}
                    className="bg-[#006666] text-white px-3 py-2 rounded hover:bg-[#004d4d] text-sm font-semibold"
                  >
                    Select
                  </button>}
              </div>


              <label>Amount</label>
              <input
                type="number"
                {...register("voucherAmount", { required: true })}
                placeholder="Enter voucher Amount"
              />

              <label>Narration</label>
              <textarea {...register("narration")} className="border border-gray-300 rounded-sm p-1" rows="2" placeholder="Optional remarks" />
            </div>
            {/* Buttons */}
            <div className="flex justify-center gap-2 m-3 p-3 shadow-xl/30">
              <button className="border cursor-pointer text-[#004d4d] p-2 w-28 rounded-sm font-semibold" type="submit">Save</button>
              <button className="border cursor-pointer text-[#b83333] p-2 w-28 rounded-sm font-semibold" type="button" onClick={() => reset()}>Clear</button>
            </div>
          </form>
        </div>

        {/* Right: Voucher List */}
        <div className="w-[60%] card p-3 border-l-2 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[#004d4d] font-semibold text-lg">Voucher List</h2>
            <div className="flex gap-2">
              <div className="flex items-center border rounded px-2 bg-white">
                <FaSearch className="text-gray-500 mr-1" />
                <input
                  type="text"
                  placeholder="Search voucher..."
                  className="outline-none text-sm w-40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={fetchVouchersList}
                type="button"
                className="flex items-center gap-1 text-sm bg-[#006666] text-white px-2 py-1 rounded hover:bg-[#004d4d]"
              >
                <FaSync /> Refresh
              </button>
            </div>
          </div>

          {/* Voucher Table */}
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="td-center py-2 px-3 border">Date</th>
                <th className="td-center py-2 px-3 border">Vou. Ref</th>
                <th className="td-center py-2 px-3 border">Type</th>
                <th className="td-center py-2 px-3 border">Amount</th>
                <th className="td-left py-2 px-3 border">Naration</th>
                <th className="td-center py-2 px-3 border">Posted</th>
                <th className="td-center py-2 px-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.length > 0 ? (
                filteredVouchers.map((data) => (
                  <tr
                    key={data._id}
                    className="hover:bg-[#f4f8f8] transition-all duration-100"
                  >
                    <td className="td-left py-1 px-3">
                      {new Date(data.voucherDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="td-left py-1 px-3">{data.voucherRefNo}</td>
                    <td className="td-left py-1 px-3">{data.voucherType}</td>
                    <td className="td-right py-1 px-3">
                      {data.voucherAmount?.toFixed(2)}
                    </td>
                    <td
                      className="max-w-[180px] truncate text-left py-1 px-3"
                      title={data.narration} // hover pe full text show karega
                    >
                      {data.narration || "-"}
                    </td>
                    <td className="td-center py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${data.isPostedToLedger
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {data.isPostedToLedger ? "Posted" : "Pending"}
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
                  <td colSpan="4" className="text-center py-3 text-gray-500">
                    No vouchers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isAccountChartModalOpen &&
        <AccountChartModal
          onClose={() => setIsAccountChartModalOpen(false)}
          transactionType={transactionType}
          selectAccount={selectAccount}
        />}
    </div>
  );
}
