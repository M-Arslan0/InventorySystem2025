import { FaMagnifyingGlass, FaXmark, FaPenToSquare } from "react-icons/fa6";

export default function ProductPriceUpdateListModal({ onClose }) {
  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "90%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Product Price Update Information</span>
        </div>
        <form>
          <div className="row cards">
            <div className="card min-h-[65vh] p-2 border rounded">
              {/* Search Header */}
              <div className="data-entery-header flex gap-1 items-center">
                <label className="font-semibold">Search products</label>

                <input
                  type="search"
                  style={{ width: "20%" }}
                  className="bg-white"
                  placeholder="Search..."
                />

                <button
                  type="button"
                  style={{ width: "10%", padding: "3px" }}
                  className="flex gap-1 justify-center bg-white font-bold"
                >
                  <FaMagnifyingGlass className="m-1" /> SEARCH
                </button>

                <button
                  style={{ width: "10%", padding: "3px" }}
                  className="flex gap-1 justify-center bg-white font-bold"
                >
                  RESET
                </button>

                {/* Category Filter */}
                <select
                  style={{ width: "10%", padding: "3px" }}
                  className="flex gap-1 justify-center bg-white font-bold"
                >
                  <option>CATEGORY</option>
                  <option>Category -1</option>
                  <option>Category -2</option>
                  <option>Category -3</option>
                  <option>Category -4</option>
                </select>

                {/* Brand Filter */}
                <select
                  style={{ width: "10%", padding: "3px" }}
                  className="flex gap-1 justify-center bg-white font-bold"
                >
                  <option>BRAND</option>
                  <option>Brand -1</option>
                  <option>Brand -2</option>
                  <option>Brand -3</option>
                  <option>Brand -4</option>
                </select>

                {/* Close Button - Right End */}
                <button
                  type="button"
                  style={{ width: "6%" }}
                  className="flex gap-1 justify-center bg-white ml-auto"
                  onClick={onClose}
                >
                  <FaXmark className="m-1" /> Close
                </button>
              </div>


              {/* Product Price Table */}
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th>CORD</th>
                    <th>ITEM NAME</th>
                    <th className="text-right">COST</th>
                    <th className="text-right">SPECIAL</th>
                    <th className="text-right">WHOLESALE</th>
                    <th className="text-right">RETAIL</th>
                    <th className="text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DRSP-246</td>
                    <td>DOLLAR Stapler Pin 24/6</td>
                    <td className="text-right">Rs. 57.00</td>
                    <td className="text-right">Rs. 59.00</td>
                    <td className="text-right">Rs. 60.00</td>
                    <td className="text-right">Rs. 70.00</td>
                    <td className="text-center text-blue-600 cursor-pointer">
                      <FaPenToSquare />
                    </td>
                  </tr>
                  <tr>
                    <td>DXLP-999</td>
                    <td>DUX Lead Pencil 999</td>
                    <td className="text-right">Rs. 210.00</td>
                    <td className="text-right">Rs. 218.00</td>
                    <td className="text-right">Rs. 225.00</td>
                    <td className="text-right">Rs. 250.00</td>
                    <td className="text-center text-blue-600 cursor-pointer">
                      <FaPenToSquare />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
