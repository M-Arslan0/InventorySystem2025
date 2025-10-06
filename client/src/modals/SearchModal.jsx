import "./Modal.css";

export default function SearchModal() {
  return (
    <div className="modal">
      <div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "80%", backgroundColor: "white", margin: "0", padding: "0" }}>
        <div className="w-full flex items-center justify-center
                bg-[#006666]
                rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Search products
          </span>
        </div>

        <form>
          <div className="row cards">
            <div className="card" style={{ minHeight: "65vh" }}>
              {/* Header Section */}
              <div className="data-entery-header">
                <label>Search products</label>
                <input type="search" style={{ width: "20%" }} />
                <button type="button" style={{ width: "7%" }}>
                  <i className="fa-solid fa-magnifying-glass"></i> SEARCH
                </button>
                <button type="reset" style={{ width: "7%" }}>
                  RESET
                </button>

                {/* Category Filter */}
                <select style={{ width: "12%", fontSize: "13px" }}>
                  <option>CATEGORY</option>
                  <option>Category -1</option>
                  <option>Category -2</option>
                  <option>Category -3</option>
                  <option>Category -4</option>
                </select>

                {/* Brand Filter */}
                <select style={{ width: "12%", fontSize: "13px" }}>
                  <option>BRAND</option>
                  <option>Brand -1</option>
                  <option>Brand -2</option>
                  <option>Brand -3</option>
                  <option>Brand -4</option>
                </select>

                <button type="button" style={{ width: "6%", float: "right" }}>
                  <i className="fa-solid fa-xmark"></i> Close
                </button>
              </div>

              {/* Table */}
              <table>
                <thead>
                  <tr>
                    <th>CORD</th>
                    <th>ITEM NAME</th>
                    <th className="td-center">COST</th>
                    <th className="td-right">WHOLESALE</th>
                    <th className="td-right">RETAIL</th>
                    <th className="td-center">ON HAND</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DRSP-246</td>
                    <td>DOLLAR Stapler Pin 24/6</td>
                    <td className="td-center">VP</td>
                    <td className="td-right">Rs. 60.00</td>
                    <td className="td-right">Rs. 70.00</td>
                    <td className="td-center">328</td>
                  </tr>
                  <tr>
                    <td>DXSP-246</td>
                    <td>DUX Stapler Pin 24/6</td>
                    <td className="td-center">#B</td>
                    <td className="td-right">Rs. 55.00</td>
                    <td className="td-right">Rs. 60.00</td>
                    <td className="td-center">1380</td>
                  </tr>
                  <tr>
                    <td>DRSP-246</td>
                    <td>DOLLAR Stapler Pin 24/6</td>
                    <td className="td-center">CZ</td>
                    <td className="td-right">Rs. 60.00</td>
                    <td className="td-right">Rs. 70.00</td>
                    <td className="td-center">670</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


