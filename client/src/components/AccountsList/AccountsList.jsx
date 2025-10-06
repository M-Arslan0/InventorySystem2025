import { useState } from "react";

// Tabs
import DayEnd from "../Tabs/DayEnd";
import Expense from "../Tabs/Expense";
import TransferTab from "../Tabs/TransferTab";

// Modals
import AccountsFormModal from "../../modals/AccountsFormModal";

export default function AccountsList() {
  const [activeTab, setActiveTab] = useState("#dayEnd");
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const menuItems = [
    {
      title: "Add Account",
      onClick: () => setIsAccountModalOpen(true),
    },
    {
      title: "Day End",
      key: "#dayEnd",
    },
    {
      title: "Add Expenses",
      key: "#expenses",
    },
    {
      title: "Bank Accounts",
      key: "#bank",
    },
  ];

  const handleMenuClick = (item) => {
    if (item.key) setActiveTab(item.key);
    if (item.onClick) item.onClick();
  };

  return (
    <div>
      {/* Top Menu */}
      <div className="p-5px bg-[#d1e0e0] border-b-2 border-[#94b8b8] mb-5 flex items-center">
        <div className="w-[20%] p-2">
          <h2>ACCOUNT</h2>
        </div>

        <div className="flex justify-start items-start">
          {menuItems.map((item, index) => (
            <button
              key={item.key || item.title}
              className="text-sm font-semibold"
              onClick={() => handleMenuClick(item)}
            >
              {item.title}
              {index < menuItems.length - 1 && <span className="m-2">|</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="w-full flex">
        {/* Left column with Tabs */}
        <div className="cards w-[35%]">
          {activeTab === "#dayEnd" && <DayEnd />}
          {activeTab === "#expenses" && <Expense />}
          {activeTab === "#bank" && <TransferTab />}
        </div>

        {/* Right Column */}
        <div className="cards w-[65%]">
          <div className="card">
            <h3>ABC</h3>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isAccountModalOpen && (
        <AccountsFormModal onClose={() => setIsAccountModalOpen(false)} />
      )}
    </div>
  );
}
