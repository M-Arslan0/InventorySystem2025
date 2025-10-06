import { useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

//React Select
import ReactSelect from 'react-select';

//Hooks
import useGetAllAccounts from "../hooks/useGetAllAccounts";
import useGetAllAreas from "../hooks/useGetAllAreas";
import useGetAllCities from "../hooks/useGetAllCities";
import useGetAllCusVenTypes from "../hooks/useGetAllCusVenTypes";
import useGetAllCustomers from "../hooks/useGetAllCustomer";

//Icons
import {
  FaCirclePlus,
} from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

//Modals
import AreaModal from "./AreaModal";
import CityModal from "./CityModal";
import CusVenTypeModal from "./CusVenTypeModal";
import AccountsFormModal from "./AccountsFormModal";

export default function CustomerRegFormModal({ onClose }) {
  const { accountData } = useGetAllAccounts()
  const { areaData } = useGetAllAreas()
  const { cityData } = useGetAllCities()
  const { typeData } = useGetAllCusVenTypes()
  const { fetchCustomers } = useGetAllCustomers()


  //Modal
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false)
  const [isCityModalOpen, setIsCityModalOpen] = useState(false)
  const [isCustomerTypeModalOpen, setIsCustomerTypeModalOpen] = useState(false)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


  const onSubmit = async (payload) => {
    try {
      const { data, status } = await request("/customer/createCustomer", "POST", {
        "Content-Type": "application/json"
      }, { ...payload });
      if (status === 201) {
        fetchCustomers()
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "70%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New Customer</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex p-5">
            <div className="w-[50%] cards">
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">CUSTOMER DETAILS</div>
                  </div>

                  <div className="bg-blue-500 rounded-full p-4">
                    <IoPerson className="text-lg text-white" />
                  </div>
                </div>
                <label htmlFor="customerName">Name</label>
                <input type="text" id="name" {...register("customerName", { required: true })} placeholder="Customer Name" />
                {errors.customerName && <p className="text-red-500 text-xs">Name is required</p>}

                <div className="flex w-[100%] gap-2">
                  <div className="w-[50%] flex flex-col">
                    <label htmlFor="customerAddress">Address</label>
                    <textarea {...register("customerAddress")} cols="1" rows="3" placeholder="Customer Address" />

                    <label htmlFor="customerShippingAddress">Shipping Address</label>
                    <textarea {...register("customerShippingAddress")} cols="1" rows="3" placeholder="Customer Shipping Address" />

                    <p>Opening Balance</p>
                    <input type="number" step="0.01" placeholder="Rs. 0.00" {...register("customerOpeningBalance")} style={{ width: "100%", textAlign: "right" }} />
                  </div>

                  <div className="w-[50%] flex flex-col">
                    <label htmlFor="customerArea" onClick={() => setIsAreaModalOpen(true)}>Customer Area <FaCirclePlus className="inline text-green-600" /></label>
                    <ReactSelect
                      options={areaData.map((data) => ({
                        label: `${data.areaCode} | ${data.areaName}`,
                        value: data._id
                      }))}
                      placeholder="Search or select account..."
                      className="bg-white text-sm"
                      onChange={(selectedOption) => {
                        // manually set value inside react-hook-form
                        setValue("customerArea", selectedOption?.value);
                      }}
                      isSearchable
                      isClearable
                    />
                    <label htmlFor="customerCity" onClick={() => setIsCityModalOpen(true)}>Customer City<FaCirclePlus className="inline text-green-600" /></label>
                    <ReactSelect
                      options={cityData.map((data) => ({
                        label: `${data.cityCode} | ${data.cityName}`,
                        value: data._id
                      }))}
                      placeholder="Search or select account..."
                      className="bg-white text-sm"
                      onChange={(selectedOption) => {
                        // manually set value inside react-hook-form
                        setValue("customerCity", selectedOption?.value);
                      }}
                      isSearchable
                      isClearable
                    />
                    <label htmlFor="customerType" onClick={() => setIsCustomerTypeModalOpen(true)}>Customer Type<FaCirclePlus className="inline text-green-600" /></label>
                    <ReactSelect
                      options={typeData.map((data) => ({
                        label: `${data.typeCode} | ${data.typeName}`,
                        value: data._id
                      }))}
                      placeholder="Search or select account..."
                      className="bg-white text-sm"
                      onChange={(selectedOption) => {
                        // manually set value inside react-hook-form
                        setValue("customerType", selectedOption?.value);
                      }}
                      isSearchable
                      isClearable
                    />

                  </div>
                </div>
              </div>
            </div>

            <div className="w-[50%] mt-1 cards">
              <div className="card-t bg-lt-yellow">
                <div className="card-header">
                  <div>
                    <div className="card-title">Contact numbers --- 0000-000-00-00</div>
                  </div>
                  <div className="card-icon-sm bg-green">
                    <i className="fa-solid fa-phone-volume"></i>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w[50%]">
                  <div>
                    <label className="block" htmlFor="customerPhone1">Phone # 1</label>
                    <input type="tel" id="customerPhone1" {...register("customerPhone1")} className="bg-white" />
                  </div>

                  <div>
                    <label className="block" htmlFor="customerContactPerson1">Contact Person # 1</label>
                    <input type="text" id="customerContactPerson1" {...register("customerContactPerson1")} className="bg-white" />
                  </div>

                  <div>
                    <label className="block" htmlFor="customerPhone2">Phone # 2</label>
                    <input type="tel" id="customerPhone2" {...register("customerPhone2")} className="bg-white" />
                  </div>

                  <div>
                    <label className="block" htmlFor="customerContactPerson2">Contact Person # 2</label>
                    <input type="text" id="customerContactPerson2" {...register("customerContactPerson2")} className="bg-white" />
                  </div>

                  <div>
                    <label className="block" htmlFor="cuscustomerPhone3tomerPhone1">Phone # 3</label>
                    <input type="tel" id="customerPhone3" {...register("customerPhone3")} className="bg-white" />
                  </div>

                  <div>
                    <label className="block" htmlFor="customerContactPerson3">Contact Person # 3</label>
                    <input type="text" id="customerContactPerson3" {...register("customerContactPerson3")} className="bg-white" />
                  </div>

                  <div>
                    <label htmlFor="isActive">Status</label>
                    <select {...register("isActive")} className="bg-white">
                      <option value="true">Active</option>
                      <option value="false">In-Active</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ledgerAccount" onClick={() => setIsAccountModalOpen(true)}>Select Ledger A/c <FaCirclePlus className="inline text-green-600" /></label>
                    <ReactSelect
                      options={
                        accountData?.map((acc) => ({
                          label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`, // visible text
                          value: acc._id, // form me save hone wala value
                        })) || []
                      }
                      placeholder="Search or select account..."
                      className="text-sm bg-white"
                      onChange={(selectedOption) => {
                        setValue("customerLedgerAccount", selectedOption?.value);
                      }}
                      isSearchable
                      isClearable
                    />

                  </div>
                </div>
              </div>

              <div className="card flex gap-2">
                <button type="submit">Save</button>
                <button type="button" onClick={() => reset()}>Clear</button>
                <button type="button" onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isAreaModalOpen &&
        <AreaModal onClose={() => setIsAreaModalOpen(false)} />}
      {isCityModalOpen &&
        <CityModal onClose={() => setIsCityModalOpen(false)} />}
      {isCustomerTypeModalOpen &&
        <CusVenTypeModal onClose={() => setIsCustomerTypeModalOpen(false)} />}
      {isAccountModalOpen &&
        <AccountsFormModal onClose={() => setIsAccountModalOpen(false)} />}
    </div>
  );
}
