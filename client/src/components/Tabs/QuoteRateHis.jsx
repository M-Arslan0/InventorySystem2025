import { useForm } from 'react-hook-form';

export default function QuoteRateHis({ quoteRateHistory }) {
  const {
    register,
    errors,
  } = useForm(
    {
      defaultValues: {
        "fromDate": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        "toDate": new Date().toISOString().split("T")[0],
         "numberOfDocument": 5,
      }
    }
  );
  return (

    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
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
                Number Of Document
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


        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Quote No</th>
                <th scope="col" className="px-4 py-3">Client</th>
                <th scope="col" className="px-4 py-3">Specs</th>
                <th scope="col" className="px-4 py-3">Rate</th>
                <th scope="col" className="px-4 py-3">Last Qty</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Dated</th>


              </tr>
            </thead>
            <tbody>
              {quoteRateHistory && quoteRateHistory.map((data, index) => (
                <tr key={data._id} className="border-b dark:border-gray-700 cursor-pointer"
                  onClick={() => window.open(`/QuotationEdit/${data.quoteData?._id}`, "blank")}>
                  <td className="px-4 py-3">{++index}</td>
                  <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.quoteData?.prefix} -{data.quoteData?.quoteNo}</th>
                  <td className="px-4 py-3">{data.clientData?.clientName}</td>
                  <td className="px-4 py-3">{data.specs}</td>
                  <td className="px-4 py-3">{data.rate}.00</td>
                  <td className="px-4 py-3">{data.qty}</td>
                  <td className="px-4 py-3">
                    {data.QuoteData?.isFinal
                      ?
                      <span className='text-green-600 font-semibold'>Final</span>
                      :
                      <span className='text-red-600 font-semibold'>Pending</span>
                    }
                  </td>
                  <td className="px-4 py-3">{new Date(data.quoteData?.quoteDate?.split("T")[0]).toLocaleDateString('en-GB')}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
