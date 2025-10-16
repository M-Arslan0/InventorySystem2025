import { useState } from "react";

const settingCategories = [
  "General Settings",
  "User Management",
  "POS Configuration",
  "Tax Settings",
  "Printer Setup",
  "Backup & Restore",
];

const dummySettings = {
  "General Settings": [
    { setting: "Business Name", value: "My Store", type: "text" },
    { setting: "Business Address", value: "123 Main St", type: "text" },
    { setting: "Currency", value: "USD ($)", type: "select" },
    { setting: "Timezone", value: "UTC-05:00", type: "select" },
  ],
  "User Management": [
    { user: "admin", role: "Administrator", lastLogin: "2025-05-10" },
    { user: "cashier1", role: "Cashier", lastLogin: "2025-05-09" },
    { user: "manager", role: "Manager", lastLogin: "2025-05-08" },
  ],
  "POS Configuration": [
    { option: "Barcode Scanner", enabled: true },
    { option: "Touchscreen Mode", enabled: false },
    { option: "Receipt Auto-Print", enabled: true },
  ],
  "Tax Settings": [
    { taxName: "Sales Tax", rate: "7.5%", appliesTo: "All items" },
    { taxName: "Luxury Tax", rate: "10%", appliesTo: "Electronics" },
  ],
  "Printer Setup": [
    { printer: "Receipt Printer", type: "Thermal", status: "Connected" },
    { printer: "Invoice Printer", type: "Laser", status: "Not Configured" },
  ],
  "Backup & Restore": [
    { backup: "Daily Auto-Backup", lastRun: "2025-05-10 02:00", status: "Success" },
    { backup: "Manual Backup", lastRun: "2025-05-08 15:30", status: "Success" },
  ],
};

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState("General Settings");

  const renderSettingPanel = () => {
    const settings = dummySettings[activeCategory] || [];

    if (!settings.length) return <p className="text-gray-500">No settings found.</p>;

    if (activeCategory === "General Settings") {
      return (
        <div className="space-y-4">
          {settings.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b">
              <label className="w-48 font-medium text-gray-700">{item.setting}</label>
              {item.type === "text" && (
                <input
                  type="text"
                  defaultValue={item.value}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
              {item.type === "select" && (
                <select className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>{item.value}</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              )}
            </div>
          ))}
        </div>
      );
    }

    // For other setting categories that display data tables
    const columns = Object.keys(settings[0]);

    return (
      <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 text-sm">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="text-left px-4 py-3 capitalize">
                {col}
              </th>
            ))}
            {activeCategory !== "Tax Settings" && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {settings.map((row, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50 transition-colors">
              {columns.map((col, cid) => (
                <td key={cid} className="px-4 py-2">
                  {typeof row[col] === 'boolean' ? (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      row[col] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {row[col] ? 'Enabled' : 'Disabled'}
                    </span>
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
              {activeCategory !== "Tax Settings" && (
                <td className="px-4 py-2 space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  {activeCategory === "User Management" && (
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        System Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="md:w-1/4 bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Settings Categories
          </h2>
          <ul className="space-y-2">
            {settingCategories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer px-3 py-2 rounded-lg ${
                  activeCategory === category
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              {activeCategory}
            </h2>
            {(activeCategory === "General Settings" || activeCategory === "User Management") && (
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                {activeCategory === "User Management" ? "Add New User" : "Save Changes"}
              </button>
            )}
          </div>
          {renderSettingPanel()}
        </div>
      </div>
    </div>
  );
}