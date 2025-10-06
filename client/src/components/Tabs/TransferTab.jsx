import {
  FaMagnifyingGlass,
  FaCircleUser,
  FaPenToSquare,
  FaBoxOpen,
  FaXmark,
} from "react-icons/fa6";

export default function TransferTab() {
  return (
        <div className="card tab-pane">
               <div className="card-t bg-lt-blue">
                 <div className="card-header">
                   <div className="card-title-2">Transfer Funds</div>
                   <div className="card-icon bg-blue">
                     <FaBoxOpen />
                   </div>
                 </div>
                 <h2>Transfer Funds.... From</h2>
                 <select style={{ width: "64%" }}>
                   <option>Bank name -1</option>
                   <option>Bank name -2</option>
                   <option>Bank name -3</option>
                   <option>Bank name -4</option>
                 </select>
                 <input
                   placeholder="Rs. 0.00"
                   style={{ width: "35%", textAlign: "right" }}
                 />
                 <h2>Transfer Funds..... To</h2>
                 <select style={{ width: "64%" }}>
                   <option>Bank name -1</option>
                   <option>Bank name -2</option>
                   <option>Bank name -3</option>
                   <option>Bank name -4</option>
                 </select>
                 <input
                   placeholder="Rs. 0.00"
                   style={{ width: "35%", textAlign: "right" }}
                 />
                 <br />
                 <br />
                 <div className="entery-btn">
                   <button>Save Transfer</button>
                   <button>Clear</button>
                 </div>
               </div>

               <h2>Bank Accounts</h2>
               <table className="data-entery">
                 <thead>
                   <tr>
                     <th className="td-left">BANK NAME</th>
                     <th className="td-right">AMOUNT</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Bank name -1</td>
                     <td className="td-right">Rs. 115,200.00</td>
                   </tr>
                   <tr>
                     <td>Bank name -2</td>
                     <td className="td-right">Rs. 75,000.00</td>
                   </tr>
                   <tr>
                     <td>Bank name -3</td>
                     <td className="td-right">Rs. 28,900.00</td>
                   </tr>
                   <tr>
                     <td>Bank name -4</td>
                     <td className="td-right">Rs. 1,110,000.00</td>
                   </tr>
                 </tbody>
               </table>
             </div>
  )
}
