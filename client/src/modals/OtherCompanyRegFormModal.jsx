import React from "react";

export default function OtherCompanyRegFormModal() {
	return (
		<div className="modal">
			<div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "30%", backgroundColor: "white", margin: "0", padding: "0" }}>
				<div className="w-full flex items-center justify-center
                bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
					<span className="text-sm text-white uppercase font-bold">
						Company Profile
					</span>
				</div>
				<form className="cards">
					<div className="card row">
						<label for="">Company name</label>
						<input type="" />
						<label for="">Address</label>
						<input type="" />
						<div className="col-6">
							<label for="">Phone</label>
							<input type="" />
							<label for="">Mobile</label>
							<input type="" />
							<div className="flex justify-center p-1 m-5 border-1 border-gray-200">
								<p>Company Status</p>
								<input type="checkbox" style={{ width: "4%" }} />
							</div>

							<input type="button" value="Add Logo" />
						</div>
						<div className="col-6">
							<img src="img/logo.png" alt="" style={{ width: "100%" }} />
						</div>
					</div>
					<div className="card-t flex gap-2 bg-lt-yellow">
						<button>Save</button>
						<button>Clear</button>
						<button>Close</button>
					</div>
					<div className="card ">
						<table>
							<tr>
								<th>Other companys name</th>
							</tr>
							<tr>
								<td>Company name -1</td>
							</tr>
							<tr>
								<td>Company name -2</td>
							</tr>
							<tr>
								<td>Company name -3</td>
							</tr>
							<tr>
								<td>Company name -4</td>
							</tr>
							<tr>
								<td>Company name -5</td>
							</tr>
						</table>
					</div>
				</form>
			</div>
		</div>
	);
}
