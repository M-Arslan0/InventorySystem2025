

export default function CustomerInfoCards({customerInfo}) {
  return (
   <div className="grid grid-cols-2 m-2">
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title-info">Customer information</div>
                  <div className="card-value-info">
                    <p>
                      <strong>Name</strong> {customerInfo.customerName}
                    </p>
                    <p>
                      <strong>Type</strong> {customerInfo?.customerType?.typeName}
                    </p>
                     <p>
                      <strong>Area</strong> {customerInfo?.customerArea?.areaName}
                    </p>
                     <p>
                      <strong>City</strong>{customerInfo?.customerCity?.cityName}
                    </p>
                    <p>
                      <strong>Address</strong> {customerInfo.customerAddress}
                    </p>
                    <p>
                      <strong>Shipping Address</strong> {customerInfo.customerShippingAddress}
                    </p>

                    <p>
                      <strong>Ledger A/c</strong> {customerInfo.customerLedgerAccount?.accountName}
                    </p>


                  </div>
                </div>
                <div className="card-icon-lg bg-gray">
                  <i className="fa-regular fa-circle-user"></i>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title-info">Contact numbers</div>
                  <div className="card-value-info">
                    <p>
                      <strong>Phone # 1</strong>  <span>{customerInfo.customerPhone1}</span>
                    </p>
                    <p>
                      <strong>Contact Person # 1</strong> <span>{customerInfo.customerContactPerson1}</span>
                    </p>
                    <p>
                      <strong>Phone # 2</strong>  <span>{customerInfo.customerPhone2}</span>
                    </p>
                    <p>
                      <strong>Contact Person # 1</strong>  <span>{customerInfo.customerContactPerson2}</span>
                    </p>
                    <p>
                      <strong>Phone # 3</strong>  <span>{customerInfo.customerPhone3}</span>
                    </p>
                    <p>
                      <strong>Contact Person # 1</strong>  <span>{customerInfo.customerContactPerson3}</span>
                    </p>
                  </div>
                </div>
                <div className="card-icon-lg bg-pink">
                  <i className="fa-regular fa-id-badge"></i>
                </div>
              </div>
            </div>

          </div>

        )}
