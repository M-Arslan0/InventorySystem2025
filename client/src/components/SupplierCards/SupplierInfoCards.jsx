export default function SupplierInfoCards({ supplierInfo }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 m-4">
      {/* Supplier Information Card */}
      <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="fa-regular fa-circle-user text-blue-500"></i>
              Supplier Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong className="text-gray-800">Name:</strong> {supplierInfo.supplierName || "-"}</p>
              <p><strong className="text-gray-800">Type:</strong> {supplierInfo?.supplierType?.typeName || "-"}</p>
              <p><strong className="text-gray-800">Area:</strong> {supplierInfo?.supplierArea?.areaName || "-"}</p>
              <p><strong className="text-gray-800">City:</strong> {supplierInfo?.supplierCity?.cityName || "-"}</p>
              <p><strong className="text-gray-800">Address:</strong> {supplierInfo.supplierAddress || "-"}</p>
              <p><strong className="text-gray-800">Ledger A/c:</strong> {supplierInfo?.supplierLedgerAccount?.accountName || "-"}</p>
            </div>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-inner">
            <i className="fa-regular fa-user text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="fa-regular fa-id-badge text-pink-500"></i>
              Contact Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong className="text-gray-800">Phone #1:</strong> {supplierInfo.supplierPhone1 || "-"}</p>
              <p><strong className="text-gray-800">Contact Person #1:</strong> {supplierInfo.supplierContactPerson1 || "-"}</p>
              <p><strong className="text-gray-800">Phone #2:</strong> {supplierInfo.supplierPhone2 || "-"}</p>
              <p><strong className="text-gray-800">Contact Person #2:</strong> {supplierInfo.supplierContactPerson2 || "-"}</p>
              <p><strong className="text-gray-800">Phone #3:</strong> {supplierInfo.supplierPhone3 || "-"}</p>
              <p><strong className="text-gray-800">Contact Person #3:</strong> {supplierInfo.supplierContactPerson3 || "-"}</p>
            </div>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full shadow-inner">
            <i className="fa-solid fa-phone text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
