export default function CustomerInfoCards({ customerInfo }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 m-4">
      {/* Customer Information Card */}
      <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="fa-regular fa-circle-user text-blue-500"></i>
              Customer Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong className="text-gray-800">Name:</strong> {customerInfo.customerName || "-"}</p>
              <p><strong className="text-gray-800">Type:</strong> {customerInfo?.customerType?.typeName || "-"}</p>
              <p><strong className="text-gray-800">Area:</strong> {customerInfo?.customerArea?.areaName || "-"}</p>
              <p><strong className="text-gray-800">City:</strong> {customerInfo?.customerCity?.cityName || "-"}</p>
              <p><strong className="text-gray-800">Address:</strong> {customerInfo.customerAddress || "-"}</p>
              <p><strong className="text-gray-800">Shipping Address:</strong> {customerInfo.customerShippingAddress || "-"}</p>
              <p><strong className="text-gray-800">Ledger A/c:</strong> {customerInfo?.customerLedgerAccount?.accountName || "-"}</p>
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
              <p><strong className="text-gray-800">Phone #1:</strong> {customerInfo.customerPhone1 || "-"}</p>
              <p><strong className="text-gray-800">Contact Person #1:</strong> {customerInfo.customerContactPerson1 || "-"}</p>
              <p><strong className="text-gray-800">Phone #2:</strong> {customerInfo.customerPhone2 || "-"}</p>
              <p><strong className="text-gray-800">Contact Person #2:</strong> {customerInfo.customerContactPerson2 || "-"}</p>
              <p><strong className="text-gray-800">Phone #3:</strong> {customerInfo.customerPhone3 || "-"}</p>
              <p><strong className="text-gray-800">Contact Person #3:</strong> {customerInfo.customerContactPerson3 || "-"}</p>
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
