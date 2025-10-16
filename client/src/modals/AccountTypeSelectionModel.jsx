import { useState } from "react";
import AccountsFormModal from "./AccountsFormModal";
import SubAccountFormModal from "./SubAccountFormModal";

export default function AccountTypeSelectionModel({onClose}) {
  const [selectedType, setSelectedType] = useState("account"); // default: account

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "50%",height:"63vh", margin: "0 auto", padding: "0" }}
      >
        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm uppercase font-bold mb-2">
            Chart of Accounts
          </span>

          {/* Radio Buttons */}
          <div className="flex justify-center gap-4 bg-white text-[#006666] px-4 py-2 rounded w-[50%]">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="accountType"
                value="account"
                checked={selectedType === "account"}
                onChange={() => setSelectedType("account")}
              />
              <span>Account</span>
            </label>

            <label className="flex text-nowrap items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="accountType"
                value="subAccount"
                checked={selectedType === "subAccount"}
                onChange={() => setSelectedType("subAccount")}
              />
              <span>Sub Account</span>
            </label>
          </div>
        </div>

        {/* Conditional Rendering */}
        {selectedType === "account" ? (
          <AccountsFormModal onClose={onClose}/>
        ) : (
          <SubAccountFormModal  onClose={onClose}/>
        )}
      </div>
    </div>
  );
}
