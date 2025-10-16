import { useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";
//Hooks
import useGetAllAccounts from "../hooks/useGetAllAccounts";


//React Select
import ReactSelect from 'react-select';

//Hooks
import useGetAllBrands from "../hooks/useGetAllBrand";
import useGetAllCategories from "../hooks/useGetAllCategories";
import useGetAllPackingSize from "../hooks/useGetAllPackingSize";
import useGetAllUOM from "../hooks/useGetAllUOM";

//Modal
import BrandFormModal from "./BrandFormModal";
import CategoryFormModal from "./CategoryFormModal";
import PackingSizeFormModal from "./packingSizeModal";
import UOMFormModal from "./UOMFormModal";

//Icons
import { FaBarcode, FaCirclePlus, FaPenNib, FaTag, FaBoxesStacked } from "react-icons/fa6";

export default function ProductRegFormModal({ onClose }) {
  const { setValue } = useForm({})
  const { brandData } = useGetAllBrands()
  const { categoryData } = useGetAllCategories()
  const { packingSizeData } = useGetAllPackingSize()
  const { uomData } = useGetAllUOM()
  const { accountData } = useGetAllAccounts()

  //Modal Variable
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isPackingSizeModalOpen, setIsPackingSizeModalOpen] = useState(false)
  const [isUOMModalOpen, setIsUOMModalOpen] = useState(false)

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "95%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New products</span>
        </div>
        <form>
          <div className="grid grid-cols-4">

            {/*Product Basic Info */}
            <div className="col-span-1">
              <div className="col-span-3 cards">
                <div className="card p-2 border rounded">
                  <div className="card-header flex justify-between items-center">
                    <div className="card-title font-bold">CODE</div>
                    <div className="card-icon-sm bg-orange text-white p-2 rounded">
                      <FaBarcode />
                    </div>
                  </div>
                  <br />
                  <label>Item Code</label>
                  <input type="text" />
                  <label>Bar Code</label>
                  <input type="text" />
                  <div className="flex w-full gap-2">
                    <div className="w-1/2">
                      <label>
                        Brand <FaCirclePlus className="inline text-green-600" onClick={() => setIsBrandModalOpen(true)} />
                      </label>
                      <ReactSelect
                        options={brandData.map((data) => ({
                          label: `${data.brandCode} | ${data.brandName}`,
                          value: data._id
                        }))}
                        placeholder="Search Brand"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          // manually set value inside react-hook-form
                          setValue("productBrand", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />
                    </div>
                    <div className="w-1/2">
                      <label>
                        Category <FaCirclePlus className="inline text-green-600" onClick={() => setIsCategoryModalOpen(true)} />
                      </label>
                      <ReactSelect
                        options={categoryData.map((data) => ({
                          label: `${data.categoryCode} | ${data.categoryName}`,
                          value: data._id
                        }))}
                        placeholder="Search Cat"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          // manually set value inside react-hook-form
                          setValue("productCategory", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />
                    </div>
                  </div>
                  <label>
                    Type <FaCirclePlus className="inline text-green-600" />
                  </label>
                  <select className="bg-white">
                    <option>Local</option>
                    <option>Import</option>
                    <option>Company</option>
                  </select>
                </div>
                <div className="card mt-2 p-2 border rounded">
                  <input type="text" placeholder="Memo.../" />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="col-span-2">
              <div className="cards mt-1">
                <div className="card-t bg-yellow-100 p-2 border rounded">
                  <div className="card-header flex justify-between items-center">
                    <div className="card-title font-bold">ITEM NAME</div>
                    <div className="card-icon-sm bg-purple-500 text-white p-2 rounded">
                      <FaPenNib />
                    </div>
                  </div>
                  <br />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label>Name</label>
                      <input type="text" className="bg-white" />
                    </div>
                    <div>
                      <label>Art #</label>
                      <input type="text" className="bg-white" />
                    </div>

                    <div>
                      <label>
                        Packing Size <FaCirclePlus className="inline text-green-600" onClick={() => setIsPackingSizeModalOpen(true)} />
                      </label>
                      <ReactSelect
                        options={packingSizeData.map((data) => ({
                          label: `${data.packingSizeCode} | ${data.packingSizeName}`,
                          value: data._id
                        }))}
                        placeholder="Select Packing Size"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          setValue("productPackingSize", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />
                    </div>
                    <div>
                      <label>
                        UOM <FaCirclePlus className="inline text-green-600" onClick={() => setIsUOMModalOpen(true)} />
                      </label>
                      <ReactSelect
                        options={uomData.map((data) => ({
                          label: `${data.uomCode} | ${data.uomName}`,
                          value: data._id,
                        }))}
                        placeholder="Select UOM"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          // manually set value inside react-hook-form
                          setValue("productUOM", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />
                    </div>
                  </div>

                  <label>Item Full Name</label>
                  <input type="text" className="bg-white" />

                  <div className="grid grid-cols-2 gap-2">
                  <div>
                  <label>Select Sales Account</label>
                 <ReactSelect
                      options={accountData?.map((acc) => ({
                        label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                        value: acc._id,
                      })) || []}
                      placeholder="Search account..."
                      className="text-sm bg-white"
                      onChange={(selectedOption) => setValue("ledgerAccount", selectedOption?.value)}
                      isSearchable
                      isClearable
                      menuPortalTarget={document.body} // 👈 yahan magic
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 zIndex yahan set karo
                      }}
                    />
                  </div>
                  <div>
                  <label>Select Purchase Account</label>
                 <ReactSelect
                      options={accountData?.map((acc) => ({
                        label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                        value: acc._id,
                      })) || []}
                      placeholder="Search account..."
                      className="text-sm bg-white"
                      onChange={(selectedOption) => setValue("ledgerAccount", selectedOption?.value)}
                      isSearchable
                      isClearable
                      menuPortalTarget={document.body} // 👈 yahan magic
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 zIndex yahan set karo
                      }}
                    />
                  </div>
                  <div>
                  <label>Select Sales Account</label>
                 <ReactSelect
                      options={accountData?.map((acc) => ({
                        label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                        value: acc._id,
                      })) || []}
                      placeholder="Search account..."
                      className="text-sm bg-white"
                      onChange={(selectedOption) => setValue("ledgerAccount", selectedOption?.value)}
                      isSearchable
                      isClearable
                      menuPortalTarget={document.body} // 👈 yahan magic
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 zIndex yahan set karo
                      }}
                    />
                  </div>
                  <div>
                  <label>Select Sales Account</label>
                 <ReactSelect
                      options={accountData?.map((acc) => ({
                        label: `${acc.accountName} | ${acc.accountNature} | ${acc.accountType}`,
                        value: acc._id,
                      })) || []}
                      placeholder="Search account..."
                      className="text-sm bg-white"
                      onChange={(selectedOption) => setValue("ledgerAccount", selectedOption?.value)}
                      isSearchable
                      isClearable
                      menuPortalTarget={document.body} // 👈 yahan magic
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 zIndex yahan set karo
                      }}
                    />
                  </div>
                  <div>

                </div>
                </div>
                </div>
              </div>
            </div>

            {/* Product Par Level */}
            <div className="col-span-1">
            <div className="grid grid-cols-4">
              {/* PRICE Section */}

              <div className="col-span-2 cards">
                <div className="card p-2 border rounded">
                  <div className="card-header flex justify-between items-center">
                    <div className="card-title font-bold">PRICE</div>
                    <div className="card-icon-sm bg-green text-white p-2 rounded">
                      <FaTag />
                    </div>
                  </div>
                  <br />
                  <label>Cost</label>
                  <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                  <label>Special price <b>0.0%</b></label>
                  <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                  <label>Wholesale price <b>0.0%</b></label>
                  <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                  <label>Retail price <b>0.0%</b></label>
                  <input type="text" placeholder="0.00" className="border w-full p-1 text-right" />
                </div>
              </div>

              {/* Quantity Section */}
              <div className="col-span-2 cards">
                <div className="card p-2 border rounded">
                  <div className="card-header flex justify-between items-center">
                    <div className="card-title font-bold">Required Quantity</div>
                    <div className="card-icon-sm bg-orange text-white p-2 rounded">
                      <FaBoxesStacked />
                    </div>
                  </div>
                  <br />
                  <p>Min Qty</p>
                  <input type="text" placeholder="Min Qty" className="border w-1/2 p-1 text-center" />
                  <p>Max Qty</p>
                  <input type="text" placeholder="Max Qty" className="border w-1/2 p-1 text-center" />
                  <p>Opening Qty</p>
                  <input type="text" placeholder="Opening" className="border w-1/2 p-1 text-center" />
                  <input
                    type="text"
                    placeholder="AVG"
                    className="border w-1/2 p-1 mt-2 text-red-600 text-center"
                  />
                </div>
              </div>

              {/* Save Buttons */}
              <div className="col-span-4 cards">
                <div className="card flex gap-2 p-2">
                  <button>Save</button>
                  <button>Clear</button>
                  <button onClick={onClose}>Close</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </form>
      </div>
      {isBrandModalOpen && <BrandFormModal onClose={() => setIsBrandModalOpen(false)} />}
      {isCategoryModalOpen && <CategoryFormModal onClose={() => setIsCategoryModalOpen(false)} />}
      {isPackingSizeModalOpen && <PackingSizeFormModal onClose={() => setIsPackingSizeModalOpen(false)} />}
      {isUOMModalOpen && <UOMFormModal onClose={() => setIsUOMModalOpen(false)} />}
    </div>
  );
}
