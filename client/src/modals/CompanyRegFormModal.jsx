export default function CompanyRegFormModal() {
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
					<div className="flex p-5">
						<div className="w-[60%] cards">
							<div className="card">
								<div className="card-header">
									<div>
										<div className="card-title">COMPANY INFORMATION</div>
									</div>
									<div className="card-icon-sm bg-green"><i className="fa-solid fa-building"></i></div>
								</div>
								<br />
								<label className="block" for="company-name">company Name</label>
								<input className="w-[100%]" type="text" id="user-name" name="user-name" />
								<br />
								<label className="block" for="address">Address</label>
								<textarea name="" id="" cols="1" rows="3"></textarea>

								<div className="w-[100%]"><br /><br />
									<label for="">NTN</label><input type="" style={{ width: "38%" }} />
									<label for="">STR</label><input type="" style={{ width: "38%" }} /><br /><br />
									<p>Enter your company name and contact number <br />for display on invoice, reports.<br />
										Logo size 100 x 100 px</p>
									<input type="button" value="Add Logo" />
								</div>
							</div>
						</div>

						<div className="w-[50%] cards">
							<div className="card">
								<div className="card-header">
									<div>
										<div className="card-title">Contact numbers -- 0000-000-00-00</div>
									</div>
									<div className="card-icon-sm bg-orange"><i className="fa-solid fa-phone-volume"></i></div>
								</div><br />
								<label for="">Phone</label>
								<input type="tel" />
								<label for="">Mobile</label>
								<input type="tel" />
								<label for="">Email</label>
								<input type="email" />
								<label for="">Website</label>
								<input type="email" />
								<label for="">facebook</label>
								<input type="email" />
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
