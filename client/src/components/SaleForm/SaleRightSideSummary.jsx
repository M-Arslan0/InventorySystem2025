import { useState, useEffect } from "react";
import { FaFileInvoice, FaLayerGroup } from "react-icons/fa6";

export default function SaleRightSideSummary({ productRateType, setProductRateType }) {
  const [activeTab, setActiveTab] = useState("unpaid");

  // Optional: agar prop se value change karni ho to local state use kar sakte hain
  const [localRateType, setLocalRateType] = useState(productRateType);

  useEffect(() => {
    setLocalRateType(productRateType);
  }, [productRateType]);

  const handleRateTypeChange = (e) => {
    setLocalRateType(e.target.value);
    setProductRateType && setProductRateType(e.target.value); // parent ko notify
  };

  return (
         <div className="flex flex-col min-h-[80vh] justify-start w-[25%] bg-white p-2 rounded-lg shadow-lg mt-1">

          <div className="w-[100%] h-[60vh] cards p-2">
            <div className="tab rounded-sm ">
              <div className="flex gap-2 mx-auto justify-between w-[100%] p-2">


                <select style={{ width: "100%", fontSize: "13px" }} className="bg-white">
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
        </div>
  )
}
