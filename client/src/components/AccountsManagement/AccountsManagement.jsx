import { useState } from "react";

// Tabs
import DayEnd from "../Tabs/DayEnd";

// Modals
import AccountTypeSelectionModel from "../../modals/AccountTypeSelectionModel";
import AccountList from "../AccountList/AccountList";
import VoucherSystem from "../VoucherSystem/VoucherSystem";
import BankFormModal from "../../modals/BankFormModal";
import BankList from "../BankList/BankList";

// Icons (optional for better UX)
import { FaPlus, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa6";
import { FaUniversity, FaChartBar, FaBook  } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import SubAccountList from "../SubAccountList/SubAccountList";



export default function AccountsManagement() {
  const [activeTab, setActiveTab] = useState("#accountList");
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  // ✅ Dynamic tab config array
  const tabItems = [
    {
      key: "#addAccount",
      title: "Add Account",
      icon: <FaPlus />,
      onClick: () => setIsAccountModalOpen(true),
    },
    {
      key: "#accountList",
      title: "Accounts",
      icon: <FaChartBar />,
      onClick: () => setActiveTab("#accountList"),
    },
    {
      key: "#subaccount",
      title: "Sub Accounts",
      icon: <FaChartBar />,
      onClick: () => setActiveTab("#subaccount"),
    },

    {
      key: "#voucher",
      title: "Voucher",
      icon: <IoDocumentTextSharp/>,
      onClick: () => setActiveTab("#voucher"),
    },
    {
      key: "#bank",
      title: "Add Bank",
      icon: < FaPlus />,
      onClick: () => setIsBankModalOpen(true),
    },
    {
      key: "#banklist",
      title: "Bank List",
      icon: <FaUniversity/>,
      onClick: () => setActiveTab("#banklist"),
    },
    {
      key: "#dayEnd",
      title: "Day End",
      icon: <FaCalendarCheck />,
      onClick: () => setActiveTab("#dayEnd"),
    },
  ];

  return (
    <div>
      {/* ✅ Top Menu */}
      <div className="p-[1px] bg-[#d1e0e0] border-b-2 border-[#94b8b8] mb-3 flex items-center">
        {/* Left title */}
        <div className="w-[20%] p-2">
          <h2 className="font-bold text-[#004d4d]">ACCOUNT</h2>
        </div>

        {/* ✅ Dynamic Action Tabs */}
        <div className="flex justify-start items-center gap-3">
          {tabItems.map((item, index) => (
            <div key={item.key || item.title} className="flex items-center gap-2">
              {index > 0 && <span className="text-[#708090]">|</span>}
              <button
                onClick={item.onClick}
                className={`flex items-center gap-2 px-2 py-1 rounded text-sm font-semibold
                ${activeTab === item.key ? "bg-[#006666] text-white" : "hover:bg-gray-200 text-[#004d4d]"}`}
              >
                {item.icon && <span className="text-base">{item.icon}</span>}
                <span>{item.title}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Layout */}
      <div className="w-full flex justify-center">
        {/* Left column (tabs content) */}
        <div className="cards w-[80%]">
          {activeTab === "#accountList" && <AccountList />}
          {activeTab === "#subaccount" && <SubAccountList />}
          {activeTab === "#banklist" && <BankList />}
          {activeTab === "#dayEnd" && <DayEnd />}
          {activeTab === "#voucher" && <VoucherSystem />}
        </div>
      </div>

      {/* ✅ Modal */}
      {isAccountModalOpen && (
        <AccountTypeSelectionModel onClose={() => setIsAccountModalOpen(false)} />
      )}
      {isBankModalOpen && (
        <BankFormModal onClose={() => setIsBankModalOpen(false)} />
      )}
    </div>
  );
}
