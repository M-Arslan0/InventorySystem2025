import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

import AccountChartModal from "./AccountChartModal";

export default function PaymentGivingModal({ supplierId, onClose }) {
  const [supplierInfo, setSupplierInfo] = useState();
  const [isAccountChartModalOpen, setIsAccountChartModalOpen] = useState(false);
  const [selectedCreditAccount, setSelectedCreditAccount] = useState(null);
  const [transactionType, setTransactionType] = useState(""); // "debit" or "credit"

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  //selectAccount
  const selectAccount = (account) => {
    if (transactionType === "credit") {
      if (account?.creditAccount === supplierInfo?.supplierId) {
        return alert("Credit account cannot be the same as debit account");
      }
      setSelectedCreditAccount(account);
    }
    setIsAccountChartModalOpen(false);
  }

  // ✅ Fetch ledger data
  const fetchLedgerBook = async () => {
    try {
      const { data } = await request(`/ledgerBook/getSupplierBalcBy/${supplierId}`, "GET");
      setSupplierInfo(data);
    } catch (error) {
      console.log("Error fetching ledger:", error);
    }
  };

  useEffect(() => {
    fetchLedgerBook();
  }, [supplierId]);

  // ✅ Submit Form
  const onSubmit = async (formData) => {
    try {
      const payload = {
        //basic info
        voucherDate: formData.voucherDate,
        voucherRefNo: `PAY-${Date.now()}`, // auto reference no
        voucherType: "Payment",
        //debit A/c from supplier ledger
        debitParentAccount: supplierInfo?.supplierledgerAcc?._id,
        accountDebitSource: "Supplier",
        debitAccount: supplierInfo?.supplierId, // Supplier Ledger
        //credit A/c from user selection
        creditParentAccount: selectedCreditAccount?.parentAccountId,
        accountCreditSource: selectedCreditAccount?.accountSource,
        creditAccount: selectedCreditAccount?.creditAccount, // e.g. Bank / Cash

        //amount
        voucherAmount: Number(formData.voucherAmount),
        narration: formData.narration || "",
      };

      const { data, status } = await request(
        "/voucher/createVoucher",
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );

      if (status === 201) {
        alert("✅ Payment voucher created successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "40%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Supplier Payment Voucher
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cards">
            <div className="card-t bg-lt-yellow">
              <div className="card-header">
                <div>
                  <div className="card-title">{supplierInfo?.supplierName}</div>
                  <span className="text-sm text-[#006666]">
                    Balance Due{" "}
                    <span className="text-red-700 text-lg font-bold">
                      {supplierInfo?.totalBalance?.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="card-icon-sm bg-blue">
                  <i className="fa-solid fa-user-check"></i>
                </div>
              </div>

              {/* Voucher Date */}
              <div>
                <label htmlFor="voucherDate">Payment Date</label>
                <input
                  id="voucherDate"
                  type="date"
                  className="bg-white"
                  {...register("voucherDate", { required: true })}
                />
                {errors.voucherDate && <span className="text-red-600 text-xs">Required</span>}
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="voucherAmount">Amount Paid</label>
                <input
                  id="voucherAmount"
                  type="number"
                  className="bg-white"
                  {...register("voucherAmount", { required: true, min: 1 })}
                />
                {errors.voucherAmount && <span className="text-red-600 text-xs">Enter valid amount</span>}
              </div>

              {/* Credit Account (user-selected) */}
              <label className="font-medium text-[#004d4d]">Credit Account</label>
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
                    style={{ color: "white" }}
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
                    style={{ color: "white" }}
                    className="bg-[#006666] text-white px-3 py-2 rounded hover:bg-[#004d4d] text-sm font-semibold"
                  >
                    Select
                  </button>}
              </div>

              {/* Debit Account (supplier ledger, default) */}
              <label className="font-medium text-[#004d4d] mt-3">Debit Account</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={supplierInfo ? supplierInfo?.supplierName + " | " + supplierInfo?.supplierledgerAcc?.accountName + " | " + supplierInfo?.supplierledgerAcc?.accountNature + " | " + supplierInfo?.supplierledgerAcc?.accountType : ""}
                  placeholder="Supplier Ledger"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#006666] bg-white cursor-pointer"
                  disabled
                />
                <button
                  type="button"
                  style={{ color: "white", backgroundColor: "#3d61f2" }}
                  disabled
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm font-semibold"
                >
                  Default
                </button>
              </div>

              {/* Narration */}
              <div>
                <label htmlFor="narration">Narration</label>
                <textarea id="narration" className="bg-white" {...register("narration")} />
              </div>
            </div>

            {/* Buttons */}
            <div className="card text-sm">
              <button type="submit" style={{ width: "100%", marginBottom: "5px" }}>
                SAVE
              </button>
              <button type="button" className="m-0.5">
                Print
              </button>
              <button type="button" className="m-0.5" onClick={() => reset()}>
                Clear
              </button>
              <button type="button" className="m-0.5" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </form>
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
