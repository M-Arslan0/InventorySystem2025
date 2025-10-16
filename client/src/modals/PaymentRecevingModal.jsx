import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

import AccountChartModal from "./AccountChartModal";

export default function PaymentRecevingModal({ customerId, onClose }) {
  const [customerInfo, setCustomerInfo] = useState();
  const [isAccountChartModalOpen, setIsAccountChartModalOpen] = useState(false);
  const [selectedDebitAccount, setSelectedDebitAccount] = useState(null);
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

    if (transactionType === "debit") {
      if (account?.debitAccount === customerInfo?.customerId) {
        return alert("Debit account cannot be the same as credit account");
      }
      setSelectedDebitAccount(account);
    }
    setIsAccountChartModalOpen(false);
  }

  // ✅ Fetch ledger data
  const fetchLedgerBook = async () => {
    try {
      const { data } = await request(`/ledgerBook/getCustomerBalcBy/${customerId}`, "GET");
      setCustomerInfo(data);
    } catch (error) {
      console.log("Error fetching ledger:", error);
    }
  };

  useEffect(() => {
    fetchLedgerBook();
  }, [customerId]);

  // ✅ Submit Form
  const onSubmit = async (formData) => {
    try {
      const payload = {
        //basic info
        voucherDate: formData.voucherDate,
        voucherRefNo: `RCV-${Date.now()}`, // auto reference no
        voucherType: "Receipt",
        //debit A/c from user selection
        accountDebitSource: selectedDebitAccount?.accountSource,
        debitAccount: selectedDebitAccount?.debitAccount, // e.g. Bank
        debitParentAccount: selectedDebitAccount?.parentAccountId,
        //credit A/c from customer ledger
        creditParentAccount: customerInfo?.customerledgerAcc?._id,
        accountCreditSource: "Customer",
        creditAccount: customerInfo?.customerId, // Customer Ledger

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
            Customer Payment Receiving Voucher
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cards">
            <div className="card-t bg-lt-yellow">
              <div className="card-header">
                <div>
                  <div className="card-title">{customerInfo?.customerName}</div>
                  <span className="text-sm text-[#006666]">
                    Balance Due{" "}
                    <span className="text-red-700 text-lg font-bold">
                      {customerInfo?.totalBalance?.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="card-icon-sm bg-blue">
                  <i className="fa-solid fa-user-check"></i>
                </div>
              </div>

              {/* Voucher Date */}
              <div>
                <label htmlFor="voucherDate">Receiving Date</label>
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
                <label htmlFor="voucherAmount">Amount Received</label>
                <input
                  id="voucherAmount"
                  type="number"
                  className="bg-white"
                  {...register("voucherAmount", { required: true, min: 1 })}
                />
                {errors.voucherAmount && <span className="text-red-600 text-xs">Enter valid amount</span>}
              </div>

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
                    style={{ color: "white" }}
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
                    style={{ color: "white" }}
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
                  value={customerInfo ? customerInfo?.customerName + " | " + customerInfo?.customerledgerAcc?.accountName + " | " + customerInfo?.customerledgerAcc?.accountNature + " | " + customerInfo?.customerledgerAcc?.accountType : ""}
                  placeholder="Select Credit Account"
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
