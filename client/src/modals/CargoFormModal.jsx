export default function CargoFormModal() {
	return (
		<div className="modal">
			<div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "70%", backgroundColor: "white", margin: "0", padding: "0" }}>
				<div className="w-full flex items-center justify-center
                bg-[#006666]
                rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
					<span className="text-sm text-white uppercase font-bold">
						Company Profile
					</span>
				</div>
				<form>
					<div className="flex w-[100%]">

						<div className="w-[50%] cards">
							<div className="card">
								<div className="card-header">
									<div>
										<div className="card-title">USER INFORMATION</div>
									</div>
									<div className="card-icon-sm bg-orange">
										<i className="fa-solid fa-truck"></i>
									</div>
								</div>
								<label htmlFor="user-name">Name</label>
								<input type="text" id="user-name" name="user-name" />
								<label htmlFor="user-password">Address</label>
								<textarea name="" id="" cols="1" rows="4"></textarea>
								<label htmlFor="user-type">Attachment</label>
								<textarea name="" id="" cols="1" rows="4"></textarea>
								<br />
								<br />
							</div>
						</div>

						<div className="w-[50%] cards">
							<div className="card-t bg-lt-yellow">
								<div className="card-header">
									<div>
										<div className="card-title">
											Contact numbers --- 0000-000-00-00
										</div>
									</div>
									<div className="card-icon-sm bg-green">
										<i className="fa-solid fa-phone-volume"></i>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-2 w[50%]">
									<div>
										<label className="block" htmlFor="mobile">Phone # 1</label>
										<input type="tel" id="mobile"className="bg-white"/>
									</div>

									<div>
										<label className="block" htmlFor="mobile">Contact Person # 1</label>
										<input type="tel" id="mobile" className="bg-white"/>
									</div>

									<div>
										<label className="block" htmlFor="mobile">Mobile # 2</label>
										<input type="tel" id="mobile" className="bg-white"/>
									</div>

									<div>
										<label className="block" htmlFor="mobile">Contact Person # 2</label>
										<input type="tel" id="mobile" className="bg-white"/>
									</div>

									<div>
										<label className="block" htmlFor="mobile">Mobile # 3</label>
										<input type="tel" id="mobile" className="bg-white"/>
									</div>

									<div>
										<label className="block" htmlFor="mobile">Contact Person # 3</label>
										<input type="tel" id="mobile" className="bg-white"/>
									</div>

									<div>
										<label htmlFor="Status">Status</label>
										<select name="" id="" className="bg-white">
											<option value="">Is Active</option>
											<option value="">In Active</option>
											<option value="">Block</option>
										</select>
									</div>
								</div>
							</div>
							<div className="card flex gap-2">
								<button>Save</button>
								<button>Clear</button>
								<button>Close</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
