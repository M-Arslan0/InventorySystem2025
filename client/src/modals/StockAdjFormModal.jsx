import { FaPrint, FaRotateLeft } from "react-icons/fa6";

export default function StockAdjFormModal({ onClose }) {
  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "90%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Stock Adjustment</span>
        </div>
        <form className="cards space-y-4">
          {/* Adjustment Selection */}
          <div className="card p-4 border rounded shadow-sm">
            <div className="flex gap-2 items-center">
              <label className="font-semibold">SELECT Adjustment</label>
              <select style={{ width: "25%" }}>
                <option>Missing Stock</option>
                <option>Stock Adjustment</option>
                <option>Expired Stock</option>
              </select>

              <label>Date</label>
              <input type="date" style={{ width: "12%" }} />

              <label>Adj No</label>
              <input type="text" style={{ width: "12%" }} />

              {/* Print Section */}
              <div className="ml-auto flex gap-2 items-center">
                <select className="border p-1 text-sm w-[50%]">
                  <option>Print</option>
                  <option>Print Preview</option>
                  <option>Save PDF</option>
                </select>
                <button
                  type="button"
                  style={{ width: "50%" }}
                  className="flex gap-1 justify-center bg-white ml-auto"
                >
                  <FaPrint className="mt-1" /> PRINT
                </button>
              </div>
            </div>
            {/* Invoice Section */}
            <div className="data-entery mt-1 min-h-[45vh]  p-2 rounded">
              <div className="data-entery-header flex gap-2 items-center">
                <label>Select Product</label>
                <select style={{ width: "40%" }} className="bg-white text-black">
                  <option>Product name</option>
                  <option>Product name -1 | Rs. 120.00</option>
                  <option>Product name -2 | Rs. 120.00</option>
                  <option>Product name -3 | Rs. 120.00</option>
                </select>
                <input
                  type="text"
                  placeholder="Qty in PC"
                  className="bg-white text-black"
                  style={{ width: "10%" }}
                />
                <input
                  type="text"
                  placeholder="Qty on Hand"
                  className="bg-white text-black"
                  style={{ width: "10%" }}
                />
                <input
                  type="text"
                  placeholder="DEF"
                  style={{ width: "10%" }}
                  className="bg-white text-black"
                />
                <button
                  type="button"
                >
                  ADD
                </button>
              </div>

              {/* Invoice Table */}
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-[5%] text-center">SR</th>
                    <th className="w-[33%]">PRODUCT NAME</th>
                    <th className="w-[7%]">UOM</th>
                    <th className="w-[10%] text-center">QTY in PC</th>
                    <th className="w-[10%] text-center">QTY in Hand</th>
                    <th className="w-[10%] text-center">QTY DEF</th>
                    <th className="w-[10%] text-right">RATE</th>
                    <th className="w-[15%] text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td>Product name -1</td>
                    <td>Pkt</td>
                    <td className="text-center">120</td>
                    <td className="text-center">112</td>
                    <td className="text-center text-red-600">-8</td>
                    <td className="text-right">35.00</td>
                    <td className="text-right">280.00</td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td>Product name -3</td>
                    <td>Box</td>
                    <td className="text-center">98</td>
                    <td className="text-center">103</td>
                    <td className="text-center">5</td>
                    <td className="text-right">38.00</td>
                    <td className="text-right text-red-600">-190.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Amount & Actions */}
          <div className="grid grid-cols-8 gap-2">
            {/* Memo */}
            <div className="col-span-4 cards flex-1">
              <div className="card w-full p-2 border rounded">
                <input
                  type="text"
                  placeholder="Memo..."
                  className="w-full border p-1 rounded"
                />
              </div>
            </div>

            {/* Adjustment Amount */}
            <div className="col-span-2 cards">
              <div className="card-t bg-lt-yellow transition p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="card-title-2 font-semibold">Items Adjustment Amount</div>
                  <div className="card-value-2 text-lg font-bold">Rs. 90.00</div>
                </div>
                <div className="bg-green-600 m-2 text-xl p-2 rounded-full">
                  <FaRotateLeft className="text-white" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card col-span-2 flex items-center gap-2">
              <button >Save</button>
              <button >Clear</button>
              <button
                type="button"
                onClick={onClose}

              >
                Close
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
