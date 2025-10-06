
export default function Expense() {
  return (
             <div className="card tab-pane">
              <h2>
                Expenses Date
                <input type="date" style={{ width: "30%", float: "right" }} />
              </h2>
              <br />
              <div className="data-entery">
                <select style={{ width: "50%" }}>
                  <option>Expenses</option>
                  <option>Daily Shop Expense</option>
                  <option>Labor Expense</option>
                  <option>Cargo Bill</option>
                  <option>IESCO Electric Bill</option>
                  <option>PTCL Bill</option>
                  <option>School Fee</option>
                  <option>Shopping Bag</option>
                  <option>Cash Difference</option>
                </select>
                <input
                  placeholder="Rs. 0.00"
                  style={{ width: "30%", textAlign: "right" }}
                />
                <button style={{ width: "18%" }}>ADD</button>
                <br />
                <br />
                <table>
                  <thead>
                    <tr>
                      <th className="td-left">Expenses</th>
                      <th className="td-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Daily Shop Expense</td>
                      <td className="td-right">Rs. 1,130.00</td>
                    </tr>
                    <tr>
                      <td>Cargo Bill</td>
                      <td className="td-right">Rs. 550.00</td>
                    </tr>
                    <tr>
                      <td>Shopping Bag</td>
                      <td className="td-right">Rs. 2,500.00</td>
                    </tr>
                    <tr>
                      <td>Labor Expense</td>
                      <td className="td-right">Rs. 180.00</td>
                    </tr>
                    <tr>
                      <td>Home Expenses</td>
                      <td className="td-right">Rs. 7,050.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  )
}
