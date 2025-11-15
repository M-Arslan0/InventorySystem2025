import { useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

//React Select
import ReactSelect from "react-select";

//Hooks
import useGetAllAccounts from "../hooks/useGetAllAccounts";
import useGetAllAreas from "../hooks/useGetAllAreas";
import useGetAllCities from "../hooks/useGetAllCities";
import useGetAllCusVenTypes from "../hooks/useGetAllCusVenTypes";
import useGetAllSuppliers from "../hooks/useGetAllSuppliers"; // 🔥 Supplier Hook

//Icons
import { FaCirclePlus } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

//Modals
import AreaModal from "./AreaModal";
import CityModal from "./CityModal";
import CusVenTypeModal from "./CusVenTypeModal";
import AccountsFormModal from "./AccountsFormModal";

export default function SupplierRegFormModal({ onClose }) {
  const { accountData } = useGetAllAccounts();
  const { areaData } = useGetAllAreas();
  const { cityData } = useGetAllCities();
  const { typeData } = useGetAllCusVenTypes();
  const { fetchSuppliers } = useGetAllSuppliers(); // 🔥 Refresh Supplier List

  //Modals
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isSupplierTypeModalOpen, setIsSupplierTypeModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payload) => {
    try {
      const { data, status } = await request(
        "/supplier/createSupplier", // 🔥 API UPDATED
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );

      if (status === 201) {
        fetchSuppliers(); // 🔥 Refresh supplier list
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "70%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New Supplier</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex p-5">
            {/* LEFT SIDE */}
            <div className="w-[50%] cards">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">SUPPLIER DETAILS</div>

                  <div className="bg-blue-500 rounded-full p-4">
                    <IoPerson className="text-lg text-white" />
                  </div>
                </div>

                <label htmlFor="supplierName">Name</label>
                <input
                  type="text"
                  {...register("supplierName", { required: true })}
                  placeholder="Supplier Name"
                />
                {errors.supplierName && (
                  <p className="text-red-500 text-xs">Name is required</p>
                )}

                <div className="flex w-[100%] gap-2">
                  <div className="w-[50%] flex flex-col">
                    <label htmlFor="supplierAddress">Address</label>
                    <textarea {...register("supplierAddress")} rows="3" />

                    <label htmlFor="supplierShippingAddress">
                      Shipping Address
                    </label>
                    <textarea {...register("supplierShippingAddress")} rows="3" />

                    <label htmlFor="supplierOpeningBalance">
                      OPENING BALANCE
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("supplierOpeningBalance")}
                      placeholder="Rs. 0.00"
                      style={{ width: "100%", textAlign: "right" }}
                    />
                  </div>

                  <div className="w-[50%] flex flex-col">
                    {/* AREA */}
                    <label onClick={() => setIsAreaModalOpen(true)}>
                      Supplier Area <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <ReactSelect
                      options={areaData.map(a => ({
                        label: `${a.areaCode} | ${a.areaName}`,
                        value: a._id
                      }))}
                      onChange={(e) => setValue("supplierArea", e?.value)}
                      isClearable
                      isSearchable
                    />

                    {/* CITY */}
                    <label onClick={() => setIsCityModalOpen(true)}>
                      Supplier City <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <ReactSelect
                      options={cityData.map(c => ({
                        label: `${c.cityCode} | ${c.cityName}`,
                        value: c._id
                      }))}
                      onChange={(e) => setValue("supplierCity", e?.value)}
                      isClearable
                      isSearchable
                    />

                    {/* SUPPLIER TYPE */}
                    <label onClick={() => setIsSupplierTypeModalOpen(true)}>
                      Supplier Type <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <ReactSelect
                      options={typeData.map(t => ({
                        label: `${t.typeCode} | ${t.typeName}`,
                        value: t._id
                      }))}
                      onChange={(e) => setValue("supplierType", e?.value)}
                      isClearable
                      isSearchable
                    />

                    {/* DEFAULT ACCOUNT */}
                    <label onClick={() => setIsAccountModalOpen(true)}>
                      Default Opening Balance A/c{" "}
                      <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <ReactSelect
                      options={accountData.map(acc => ({
                        label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                        value: acc._id
                      }))}
                      onChange={(e) =>
                        setValue("supplierOpeningBalanceAcc", e?.value)
                      }
                      isClearable
                      isSearchable
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-[50%] mt-1 cards">
              <div className="card-t bg-lt-yellow">
                <div className="card-header">
                  <div className="card-title">Contact numbers --- 0000-0000000</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label>Phone # 1</label>
                    <input type="tel" {...register("supplierPhone1")} />
                  </div>

                  <div>
                    <label>Contact Person # 1</label>
                    <input type="text" {...register("supplierContactPerson1")} />
                  </div>

                  <div>
                    <label>Phone # 2</label>
                    <input type="tel" {...register("supplierPhone2")} />
                  </div>

                  <div>
                    <label>Contact Person # 2</label>
                    <input type="text" {...register("supplierContactPerson2")} />
                  </div>

                  <div>
                    <label>Phone # 3</label>
                    <input type="tel" {...register("supplierPhone3")} />
                  </div>

                  <div>
                    <label>Contact Person # 3</label>
                    <input type="text" {...register("supplierContactPerson3")} />
                  </div>

                  {/* Ledger Account */}
                  <div className="col-span-2">
                    <label onClick={() => setIsAccountModalOpen(true)}>
                      Select Ledger A/c{" "}
                      <FaCirclePlus className="inline text-green-600" />
                    </label>
                    <ReactSelect
                      options={accountData.map(acc => ({
                        label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                        value: acc._id
                      }))}
                      onChange={(e) => setValue("ledgerAccount", e?.value)}
                      isClearable
                      isSearchable
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="card flex gap-2">
                <button type="submit">Save</button>
                <button type="button" onClick={() => reset()}>
                  Clear
                </button>
                <button type="button" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* MODALS */}
      {isAreaModalOpen && <AreaModal onClose={() => setIsAreaModalOpen(false)} />}
      {isCityModalOpen && <CityModal onClose={() => setIsCityModalOpen(false)} />}
      {isSupplierTypeModalOpen && (
        <CusVenTypeModal onClose={() => setIsSupplierTypeModalOpen(false)} />
      )}
      {isAccountModalOpen && (
        <AccountsFormModal onClose={() => setIsAccountModalOpen(false)} />
      )}
    </div>
  );
}
