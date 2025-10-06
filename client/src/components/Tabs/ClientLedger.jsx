import { useEffect, useState, useMemo } from 'react'

//Hooks
import { successNotifier, errorNotifier } from '../../services/Notifier';
import useDeleteData from '../../hooks/useDeleteData';
import { ToastContainer } from 'react-toastify';

import { FaEye, FaEdit, FaPrint, FaTrash } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";


export default function ClientLedger({ clientLedger }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenueOpen, setIsMenueOpen] = useState(false)
  const [menueId, setMenueId] = useState('')

  //delete hooks
  const { isDelete, error, message, status, deleteData, setIsDeleted } = useDeleteData()

  const handleDelete = (id) => {
    deleteData('ledger', 'deleteLedgerBy', id);
  };

  useEffect(() => {
    if (isDelete) {
      if (status === 200) {
        successNotifier(message);
        setIsDeleted(false);
        window.location.reload(); // Refresh the page to reflect changes
      } else {
        errorNotifier(message)
        setIsDeleted(false);
      }

    }
  }, [isDelete, message]);

const ledgerWithBalances = useMemo(() => {
  if (!filteredData) return [];

  let runningBalance = 0;

  return filteredData.map((transaction) => {
    const amount = transaction.amount || 0;
    const type = transaction.transectionType;

    // Simple double-entry accounting:
    if (type === "debit") {
      runningBalance += amount;
    } else if (type === "credit") {
      runningBalance -= amount;
    }

    return {
      ...transaction,
      runningBalance: runningBalance.toFixed(2),
    };
  });
}, [filteredData]);



  useEffect(() => {
    // Filter the clientLedger based on the search term
    if (!clientLedger) return;
    const filterData = clientLedger?.filter((inv) =>
      inv.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.referenceId?.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    setFilteredData(filterData);
  }, [searchTerm, clientLedger]);

  // Format currency with commas
  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }


  const menueitems = [
    { name: "Preview", icon: <FaEye />, action: () => { setClientId(menueId); setClientModal(true); }, textColor: "text-blue-600", bgColor: "bg-blue-50" },
    { name: "Delete", icon: <FaTrash />, action: () => handleDelete(menueId), textColor: "text-red-600", bgColor: "bg-red-50" },
  ];


  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Dated</th>
                <th scope="col" className="px-4 py-3">Ledger A/c</th>
                <th scope="col" className="px-4 py-3">Ref. Type</th>
                <th scope="col" className="px-4 py-3">Ref. Detail</th>
                <th scope="col" className="px-4 py-3">Subject</th>
                <th scope="col" className="px-4 py-3">Narration</th>
                <th scope="col" className="px-4 py-3">Trans. Type</th>
                <th scope="col" className="px-4 py-3">Debit</th>
                <th scope="col" className="px-4 py-3">Credit</th>
                <th scope="col" className="px-4 py-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledgerWithBalances.map((data, index) => (
                <tr
                  key={data._id}
                  className="border-b cursor-pointer dark:border-gray-700 hover:bg-gray-50"
                  onClick={() => { if (menueId === data._id) { setIsMenueOpen(false); setMenueId('') } else { setIsMenueOpen(true); setMenueId(data._id) } }}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {new Date(data.ledgerDate?.split("T")[0]).toLocaleDateString("en-GB")}
                  </th>
                  <td className="px-4 py-3">
                    {data.ledgerAccount?.accountName} ({data.ledgerAccount?.prefix}- {data.ledgerAccount?.accountId})
                  </td>
                  <td className="px-4 py-3">{data.referenceModel}</td>
                  <td className="px-4 py-3 font-semibold">
                    {data.referenceId?.prefix && `${data.referenceId.prefix} - `}{data.referenceId?.invoiceNo}
                  </td>

                  <td className="px-4 py-3">{data.remarks}</td>
                  <td className="px-4 py-3">{data.referenceId?.invRef}</td>
                  <td className={`px-4 py-3 font-semibold uppercase ${data.transectionType === "debit" ? "text-red-700" : "text-green-700"}`}>
                    {data.transectionType}
                  </td>
                  <td className="px-4 py-3 font-semibold text-red-700">
                    {data.transectionType === 'debit' ? formatCurrency(data.amount) : "-"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    {data.transectionType === 'credit' ? formatCurrency(data.amount) : "-"}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${parseFloat(data.runningBalance) >= 0 ? "text-green-700" : "text-red-700"
                    }`}>
                    {formatCurrency(data.runningBalance)}
                  </td>

                  {isMenueOpen && menueId === data._id &&
                    <div className='absolute bg-white z-10 rounded-lg right-10'>
                      <div className="flex space-x-4 p-2 border border-gray-200 rounded-md shadow-lg">

                        {menueitems.map((item, index) => (
                          <span key={index} className={`flex items-center gap-1 cursor-pointer transition delay-75 duration-300 ease-in-out ${item.textColor} rounded-md hover:scale-105`} onClick={item.action}>
                            {item.icon} {item.name}
                          </span>
                        ))}
                      </div>
                    </div>

                  }

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}