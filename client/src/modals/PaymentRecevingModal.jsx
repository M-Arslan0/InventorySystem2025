export default function PaymentRecevingModal({onClose}) {
	return (
		<div className="modal">
			<div className="modal-content bg-white border-2 border-[#006666]" style={{ maxWidth: "25%", backgroundColor: "white", margin: "0", padding: "0" }}>
				<div className="w-full flex items-center justify-center
                bg-[#006666]
                rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
					<span className="text-sm text-white uppercase font-bold">
						Company Profile
					</span>
				</div>
				<form>
					<div className="cards">
						<div className="card-t bg-lt-yellow">
							<div className="card-header">
								<div>
									<div className="card-title">Customer name | Area address</div>
									<p className="text-lg">
										Balance Due <span className="text-red-500 font-semibold">Rs. 15500.00</span>
									</p>
									<br />
								</div>
								<div className="card-icon-sm bg-blue">
									<i className="fa-solid fa-user-check"></i>
								</div>
							</div>

							<label htmlFor="date">Date</label>
							<input id="date" type="date" className="bg-white" />

							<label htmlFor="amount">Amount Received</label>
							<input id="amount" type="number" className="bg-white" />

							<label htmlFor="recTypeSelect">
								Received type
								<i className="fa-solid fa-circle-plus tab-btn" data-target="#recType"></i>
							</label>
							<select id="recTypeSelect" className="bg-white">
								<option>Cash Received</option>
								<option>Bank Transfer</option>
								<option>Jazz Cash</option>
								<option>Easypaisa</option>
							</select>

							<label htmlFor="bankSelect">
								Bank Name
								<i className="fa-solid fa-circle-plus tab-btn" data-target="#bank"></i>
							</label>
							<select id="bankSelect" className="bg-white">
								<option>Bank name -1</option>
								<option>Bank name -2</option>
								<option>Bank name -3</option>
								<option>0312-000-00-00</option>
								<option>0300-000-00-00</option>
							</select>

						</div>

						<div className="card text-sm">
							<button style={{ width: "100%", marginBottom: "5px" }}>SAVE</button>
							<button className="m-0.5">Print</button>
							<button className="m-0.5" >Clear</button>
							<button className="m-0.5" onClick={onClose}>Close</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
