import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useForm } from 'react-hook-form';

export default function ClientInvoiceList({ clientInvoices }) {

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { register, errors } = useForm({
    defaultValues: {
      "fromDate": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      "toDate": new Date().toISOString().split("T")[0],
      "numberOfDocument": 5,
    }
  });

  useEffect(() => {
    setFilteredData(clientInvoices);
    const filterData = clientInvoices && clientInvoices?.filter((inv) =>
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filterData);
  }, [searchTerm, clientInvoices]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div className="w-full m-3">
        <div className="flex">
          <div className="flex w-1/2 items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch />
            </div>

            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>

            <div className="bg-white dark:bg-gray-800 relative sm:rounded-lg overflow-hidden">
          <div className="flex flex-wrap sm:flex-nowrap justify-start gap-4 items-end p-4">

            {/* From Date */}
            <div className="flex flex-col">
              <label htmlFor="fromDate" className="block font-medium mb-1">From</label>
              <input
                type="date"
                id="fromDate"
                {...register("fromDate", { required: "From date is required" })}
                className="border p-2 rounded"
              />
              {errors?.fromDate && (
                <p className="text-red-500 text-sm">{errors.fromDate.message}</p>
              )}
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label htmlFor="toDate" className="block font-medium mb-1">To</label>
              <input
                type="date"
                id="toDate"
                {...register("toDate", { required: "To date is required" })}
                className="border p-2 rounded"
              />
              {errors?.toDate && (
                <p className="text-red-500 text-sm">{errors.toDate.message}</p>
              )}
            </div>

            {/* Number of Document */}
            <div className="flex flex-col">
              <label htmlFor="numberOfDocument" className="block font-medium mb-1">
                No. Of Doc.
              </label>
              <input
                type="number"
                id="numberOfDocument"
                className="border p-2 rounded w-full"
                placeholder="Maximum 100"
                {...register("numberOfDocument", {
                  required: "This field is required",
                  min: { value: 1, message: "Must be at least 1" },
                  max: { value: 100, message: "Maximum allowed is 100" },
                })}
              />
              {errors?.numberOfDocument && (
                <p className="text-red-500 text-sm">{errors.numberOfDocument.message}</p>
              )}
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Filter
              </button>


          </div>
          </div>
        </div>

        </div>

      </div>

      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Invoices No</th>
                <th scope="col" className="px-4 py-3">Subject</th>
                <th scope="col" className="px-4 py-3">Ref/PO</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Dated</th>
              </tr>
            </thead>
            <tbody>

              {filteredData && filteredData.map((data, index) => (
                <tr key={data._id} className="border-b cursor-pointer dark:border-gray-700 hover:bg-gray-50"
                  onClick={() => window.open(`/InvoiceEdit/${data._id}`, "_blank")}>
                  <td className="px-4 py-3">{++index}</td>
                  <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.prefix} - {data.invoiceNo}</th>
                  <td className="px-4 py-3">{data.subject}</td>
                  <td className="px-4 py-3">{data.invRef}</td>
                  <td className="px-4 py-3">
                    {data.isFinal ?
                      <span className='text-green-600 font-semibold'>Paid</span>
                      :
                      <span className='text-red-600 font-semibold'>Pending</span>
                    }
                  </td>
                  <td className="px-4 py-3">{new Date(data.invoiceDate?.split("T")[0]).toLocaleDateString('en-GB')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
