import { FaBeerMugEmpty, FaMagnifyingGlass, FaRotateRight } from "react-icons/fa6";

export default function CategoryFormModal({ onClose }) {
	return (
			 <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "40%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Product Category</span>
        </div>
				<form>
					<div className="row">
						<div className="cards space-y-4">
							{/* Add Category Form */}
							<div className="card p-4 border rounded shadow-sm">
								<div className="card-header flex justify-between items-center mb-2">
									<div className="card-title font-bold">ADD Category</div>
									<div className="card-icon-sm bg-pink text-white p-2 rounded">
										<FaBeerMugEmpty />
									</div>
								</div>
								<p className="text-sm mb-2">
									<label className="font-semibold">Category Name</label> and enter the 2 or 3 letters for code
								</p>
								<div className="flex gap-2 mb-4">
									<input
										type="text"
										placeholder="Category Name"
										className="border p-1 flex-1"
									/>
									<input
										type="text"
										placeholder="Code"
										className="border p-1 text-center"
										style={{ width: "30%" }}
									/>
								</div>
								<div className="flex gap-2">
									<button type="button">
										Add
									</button>
									<button type="reset">
										Clear
									</button>
									<button type="button" onClick={onClose}>
										Close
									</button>
								</div>
							</div>

							{/* Category List Table */}
							<div className="card p-4 border rounded shadow-sm min-h-[50vh]">
								{/* Search + Refresh */}
								<div className="flex justify-center gap-2 items-center mb-2">
									<div className="flex items-center gap-2">
										<input
											type="search"
											placeholder="Search Category..."
											className="border p-1 w-48"
										/>
										<button type="button" className="flex justify-center p-2 bg-[#004d4d]">
											<FaMagnifyingGlass className="text-white" />
										</button>
									</div>
									<button type="button" className="flex justify-center p-2 bg-[#004d4d]">
										<FaRotateRight className="text-white" />
									</button>
								</div>

								{/* Table */}
								<table className="w-full border">
									<thead className="bg-gray-100">
										<tr>
											<th className="text-left p-1">NAME</th>
											<th className="text-center p-1">CODE</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="p-1">Dollar</td>
											<td className="text-center p-1">DR</td>
										</tr>
										<tr>
											<td className="p-1">DUX</td>
											<td className="text-center p-1">DX</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
