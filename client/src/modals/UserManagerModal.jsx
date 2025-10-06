
export default function UserManagerModal() {
	return (
		<div className="modal">
      <div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "30%", backgroundColor: "white", margin: "0", padding: "0" }}>
        <div className="w-full flex items-center justify-center
                bg-[#006666]
                rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Company Profile
          </span>
        </div>
				<form>
					<div className="cards">
						<div className="card">
							<div className="card-header">
								<div>
									<div className="card-title">USER INFORMATION</div>
								</div>
								<div className="card-icon-sm bg-green"><i className="fa-solid fa-user"></i></div>
							</div>
							<label htmlFor="user-name">Name</label>
							<input type="text" id="user-name" name="user-name" />
							<label htmlFor="user-password">password</label>
							<input type="password" id="user-password" name="user-password" />
							<label htmlFor="user-type">user type</label>
							<select name="user-type" id="user-type">
								<option value="Admin">Admin</option>
								<option value="Salesman">Salesman</option>
								<option value="Viewer">Viewer</option>
							</select>
							<br />
							<label htmlFor="Status">Status</label>
							<select name="Status" id="Status">
								<option value="Is Active">Is Active</option>
								<option value="In Active">In Active</option>
								<option value="Block">Block</option>
							</select>

                            <div className="flex gap-2 m-5 ">
                            <button type="button">Save</button>
							<button type="button">Clear</button>
							<button type="button">Close</button>
                            </div>

						</div>
						<div className="card">
							<table>
								<thead>
									<tr>
										<th>NAME</th>
										<th>TYPE</th>
										<th>STATUS</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Uase -1</td>
										<td>Admin</td>
										<td>Active</td>
									</tr>
									<tr>
										<td>Uase -2</td>
										<td>Salesman</td>
										<td>Active</td>
									</tr>
									<tr>
										<td>Uase -3</td>
										<td>Salesman</td>
										<td>In Active</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
