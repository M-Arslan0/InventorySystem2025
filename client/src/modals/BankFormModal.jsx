import { IoDocumentText } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { request } from "../util/fetchAPI";
import useGetAllAccounts from "../hooks/useGetAllAccounts";
import ReactSelect from "react-select";

export default function BankFormModal({ onClose }) {
  const { accountData = [], fetchAccounts } = useGetAllAccounts();

  const {
    register,
    handleSubmit,
     setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payload) => {
    try {
      const { status } = await request(
        "/bank/createBank",
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );

      if (status === 201) {
        alert("✅ Bank added successfully!");
        fetchAccounts();
        reset();
        onClose();
      }
    } catch (error) {
      console.error("Error creating bank:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "40%", margin: "0", padding: "0" }}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm uppercase font-bold">Add New Bank</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex p-5">
            <div className="w-full cards">
              <div className="card">
                {/* Header Icon */}
                <div className="card-header">
                  <div>
                    <div className="card-title">BANK DETAILS</div>
                  </div>
                  <div className="bg-blue-500 rounded-full p-4">
                    <IoDocumentText className="text-lg text-white" />
                  </div>
                </div>

                {/* Row 1: Bank Name + Branch */}
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label htmlFor="bankName">Bank Name</label>
                    <input
                      type="text"
                      id="bankName"
                      {...register("bankName", { required: true })}
                    />
                    {errors.bankName && (
                      <p className="text-red-500 text-xs">Bank Name is required</p>
                    )}
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="bankBranchCode">Branch Code</label>
                    <input type="text" id="bankBranchCode" {...register("bankBranchCode")} />
                  </div>
                </div>

                {/* Row 2: Account Title + Account Number */}
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2">
                    <label htmlFor="accountTitle">Account Title</label>
                    <input
                      type="text"
                      id="accountTitle"
                      {...register("accountTitle", { required: true })}
                    />
                    {errors.accountTitle && (
                      <p className="text-red-500 text-xs">
                        Account Title is required
                      </p>
                    )}
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                      type="text"
                      id="accountNumber"
                      {...register("accountNumber", { required: true })}
                    />
                    {errors.accountNumber && (
                      <p className="text-red-500 text-xs">
                        Account Number is required
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: IBAN + Opening Balance */}
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2">
                    <label htmlFor="bankIBAN">Bank IBAN</label>
                    <input type="text" id="bankIBAN" {...register("bankIBAN")} />
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="openingBalance">Opening Balance</label>
                    <input
                      type="number"
                      id="openingBalance"
                      {...register("openingBalance")}
                    />
                  </div>
                </div>
                  <div className="mt-1">
                  <label htmlFor="ledgerAccount">Bank Ledger A/c</label>
                  <ReactSelect
                    options={accountData?.map((acc) => ({
                      label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                      value: acc._id,
                    })) || []}
                    placeholder="Search or select account..."
                    className="text-sm bg-white"
                    onChange={(selectedOption) => setValue("ledgerAccount", selectedOption?.value)}
                    isSearchable
                    isClearable
                    menuPortalTarget={document.body} // 👈 yahan magic
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 zIndex yahan set karo
                    }}
                  />
                </div>

                {/* Row 4: Address + Notes */}
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2">
                    <label htmlFor="bankAddress">Address</label>
                    <textarea {...register("bankAddress")} rows="1"></textarea>
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="bankNote">Notes</label>
                    <textarea {...register("bankNote")} rows="1"></textarea>
                  </div>
                </div>
                       {/* Ledger Account */}


              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card flex gap-2 p-2 justify-end">
            <button type="submit">
              Save
            </button>
            <button
              type="button"
              onClick={() => reset()}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
