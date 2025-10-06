import { useState, useEffect } from "react";

//Modals
import CustomerCards from "../CustomerCards/CustomerCards";
import CustomerInfoCards from "../CustomerCards/CustomerInfoCards";
import CustomerRegFormModal from "../../modals/CustomerRegFormModal";
import LedgerBookModal from "../../modals/LedgerBookModal";
import PaymentRecevingModal from "../../modals/PaymentRecevingModal";
import CustomerReturnModal from "../../modals/CustomerReturnModal";

//Icons
import {
	FaFileInvoice,
	FaLayerGroup,
	FaMoneyCheckAlt,
	FaUndo
} from 'react-icons/fa';
import { FaFolderOpen, FaCreditCard, FaRotateLeft } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { FaSync, FaSearch } from "react-icons/fa";

//Hooks
import useGetAllCustomers from "../../hooks/useGetAllCustomer";


export default function CustomerList() {

	const { customerData, isLoading, error, fetchCustomers } = useGetAllCustomers()
	const [customerInfo, setCustomerInfo] = useState('')
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	//Modal States
	const [custumerRegModalOpen, setCustumerRegModalOpen] = useState(false)
	const [ledgerBookModalOpen, setLedgerBookModalOpen] = useState(false)
	const [paymentRecevingModalOpen, setPaymentRecevingModalOpen] = useState(false)
	const [customerReturnModalOpen, setCustomerReturnModalOpen] = useState(false)

	const tabItems = [
		{
			title: "INVOICE",
			icon: <FaFileInvoice />,
		},
		{
			title: "SALE ITEMS",
			icon: <FaLayerGroup />,
		},
		{
			title: "PAYMENT",
			icon: <FaMoneyCheckAlt />,
		},
		{
			title: "RETURN ITEMS",
			icon: <FaUndo />,
		},
	];

	// Sync data
	useEffect(() => {
		setFilteredCustomers(customerData);
	}, [customerData]);

	// Search filter
	useEffect(() => {
		const filtered = customerData.filter((customer) =>
			customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredCustomers(filtered);
	}, [searchTerm, customerData]);

	return (
		<div className="w-full">
			{/* Page Menu */}
			<div className="row page-menu flex w-full p-1 border-b-2 border-[#b0c4c4] items-center justify-start">
				{/* Left Side Title */}
				<div className="w-[20%]">
					<h2 className="font-bold">Customers</h2>
				</div>

				{/* Actions */}
				<div className="flex gap-2 items-center">
					<button
						onClick={() => setCustumerRegModalOpen(true)}
						className="px-2 py-1 flex items-center gap-1 hover:bg-gray-200 rounded"
					>
						<IoMdPersonAdd className="text-lg" /> New Customer
					</button>
					<span>|</span>

					<button
						onClick={() => setLedgerBookModalOpen(true)}
						className="px-2 py-1 flex items-center gap-1 hover:bg-gray-200 rounded"
						disabled={!customerInfo}
					>
						<FaFolderOpen className="text-lg" /> Ledger
					</button>
					<span>|</span>

					<button
						onClick={() => setPaymentRecevingModalOpen(true)}
						className="px-2 py-1 flex items-center gap-1 hover:bg-gray-200 rounded"
					>
						<FaCreditCard className="text-lg" /> Payments
					</button>
					<span>|</span>

					<button
						onClick={() => setCustomerReturnModalOpen(true)}
						className="px-2 py-1 flex items-center gap-1 hover:bg-gray-200 rounded"
					>
						<FaRotateLeft className="text-lg" /> Return Items
					</button>
				</div>
			</div>

			{/* Main Layout */}
			<div className="flex justify-between">
				{/* customer Balance */}
				<div className="w-[30%] cards p-2">
					<div className="card" style={{ minHeight: "75vh" }}>
						{/* Header Controls */}
						<div className="flex items-center justify-between mb-3">
							<h2 className="card-title-info">Customers</h2>
							<div className="flex items-center gap-2">
								{/* Search */}
								<div className="relative">
									<input
										type="text"
										placeholder="Search..."
										className="border rounded pl-8 pr-2 py-1 text-sm"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>

								</div>

								{/* Refresh */}
								<button
									className="px-3 py-1 bg-[#006666] text-white rounded flex items-center gap-1 text-sm hover:bg-[#004d4d]"
									onClick={fetchCustomers}
								>
									<FaSync /> Refresh
								</button>
							</div>
						</div>

						{/* Table */}
						{isLoading ? (
							<p className="text-center text-gray-500">Loading...</p>
						) : error ? (
							<p className="text-center text-red-500">{error}</p>
						) : (
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-gray-100">
										<th className="td-left py-2 px-3 border">NAME</th>
										<th className="td-right py-2 px-3 border">AMOUNT</th>
									</tr>
								</thead>
								<tbody>
									{filteredCustomers.length > 0 ? (
										filteredCustomers.map((customer, index) => (
											<tr key={customer._id} onClick={() => setCustomerInfo(customer)} className={`${customer._id === customerInfo._id ? "bg-[#f9facd]" : ""}`}>
												<td className="td-left py-2 px-3">
													{customer.customerName}
												</td>
												<td className="td-right py-2 px-3">
													{customer.openingBalance?.toFixed(2) ?? "0.00"}
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="2" className="text-center py-3 text-gray-500">
												No customers found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						)}
					</div>
				</div>
				{/* Right Section */}
				<div className="w-[70%]">

					{/* Stats Cards */}
					<div>
						<CustomerCards
							totalCustomers={customerData.length}
						/>
					</div>

					{/* customer Info */}
					<div>
						<CustomerInfoCards
							customerInfo={customerInfo}
						/>
					</div>


					{/* Transaction Tabs (only one shown for brevity) */}
					<div className="bg-black">
						<div className="tab button">
							{tabItems.map((item, index) => (
								<button className="button flex gap-1" key={index}>
									<span className="text-lg">{item.icon}</span>
									<span>{item.title}</span>
								</button>
							))}
						</div>

					</div>
				</div>
			</div>

			{custumerRegModalOpen &&
				<CustomerRegFormModal
					onClose={() => { setCustumerRegModalOpen(false) }}
				/>}

			{ledgerBookModalOpen &&
				<LedgerBookModal
					onClose={() => setLedgerBookModalOpen(false)}
					ledgerAccountId = {customerInfo._id}
					/>}

			{paymentRecevingModalOpen &&
				<PaymentRecevingModal
					onClose={() => setPaymentRecevingModalOpen(false)}
				/>}

			{customerReturnModalOpen &&
				<CustomerReturnModal
					onClose={() => setCustomerReturnModalOpen(false)}
				/>}
		</div>
	);
};

