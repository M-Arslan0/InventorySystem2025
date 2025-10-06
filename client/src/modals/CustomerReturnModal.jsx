import React from "react";

export default function CustomerReturnModal() {
  return (
    <div className="modal">
      <div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "80%", backgroundColor: "white", margin: "0", padding: "0" }}>
        <div className="w-full flex items-center justify-center
                bg-[#006666]
                rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Company Profile
          </span>
        </div>
        <form className="cards">
          <div className="card">
            <div className="w-[100%] flex justify-around">

              <label htmlFor="customer">SECELET Customer</label>
              <select id="customer" style={{ width: "25%" }}>
                <option value="">Customer -1</option>
                <option value="">Customer -2</option>
                <option value="">Customer -3</option>
                <option value="">Customer -4</option>
              </select>

              <label htmlFor="date">Date</label>
              <input id="date" type="date" style={{ width: "15%" }} />

              <label htmlFor="retNo">Ret No</label>
              <input id="retNo" type="text" style={{ width: "12%" }} />

              {/* Print */}
              <select style={{ width: "8%", fontSize: "13px", marginLeft: "10px" }}>
                <option value="">Print</option>
                <option value="">Print Preview</option>
                <option value="">Save PDF</option>
              </select>
              <select style={{ width: "8%", fontSize: "13px" }}>
                <option value="">A5</option>
                <option value="">A4</option>
                <option value="">Thermal</option>
                <option value="">NTN</option>
                <option value="">Office</option>
                <option value="">Letter Head</option>
                <option value="">Quotation</option>
              </select>
              <button style={{width:"4rem", fontSize:"small"}}>
                <i className="fa-solid fa-print"></i>PRINT
              </button>
            </div>
            {/* Invoice */}
            <div className="data-entery min-h-[50vh]">
              <div className="data-entery-header">
                <label htmlFor="proCode">Select Product</label>
                <select name="proCode" id="proCode" style={{ width: "40%",margin:"5px", backgroundColor:'white' }}>
                  <option value="">Product name</option>
                  <option value="">Product name -1   | Rs. 120.00</option>
                  <option value="">Product name -2   | Rs. 120.00</option>
                  <option value="">Product name -3   | Rs. 120.00</option>
                  <option value="">Product name -4   | Rs. 120.00</option>
                  <option value="">Product name -5   | Rs. 120.00</option>
                  <option value="">Product name -6   | Rs. 120.00</option>
                  <option value="">Product name -7   | Rs. 120.00</option>
                </select>
                <input type="text" name="qty" placeholder="Qty" style={{ width: "10%", margin:"5px", backgroundColor:'white' }} />
                <input type="text" name="price" placeholder="Rate" style={{ width: "10%", margin:"5px", backgroundColor:'white' }} />
                <button style={{ width: "10%", color: "white" }}>ADD</button>

                {/* Hold and Unhold */}
                <label style={{ float: "right" }}>Hold</label>
                <input
                  type="checkbox"
                  style={{ width: "20px", float: "right", marginTop: "8px" }}
                />
              </div>

              {/* Invoice Data */}
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "5%", textAlign: "center" }}>SR</th>
                    <th style={{ width: "60%" }}>PRODUCT NAME</th>
                    <th style={{ width: "10%", textAlign: "center" }}>QTY</th>
                    <th style={{ width: "10%", textAlign: "right" }}>RATE</th>
                    <th style={{ width: "20%", textAlign: "right" }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "center" }}>1</td>
                    <td>Product name -1</td>
                    <td style={{ textAlign: "center" }}>12</td>
                    <td style={{ textAlign: "right" }}>35.00</td>
                    <td style={{ textAlign: "right" }}>420.00</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>2</td>
                    <td>Product name -2</td>
                    <td style={{ textAlign: "center" }}>5</td>
                    <td style={{ textAlign: "right" }}>25.00</td>
                    <td style={{ textAlign: "right" }}>125.00</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>3</td>
                    <td>Product name -3</td>
                    <td style={{ textAlign: "center" }}>50</td>
                    <td style={{ textAlign: "right" }}>70.00</td>
                    <td style={{ textAlign: "right" }}>3,500.00</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>4</td>
                    <td>Product name -4</td>
                    <td style={{ textAlign: "center" }}>10</td>
                    <td style={{ textAlign: "right" }}>1500.00</td>
                    <td style={{ textAlign: "right" }}>15,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Amount */}
          <div className="w-[100%] flex justify-between">
            <div className="w-[50%] cards">
              <div className="card">
                <input type="text" placeholder="Memo....." />
              </div>
            </div>
            <div className="w-[25%] cards">
              <div className="card-t bg-lt-yellow transition">
                <div className="card-header">
                  <div>
                    <div className="card-title-2">Return Items Amount</div>
                    <div className="card-value-2">Rs. 19,045.00</div>
                  </div>
                  <div className="card-icon-2 bg-green">
                    <i className="fa-solid fa-rotate-left"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[25%] cards">
              <div className="card flex gap-2">
                <button>Save</button>
                <button>Clear</button>
                <button>Close</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
