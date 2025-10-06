import { FaTag } from "react-icons/fa6";

export default function ProductPriceUpdateFormModal({onClose}) {
  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "30%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Product Price Update Form</span>
        </div>
        <form>
          <div className="cards space-y-4">
            {/* Price Update Card */}
            <div className="card-t bg-yellow-100 p-4 rounded border shadow-sm">
              <div className="card-header flex justify-between items-center mb-2">
                <div className="card-title font-bold">Product name -1</div>
                <div className="card-icon-sm bg-green text-white p-2 rounded">
                  <FaTag />
                </div>
              </div>

              {/* Price Inputs */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="bg-white"
                    style={{width:"70%"}}
                  />
                  <label className="font-semibold">Update Date</label>
                </div>

                <label>Cost</label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="bg-white"

                />

                <label>
                  Special Price <b>0.0%</b>
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                    className="bg-white"
                />

                <label>
                  Wholesale Price <b>0.0%</b>
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                    className="bg-white"
                />

                <label>
                  Retail Price <b>0.0%</b>
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                    className="bg-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card flex gap-2 p-2">
              <button
                type="submit"
              >
                Save
              </button>
              <button
                type="reset"
              >
                Clear
              </button>
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
