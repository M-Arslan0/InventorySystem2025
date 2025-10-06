import {
  FaBarcode,
  FaCirclePlus,
  FaCircleXmark,
  FaPenNib,
  FaTag,
  FaBoxesStacked,
} from "react-icons/fa6";

export default function ProductRegFormModal({onClose}) {
  return (
   <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "90%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New products</span>
        </div>
        <form>
         <div className="grid grid-cols-3">

                 {/*Product Basic Info */}
            <div>
            <div className="col-span-3 cards">
              <div className="card p-2 border rounded">
                <div className="card-header flex justify-between items-center">
                  <div className="card-title font-bold">CODE</div>
                  <div className="card-icon-sm bg-orange text-white p-2 rounded">
                    <FaBarcode />
                  </div>
                </div>
                <br />
                <label>Item Code</label>
                <input type="text"  />
                <label>Bar Code</label>
                <input type="text"  />
                <label>
                  Brand <FaCirclePlus className="inline text-green-600" />
                </label>
                <select >
                  <option>Brand -1</option>
                  <option>Brand -2</option>
                  <option>Brand -3</option>
                </select>

                {/* Add Brand */}
                <div id="addBrand" className="tab-pane mt-2">
                  <label>
                    New Brand name <FaCircleXmark className="inline text-red-600" />
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input type="text" placeholder="New Brand name" className="border w-1/2 p-1" />
                    <input type="text" placeholder="code" className="border w-1/4 p-1" />
                    <input type="button" value="ADD" className="border w-1/4 p-1 bg-green-500 text-white" />
                  </div>
                </div>

                <label>
                  Category <FaCirclePlus className="inline text-green-600" />
                </label>
                <select >
                  <option>Category -1</option>
                  <option>Category -2</option>
                  <option>Category -3</option>
                </select>

                {/* Add Category */}
                <div id="addCategory" className="tab-pane mt-2">
                  <label>
                    New Category name <FaCircleXmark className="inline text-red-600" />
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input type="text" placeholder="New Category name" className="border w-1/2 p-1" />
                    <input type="text" placeholder="code" className="border w-1/4 p-1" />
                    <input type="button" value="ADD" className="border w-1/4 p-1 bg-green-500 text-white" />
                  </div>
                </div>
              </div>

              <div className="card mt-2 p-2 border rounded">
                <input type="text" placeholder="Memo.../"  />
              </div>
            </div>
            </div>

            {/* Product Information */}
            <div>
            <div className="col-span-5 cards">
              <div className="card-t bg-yellow-100 p-2 border rounded">
                <div className="card-header flex justify-between items-center">
                  <div className="card-title font-bold">ITEM NAME</div>
                  <div className="card-icon-sm bg-purple-500 text-white p-2 rounded">
                    <FaPenNib />
                  </div>
                </div>
                <br />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label>Name</label>
                    <input type="text" className="bg-white" />
                  </div>
                  <div>
                    <label>Art #</label>
                    <input type="text"  className="bg-white" />
                  </div>
                  <div>
                    <label>
                      Packing <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <select className="bg-white">
                      <option>Pkt</option>
                      <option>Doz</option>
                      <option>Box</option>
                    </select>
                  </div>
                  <div>
                    <label>UOM</label>
                    <input type="text" placeholder="0"  className="bg-white"/>
                  </div>
                </div>

                <label>Item Full Name</label>
                <input type="text"  className="bg-white"/>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label>
                      Type <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <select className="bg-white">
                      <option>Local</option>
                      <option>Import</option>
                      <option>Company</option>
                    </select>
                  </div>
                  <div>
                    <label>Status</label>
                    <select className="bg-white">
                      <option>Active</option>
                      <option>In Active</option>
                      <option>Block</option>
                    </select>
                  </div>
                </div>

                {/* Add Type */}
                <div id="addType" className="tab-pane mt-2">
                  <label>
                    New Type name <FaCircleXmark className="inline text-red-600" />
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input type="text" placeholder="Enter New Type name" className="border w-3/4 p-1" />
                    <input type="button" value="ADD" className="border w-1/4 p-1 bg-green-500 text-white" />
                  </div>
                </div>

                <label>Select Vendor for product</label>
                <select className="bg-white">
                  <option>Select Vendor</option>
                  <option>Vendor name -1</option>
                  <option>Vendor name -2</option>
                  <option>Vendor name -3</option>
                </select>
              </div>
            </div>
            </div>

            {/* Product Par Level */}
            <div className="grid grid-cols-4">
            {/* PRICE Section */}

          <div className="col-span-2 cards">
              <div className="card p-2 border rounded">
                <div className="card-header flex justify-between items-center">
                  <div className="card-title font-bold">PRICE</div>
                  <div className="card-icon-sm bg-green text-white p-2 rounded">
                    <FaTag />
                  </div>
                </div>
                <br />
                <label>Cost</label>
                <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                <label>Special price <b>0.0%</b></label>
                <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                <label>Wholesale price <b>0.0%</b></label>
                <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                <label>Retail price <b>0.0%</b></label>
                <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
              </div>
            </div>

            {/* Quantity Section */}
            <div className="col-span-2 cards">
              <div className="card p-2 border rounded">
                <div className="card-header flex justify-between items-center">
                  <div className="card-title font-bold">Required Quantity</div>
                  <div className="card-icon-sm bg-orange text-white p-2 rounded">
                    <FaBoxesStacked />
                  </div>
                </div>
                <br />
                <p>Min Qty</p>
                <input type="text" placeholder="Min Qty" className="border w-1/2 p-1 text-center" />
                <p>Max Qty</p>
                <input type="text" placeholder="Max Qty" className="border w-1/2 p-1 text-center" />
                <p>Opening Qty</p>
                <input type="text" placeholder="Opening" className="border w-1/2 p-1 text-center" />
                <input
                  type="text"
                  placeholder="AVG"
                  className="border w-1/2 p-1 mt-2 text-red-600 text-center"
                />
              </div>
            </div>

            {/* Save Buttons */}
            <div className="col-span-4 cards">
              <div className="card flex gap-2 p-2">
                <button>Save</button>
                <button>Clear</button>
                <button onClick={onClose}>Close</button>
              </div>
            </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
