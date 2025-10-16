import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";
// Hooks
import useGetAllCategories from "../hooks/useGetAllCategories";
// Icons
import { FaLayerGroup, FaRotateRight } from "react-icons/fa6";

export default function CategoryFormModal({ onClose }) {
	const { categoryData, isLoading, isError, error, fetchCategories, isFetching } = useGetAllCategories();
	const { register, handleSubmit, reset } = useForm({});

	// ✅ Submit Handler
	const onSubmit = async (payload) => {
		try {
			const response = await request(
				"/misc/createCategory",
				"POST",
				{ "Content-Type": "application/json" },
				{ ...payload }
			);

			if (response.status === 201 || response.status === 200) {
				alert("Category added successfully ✅");
				reset();
				fetchCategories(); // Refresh the category list
			} else {
				alert(response.data?.message || "Failed to add category ❌");
			}
		} catch (err) {
			console.error("Error adding category:", err);
			alert(err?.message || "An error occurred while adding the category");
		}
	};

	return (
		<div className="modal">
			<div
				className="modal-content bg-white border-2 border-[#006666]"
				style={{ maxWidth: "40%", backgroundColor: "white", margin: "0", padding: "0" }}
			>
				{/* Header */}
				<div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
					<span className="text-sm text-white uppercase font-bold">Product Category</span>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row">
						<div className="cards space-y-4">
							{/* Add Category Form */}
							<div className="card p-4 border rounded shadow-sm">
								<div className="card-header flex justify-between items-center mb-2">
									<div className="card-title font-bold">ADD CATEGORY</div>
									<div className="card-icon-sm bg-pink text-white p-2 rounded">
										<FaLayerGroup />
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
										{...register("categoryName", {
											required: "Category Name is required",
										})}
									/>
									<input
										type="text"
										placeholder="Category Code"
										className="border p-1 text-center"
										style={{ width: "30%" }}
										{...register("categoryCode", {
											required: "Category code is required",
											maxLength: {
												value: 3,
												message: "Code must be 2 or 3 characters long",
											},
										})}
									/>
								</div>

								<div className="flex gap-2">
									<button type="submit">
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
								<div className="flex w-full justify-center gap-2 items-center mb-2">
									<div className="flex w-[90%] items-center">
										<input
											type="search"
											placeholder="Search Category..."
											className="border p-1"
											style={{ width: "100%" }}
										/>
									</div>
									<button
										type="button"
										style={{ width: "10%", padding: "9px" }}
										className="flex justify-center bg-[#004d4d]"
										onClick={fetchCategories}
									>
										<FaRotateRight className="text-white" />
									</button>
								</div>

								{/* Table */}
								<table className="w-full border">
									<thead className="bg-gray-100">
										<tr>
											<th className="text-left p-1">Category Name</th>
											<th className="text-center p-1">Category Code</th>
											<th className="text-center p-1">Status</th>
											<th className="text-center p-1">Actions</th>
										</tr>
									</thead>
									<tbody>
										{categoryData.map((cat) => (
											<tr key={cat._id}>
												<td className="p-1">{cat.categoryName}</td>
												<td className="text-center p-1">{cat.categoryCode}</td>
												<td className="text-center py-2 px-3">
													<span
														className={`px-2 py-1 rounded text-xs font-semibold ${cat.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
															}`}
													>
														{cat.isActive ? "Active" : "Inactive"}
													</span>
												</td>
												<td className="flex gap-2 justify-center p-1">
													<span className="cursor-pointer text-blue-500">Edit</span>
													|
													<span className="cursor-pointer text-blue-500">Delete</span>
												</td>
											</tr>
										))}
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
