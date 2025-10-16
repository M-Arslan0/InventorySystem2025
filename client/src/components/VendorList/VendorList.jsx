
import CustomerCards from "../CustomerCards/CustomerCards";
import CustomerInfoCards from "../CustomerCards/CustomerInfoCards";

//Icons
import {
  FaFileInvoice,
  FaLayerGroup,
  FaMoneyCheckAlt,
  FaUndo
} from 'react-icons/fa';

export default function VendorList() {

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

  return (
	<div className="w-full">
	  {/* Page Menu */}
	      <div className=" row page-menu flex w-full p-1 border-b-2 border-[#b0c4c4]">

		<div className="w-[20%]">
		  <h2>VendorS</h2>
		</div>

		<div className="">
		  <button id="open-customer-form">
			<i className="fa-solid fa-user"></i> New Vendor
		  </button>
		  <span>|</span>
		  <button id="open-ledger-form">
			<i className="fa-regular fa-folder-open"></i> Ledger
		  </button>
		  <span>|</span>
		  <button id="open-received-form">
			<i className="fa-regular fa-credit-card"></i> Payments
		  </button>
		  <span>|</span>
		  <button id="open-returnItems-form">
			<i className="fa-solid fa-rotate-left"></i> Return Items
		  </button>
		</div>
	  </div>

	  {/* Main Layout */}
	  <div className="flex justify-between">
		{/* Vendor Balance */}
		<div className="w-[30%] cards p-2">
		  <div className="card" style={{ minHeight: "75vh" }}>
			<h2 className="card-title-info">Vendor Balance</h2>
			<table>
			  <thead>
				<tr>
				  <th className="td-left">NAME</th>
				  <th className="td-right">AMOUNT</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <td>Vendor -1</td>
				  <td className="td-right">Rs. 12500.00</td>
				</tr>
				<tr>
				  <td>Vendor -2</td>
				  <td className="td-right">Rs. 106800.00</td>
				</tr>
				<tr>
				  <td>Vendor -3</td>
				  <td className="td-right">Rs. 117580.00</td>
				</tr>
			  </tbody>
			</table>
		  </div>
		</div>

		{/* Right Section */}
		<div className="w-[70%]">

		  {/* Stats Cards */}
		 {/* SW */}

		  {/* Vendor Info */}
		{/*   <div>
			<CustomerInfoCards />
		  </div>
 */}

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


	</div>
  );
};

