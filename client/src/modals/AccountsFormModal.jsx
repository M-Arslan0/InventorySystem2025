import { IoDocumentText } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

export default function AccountsFormModal({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payload) => {
    try {
      const { data, status } = await request(
        "/account/createAccount",
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );
      if (status === 201) {
        onClose();
      }
    } catch (error) {
      console.error("Error creating account:", error);
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
          <span className="text-sm uppercase font-bold">Chart of Accounts</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex p-5">
            <div className="w-full cards">
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">ACCOUNT DETAILS</div>
                  </div>
                  <div className="bg-blue-500 rounded-full p-4">
                    <IoDocumentText className="text-lg text-white" />
                  </div>
                </div>

                {/* Account Name */}
                <label htmlFor="accountName">Account Name</label>
                <input
                  type="text"
                  id="accountName"
                  {...register("accountName", { required: true })}
                />
                {errors.accountName && (
                  <p className="text-red-500 text-xs">Account Name is required</p>
                )}

                {/* Description */}
                <label htmlFor="description">Description</label>
                <textarea {...register("accountDescription")} rows="3"></textarea>

                {/* Nature & Type */}
                <div className="flex w-full gap-2 mt-2">
                  <div className="w-1/2 flex flex-col">
                    <label htmlFor="accountNature">Nature</label>
                    <select {...register("accountNature", { required: true })}>
                      <option value="">Select Nature</option>
                      <option value="Asset">Asset</option>
                      <option value="Liability">Liability</option>
                      <option value="Equity">Equity</option>
                      <option value="Revenue">Revenue</option>
                      <option value="Expense">Expense</option>
                    </select>
                    {errors.nature && (
                      <p className="text-red-500 text-xs">Nature is required</p>
                    )}
                  </div>

                  <div className="w-1/2 flex flex-col">
                    <label htmlFor="accountType">Type</label>
                    <select {...register("accountType", { required: true })}>
                      <option value="">Select Type</option>
                      <option value="Receivable">Receivable</option>
                      <option value="Payable">Payable</option>
                      <option value="Capital">Capital</option>
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-xs">Type is required</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card flex gap-2 p-2">
            <button type="submit">Save</button>
            <button type="button" onClick={() => reset()}>
              Clear
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
