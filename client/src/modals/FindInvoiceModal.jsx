import React from "react";

export default function FindInvoiceModal() {
  return (
    <div className="modal">
      <div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "50%", backgroundColor: "white", margin: "0", padding: "0" }}>
        <div className="w-full flex items-center justify-center
                bg-[#006666]
                rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Company Profile
          </span>
        </div>
        <form>
          <div className="cards flex flex-col">
            <div className="w-[100%]  card">

              <label htmlFor="SelectCustomers">CUSTOMER</label>
              <select name="SelectCustomers" id="SelectCustomers">
                <option value="">Select Customer</option>
                <option value="">Customer -1</option>
                <option value="">Customer -2</option>
                <option value="">Customer -3</option>
                <option value="">Customer -4</option>
                <option value="">Customer -5</option>
              </select>

              <div className="grid grid-cols-2 gap-5 p-5">

                <div>
                  <label htmlFor="dateTo">Date TO</label>
                  <input id="dateTo" type="date" />
                </div>

                <div>
                  <label htmlFor="dateFrom">Date FROM</label>
                  <input id="dateFrom" type="date" />
                </div>

                <div>
                  <label htmlFor="invoiceNo">Invoice No</label>
                  <input id="invoiceNo" type="number" />
                </div>

                <div>
                  <label htmlFor="invoiceAmount">Invoice Amount</label>
                  <input
                    id="invoiceAmount"
                    type="number"
                    placeholder="Rs. 0.00"
                  />
                </div>

              </div>
            </div>

            <div className="w-[100%] flex justify-between">
              <button type="submit">Find</button>
              <button type="button">Clear</button>
              <button type="button">Close</button>

            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
