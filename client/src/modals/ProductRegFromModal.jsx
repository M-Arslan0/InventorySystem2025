import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

//React Select
import ReactSelect from 'react-select';

// Hooks
import useGetAllAccounts from "../hooks/useGetAllAccounts";
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
  const { register, handleSubmit, setValue, watch } = useForm();
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

  const productCode = watch("productCode");
  const brand = watch("productBrand");
  const category = watch("productCategory");
  const productName = watch("productName");
  const artNo = watch("productArtNo");
  const packingSize = watch("packingSize");
  const uom = watch("productUOM");

  useEffect(() => {
    const selectedBrand = brandData.find(b => b._id === brand)?.brandName || "";
    const selectedCategory = categoryData.find(c => c._id === category)?.categoryName || "";
    const selectedPackingSize = packingSizeData.find(p => p._id === packingSize)?.packingSizeName || "";
    const selectedUOM = uomData.find(u => u._id === uom)?.uomName || "";

    const parts = [productCode, productName, selectedBrand, selectedCategory, selectedPackingSize, selectedUOM, artNo]
      .filter(Boolean);

    const fullName = parts.join(" - ");

    // Prevent re-render loop
    if (watch("productFullName") !== fullName) {
      setValue("productFullName", fullName, { shouldDirty: false });
    }
  }, [
    productCode,
    productName,
    brand,
    category,
    artNo,
    packingSize,
    uom,
    brandData,
    categoryData,
    packingSizeData,
    uomData
  ]);



  const onSubmit = async (payload) => {
    try {
      console.log(payload)
      const { data, status } = await request("/product/createProduct", "POST", { "Content-Type": "application/json" }, {
        ...payload
      })

    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "95%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New products</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <label>Product Code</label>
                  <input type="text" placeholder="Product Code" {...register("productCode")} />
                  <label>Bar Code</label>
                  <input type="text" placeholder="Product Bar Code" {...register("productBarCode")} />
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
                  <select className="bg-white" {...register("productType")}>
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
                      <input type="text" placeholder="Product Name" className="bg-white" {...register("productName")} />
                    </div>
                    <div>
                      <label>Art #</label>
                      <input type="text" className="bg-white" placeholder="Product Art" {...register("productArtNo")} />
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
                          setValue("productPackSize", selectedOption?.value);
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

                  <label>Product Full Name</label>
                  <input type="text" className="bg-white" {...register("productFullName")} />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label>Product Sale A/c</label>
                      <ReactSelect
                        options={accountData.map((data) => ({
                          label: `${data.accountName} | ${data.accountNature} | ${data.accountType}`,
                          value: data._id
                        }))}
                        placeholder="Select Packing Size"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          setValue("saleAccount", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />

                    </div>
                    <div>
                      <label>Product Purchase A/c</label>
                      <ReactSelect
                        options={accountData.map((data) => ({
                          label: `${data.accountName} | ${data.accountNature} | ${data.accountType}`,
                          value: data._id
                        }))}
                        placeholder="Select Packing Size"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          setValue("purchaseAccount", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />

                    </div>
                    <div>
                      <label>Product Inventory A/c</label>
                      <ReactSelect
                        options={accountData.map((data) => ({
                          label: `${data.accountName} | ${data.accountNature} | ${data.accountType}`,
                          value: data._id
                        }))}
                        placeholder="Select Packing Size"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          setValue("inventoryAccount", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
                      />

                    </div>
                    <div>
                      <label>Product COGS A/c</label>
                      <ReactSelect
                        options={accountData.map((data) => ({
                          label: `${data.accountName} | ${data.accountNature} | ${data.accountType}`,
                          value: data._id
                        }))}
                        placeholder="Select Packing Size"
                        className="bg-white text-sm"
                        onChange={(selectedOption) => {
                          setValue("cogsAccount", selectedOption?.value);
                        }}
                        isSearchable
                        isClearable
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
                    <input type="text" placeholder="0.00" className="border w-full p-1 text-right" {...register("productCost")} />
                    <label>Special Rate <b>0.0%</b></label>
                    <input type="text" placeholder="0.00" className="border w-full p-1 text-right" {...register("productSpRate")} />
                    <label>Wholesale Rate<b>0.0%</b></label>
                    <input type="text" placeholder="0.00" className="border w-full p-1 text-right" {...register("productWhRate")} />
                    <label>Retail Rate <b>0.0%</b></label>
                    <input type="text" placeholder="0.00" className="border w-full p-1 text-right" {...register("productRtRate")} />
                  </div>
                </div>

                {/* Quantity Section */}
                <div className="col-span-2 cards">
                  <div className="card p-2 border rounded">
                    <div className="card-header flex justify-between items-center">
                      <div className="card-title font-bold">Inventory Level</div>
                      <div className="card-icon-sm bg-orange text-white p-2 rounded">
                        <FaBoxesStacked />
                      </div>
                    </div>
                    <br />
                    <label>Min Qty</label>
                    <input type="text" placeholder="Min Qty" className="border w-1/2 p-1 text-center" {...register("minQty")} />
                    <label>Max Qty</label>
                    <input type="text" placeholder="Max Qty" className="border w-1/2 p-1 text-center" {...register("maxQty")} />
                    <label>Opening Qty</label>
                    <input type="text" placeholder="Opening" className="border w-1/2 p-1 text-center" {...register("openingQty")} />
                    <label>Avg. Qty</label>
                    <input
                      type="text"
                      placeholder="AVG"
                      className="border w-1/2 p-1 text-red-600 text-center"
                      {...register("avgQty")}
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
