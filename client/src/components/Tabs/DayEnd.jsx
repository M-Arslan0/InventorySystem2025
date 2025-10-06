import {
  FaMagnifyingGlass,
  FaCircleUser,
  FaPenToSquare,
  FaBoxOpen,
  FaXmark,
} from "react-icons/fa6";
import { IoOpen } from "react-icons/io5";

export default function DayEnd() {
  return (
                <div id="dayEnd" className="card tab-pane active">
                  <h2>Day End</h2>
                  <table>
                    <thead>
                      <tr>
                        <th className="td-left">NAME</th>
                        <th className="td-right">AMOUNT</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Cash Sale Receive</td>
                        <td className="td-right">Rs. 106,853.00</td>
                        <td className="td-right">
                          <IoOpen className="text-xl"/>
                        </td>
                      </tr>
                      <tr>
                        <td>Balance Receive</td>
                        <td className="td-right">Rs. 21,600.00</td>
                        <td className="td-right">
                          <FaPenToSquare />
                        </td>
                      </tr>
                      <tr>
                        <td>Paid Amount</td>
                        <td className="td-right">Rs. 32,000.00</td>
                        <td className="td-right">
                          <FaPenToSquare />
                        </td>
                      </tr>
                      <tr>
                        <td>Expenses</td>
                        <td className="td-right">Rs. 4,200.00</td>
                        <td className="td-right">
                          <FaPenToSquare />
                        </td>
                      </tr>
                      <tr className="bottom">
                        <th className="td-left">TOTAL AMOUNT</th>
                        <th className="td-right">Rs. 92,253.00</th>
                        <th></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
  )
}
