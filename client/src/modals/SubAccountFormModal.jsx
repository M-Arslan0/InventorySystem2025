import { IoDocumentText } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";
import useGetAllAccounts from "../hooks/useGetAllAccounts";

export default function SubAccountForm({ onClose }) {
  const { accountData, fetchAccounts } = useGetAllAccounts();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const onSubmit = async (payload) => {
    try {
      const { status } = await request(
        "/subAccount/createSubAccount",
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );
      if (status === 201) {
        fetchAccounts();
        reset();
      }
    } catch (error) {
      console.error("Error creating sub account:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
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

              <label>Sub Account Name</label>
              <input type="text" {...register("subAccountName", { required: true })} />
              {errors.subAccountName && <p className="text-red-500 text-xs">Required</p>}

              <label>Description</label>
              <textarea {...register("subAccountDescription")} rows="3" />

              <div className="flex w-full gap-2 mt-2">
                <div className="w-1/2 flex flex-col">
                  <label>Parent Account</label>
                  <select {...register("parentAccount", { required: true })}>
                    <option value="">Select Parent</option>
                    {accountData?.map((acc) => (
                      <option key={acc._id} value={acc._id}>
                        {acc.accountName} ({acc.accountType})
                      </option>
                    ))}
                  </select>
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
          </div>

        </div>
      </form>
    </div>
  );
}
