// src/pages/Sale.jsx
import { useState } from "react";
import {
  FaMagnifyingGlass,
  FaCircleLeft,
  FaCircleRight,
  FaFileLines,
  FaPrint,
  FaLayerGroup,
  FaFileInvoice,
} from "react-icons/fa6";
import FindInvoiceModal from "../../modals/FindInvoiceModal";

export default function Sale() {
  const [activeTab, setActiveTab] = useState("unpaid");
  const [findInvoiceModalOpen, setFindInvoiceModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-[100%]">
      <div className="sale-page">
        {/* Page Menu */}
        <div className="w-[100%] p-1 row page-menu border-b-2 border-[#589191]">
          <div className="flex gap-1 h-2vh items-center">
            <button>
              <FaCircleLeft className="text-base" />
            </button>
            <button>
              <FaCircleRight className="text-base" />
            </button>
            <span className="mb-2">|</span>
            <button className="flex gap-1 text-sm" onClick={()=>setFindInvoiceModalOpen(true)}>
              <FaMagnifyingGlass className="text-sm " /> FIND
            </button>
            <span className="mb-2">|</span>

            <button className="flex gap-1 text-sm">
              <FaFileLines className="text-sm" /> CREATE NEW
            </button>

            <span className="mb-2">|</span>
            <label>SELECT</label>
            <select style={{ width: "25%" }} className="bg-white ml-5">
              <option>Customer -1</option>
              <option>Customer -2</option>
              <option>Customer -3</option>
              <option>Customer -4</option>
            </select>
            <label>Date</label>
            <input type="date" style={{ width: "10%" }} className="bg-white" />
            <label>Inv No</label>
            <input type="text" style={{ width: "10%" }} className="bg-white" />

            <select style={{ width: "8%", fontSize: "13px" }} className="bg-white ml-10">
              <option>Print</option>
              <option>Print Preview</option>
              <option>Save PDF</option>
            </select>
            <button className="flex gap-1 text-sm">
              <FaPrint className="text-sm" />PRINT
            </button>
            <select style={{ width: "8%", fontSize: "13px" }} className="bg-white">
              <option>A5</option>
              <option>A4</option>
              <option>Thermal</option>
              <option>NTN</option>
              <option>Office</option>
              <option>Letter Head</option>
              <option>Quotation</option>
            </select>
          </div>
        </div>


      </div>

      {/* Example Tabs */}
      <div className="flex gap-1.5 w-[98%] mx-auto justify-between items-start min-h-[80vh] mt-2 ">

        {/*  Left Side */}


        <div className="card data-entery min-h-[80vh] w-[75%] p-2 bg-white rounded-lg shadow-lg">

          <div className="min-h-[73vh]">
            <div className="data-entery-header">
              <label htmlFor="proCode">Select Product</label>
              <select className="bg-white">
                <option value="">Product name</option>
                <option value="">Product name -1 | Rs. 120.00</option>
                <option value="">Product name -2 | Rs. 120.00</option>
                <option value="">Product name -3 | Rs. 120.00</option>
                <option value="">Product name -4 | Rs. 120.00</option>
                <option value="">Product name -5 | Rs. 120.00</option>
                <option value="">Product name -6 | Rs. 120.00</option>
                <option value="">Product name -7 | Rs. 120.00</option>
              </select>
              <input type="number" name="qty" placeholder="Qty" className="bg-white ml-2" />
              <input type="number" name="price" placeholder="Rate" className="bg-white ml-2" />
              <button className="ml-2">ADD</button>

              {/* Hold */}
              <label style={{ float: "right" }}>Hold</label>
              <input
                type="checkbox"
                style={{ width: "20px", float: "right", marginTop: "8px" }}/>
            </div>

            {/* Invoice Table */}
            <table>
              <thead>
                <tr>
                  <th className="w-5% text-align-center">SR</th>
                  <th className="w-60%">PRODUCT NAME</th>
                  <th className="w-10% text-align-center">QTY</th>
                  <th className="w-10% text-align-right">RATE</th>
                  <th className="w-20% text-align-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-align-center">1</td>
                  <td>Product name -1</td>
                  <td className="text-align-center">12</td>
                  <td className="text-align-right">35.00</td>
                  <td className="text-align-right">420.00</td>
                </tr>
                <tr>
                  <td className="text-align-center">2</td>
                  <td>Product name -2</td>
                  <td className="text-align-center">5</td>
                  <td className="text-align-right">25.00</td>
                  <td className="text-align-right">125.00</td>
                </tr>
                <tr>
                  <td className="text-align-center">3</td>
                  <td>Product name -3</td>
                  <td className="text-align-center">50</td>
                  <td className="text-align-right">70.00</td>
                  <td className="text-align-right">3,500.00</td>
                </tr>
                <tr>
                  <td className="text-align-center">4</td>
                  <td>Product name -4</td>
                  <td className="text-align-center">10</td>
                  <td className="text-align-right">1500.00</td>
                  <td className="text-align-right">15,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Totals Row */}
          <div className="min-h-5 flex justify-around">
            {[
              { title: "Total Quantity", value: "77", color: "bg-green" },
              { title: "Total Items", value: "16", color: "bg-green" },
              { title: "Balance Due", value: "Rs: 114,800.00", color: "bg-orange" },
              { title: "Received Amount", value: "Rs: 0.00", color: "bg-pink" },
              { title: "Previous Balance", value: "Rs: 10,000.00", color: "bg-green" },
              { title: "Invoice Total", value: "Rs: 104,800.00", color: "bg-green" },
            ].map((card, idx) => (
              <div key={idx} className="col-2 cards">
                <div className="card-2 transition">
                  <div className="card-header">
                    <div>
                      <div className="card-title-2">{card.title}</div>
                      <div className="card-value-2">{card.value}</div>
                    </div>
                    <div className={`card-icon-2 ${card.color}`}>
                      <FaLayerGroup />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Right Sidebar */}
        <div className="flex flex-col min-h-[80vh] justify-center w-[25%] bg-white p-2 rounded-lg shadow-lg">

          <div className="w-[100%] h-[60vh] cards p-2">
            <div className="tab rounded-sm ">
              <div className="flex gap-2 mx-auto justify-between w-[100%] p-2">
                <select style={{ width: "50%", fontSize: "13px" }} className="bg-white">
                  <option>Whole Sale</option>
                  <option>Retail</option>
                  <option>Special Price</option>
                  <option>Add 4%</option>
                </select>

                <select style={{ width: "50%", fontSize: "13px" }} className="bg-white">
                  <option>Company -1</option>
                  <option>Company -2</option>
                  <option>Company -3</option>
                  <option>Company -4</option>
                </select>
              </div>


              <button
                className={`tab-btn ${activeTab === "unpaid" ? "active" : ""} flex text-sm gap-1`}
                onClick={() => setActiveTab("unpaid")}
              >
                <FaFileInvoice /> Unpaid
              </button>
              <button
                className={`tab-btn ${activeTab === "today" ? "active" : ""} flex text-sm gap-1`}
                onClick={() => setActiveTab("today")}
              >
                <FaLayerGroup /> Today
              </button>
              <button
                className={`tab-btn ${activeTab === "hold" ? "active" : ""} flex text-sm gap-1`}
                onClick={() => setActiveTab("hold")}
              >
                <FaLayerGroup /> Hold
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "unpaid" && (
                <table className="bg-bb-pink">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Inv #</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>08-06-25</td>
                      <td>25-00031</td>
                      <td>1,850.00</td>
                    </tr>
                    <tr>
                      <td>12-06-25</td>
                      <td>25-00001</td>
                      <td>11,680.00</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "today" && (
                <table className="bg-lt-blue">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Inv #</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>14-06-25</td>
                      <td>25-00100</td>
                      <td>1,850.00</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "hold" && (
                <table className="bg-lt-green">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Inv #</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>08-06-25</td>
                      <td>25-00031</td>
                      <td>1,850.00</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="card entery-btn" style={{ minHeight: "20vh" }}>
            <img src="img/Sale-Profit.png" alt="" style={{ width: "100%" }} />
            <div className="flex justify-around mt-2">
              <button>New</button>
              <button>Save</button>
              <button>Clear</button>
              <button>Delete</button>
            </div>

          </div>
        </div>
      </div>
    {findInvoiceModalOpen &&
      <FindInvoiceModal/>}
    </div>
  );
}
