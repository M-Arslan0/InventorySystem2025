import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../util/fetchAPI";
import ReactSelect from "react-select";
import {
  FaMagnifyingGlass,
  FaCircleLeft,
  FaCircleRight,
  FaPrint,
} from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import FindInvoiceModal from "../../modals/FindInvoiceModal";
import useGetAllCustomers from "../../hooks/useGetAllCustomer";
import SaleRightSideSummary from "./SaleRightSideSummary";
import useGetAllProductsForSales from "../../hooks/useGetAllProductsForSales";

export default function Sale() {

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      customerId: "",
      date: new Date().toISOString().split("T")[0],
      invNo: "",
    },
  });
  const { productsForSales: products } = useGetAllProductsForSales();
  const { customerData } = useGetAllCustomers();
  const [productRateType, setProductRateType] = useState("Retail");
  const [findInvoiceModalOpen, setFindInvoiceModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productRate, setProductRate] = useState(0);
  const [isQtyInvalid, setIsQtyInvalid] = useState(false);
  const selectedProductId = watch("productId");
  const productQty = watch("productQty") || 0;




  // 🔹 Totals Calculation
  const calculateTotals = () => {
    const totalQty = selectedProduct.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0);
    const totalProducts = selectedProduct.length;
    const invoiceTotal = selectedProduct.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const balanceDue = invoiceTotal - watch("receivedAmount", 0);

    return {
      totalQty,
      totalProducts,
      invoiceTotal,
      balanceDue,
    };
  };

  const { totalProducts, invoiceTotal, balanceDue } = calculateTotals();

  // 🔹 Add Product
  const addProductToInvoice = () => {
    const productId = watch("productId");
    const productQty = parseFloat(watch("productQty")) || 0;
    const productRate = parseFloat(watch("productRate")) || 0;

    if (!productId || productQty <= 0 || productRate <= 0) {
      alert("Please select a product and enter valid quantity and price");
      return;
    }

    const selected = products.find((p) => p._id === productId);
    if (!selected) return;

    const amount = productQty * productRate;

    const newItem = {
      id: Date.now(),
      productId: selected._id,
      productCode: selected.productCode,
      productName: selected.productName,
      qty: productQty,
      availQty: selected.currentQty,
      rate: productRate,
      productSaleAc:selected.productSaleAc,
      productPurchaseAc:selected.productPurchaseAc,
      productInventoryAc:selected.productInventoryAc,
      productCogsAc:selected.productCogsAc,
      amount,
    };

    setSelectedProduct((prev) => [...prev, newItem]);
    setValue("productId", "");
    setValue("productQty", "");
    setValue("productRate", "");
  };

  // 🔹 Remove Product
  const removeItem = (id) => {
    setSelectedProduct((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Submit Invoice
  const onSubmit = async (formData) => {

    const saleInvoiceProducts = selectedProduct.map((item) => ({
      productId: item.productId,
      productQty: item.qty,
      productRate: item.rate,
      productAmount: item.amount,
      //A/c
      productSaleAc: item.productSaleAc,
      productPurchaseAc: item.productPurchaseAc,
      productInventoryAc: item.productInventoryAc,
      productCogsAc: item.productCogsAc,
    }));

    const invoiceData = {
      salesInvNo: formData.salesInvNo,
      salesInvDate: formData.salesInvDate,
      customerId: formData.customerId,
      products: saleInvoiceProducts,
      invoiceAmount: calculateTotals().invoiceTotal,
      receivedAmount: formData.receivedAmount,
      balanceDue: calculateTotals().balanceDue,
    };
    console.log(invoiceData)
    const { data, status } = await request("/sales/createSalesInvoice", "POST", {
      "Content-Type": "application/json",
    }, { ...invoiceData });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  useEffect(() => {
    if (selectedProductId) {
      const selected = products.find(p => p._id === selectedProductId);
      if (!selected) return;

      // Auto-fill rate based on type
      let rate = 0;
      switch (productRateType) {
        case "Retail": rate = selected.productRtRate; break;
        case "Wholesale": rate = selected.productWhRate; break;
        case "SP": rate = selected.productSpRate; break;
        case "Cost": rate = selected.productCost; break;
        default: rate = selected.productRtRate;
      }
      setProductRate(rate);
      setValue("productRate", rate);

      // Quantity validation
      if (productQty > selected.currentQty) {
        setIsQtyInvalid(true);

      } else {
        setIsQtyInvalid(false);
      }
    }
  }, [selectedProductId, productRateType, productQty]);

  return (
    <div className="flex flex-col w-[100%] max-h-[92vh] overflow-hidden">

      <div className="sale-page">
        {/* Page Menu */}
        <div className="bg-gradient-to-r from-[#087e7e] to-[#008080] shadow-lg p-1 text-white">
          {/* Top Row - Invoice Info */}
          <div className="flex items-center justify-between mb-1">
            {/* Left Side - Invoice Number with Navigation */}
            <div className="flex items-center gap-4">
              {/* Navigation Arrows */}


              {/* Invoice Number */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold whitespace-nowrap">INVOICE #</span>
                <input
                  type="text"
                  {...register("salesInvNo")}
                  className="w-28 px-3 py-2 bg-white text-gray-800 border-0 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                <FaCircleLeft className="text-xl" />
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg hover:bg-white/30 transition-colors font-bold"
                onClick={() => setFindInvoiceModalOpen(true)}
              >
                <FaMagnifyingGlass className="text-base" />
                FIND
              </button>
              <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                <FaCircleRight className="text-xl" />
              </button>
            </div>
            {/* Right Side - Date and Actions */}
            <div className="flex items-center gap-3">
              <input
                type="date"
                {...register("salesInvDate")}
                className="px-3 py-2 bg-white text-gray-800 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />

              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white text-[#006666] rounded-lg hover:bg-gray-100 transition-colors font-bold"
                >
                  <FiPrinter className="text-base" />
                  PRINT
                </button>


              </div>
            </div>
          </div>

          {/* Bottom Row - Customer and Settings */}
          <div className="flex items-center gap-4 p-3 bg-white/20 rounded-lg border border-white/30">
            {/* Customer Selection */}
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm font-bold text-white whitespace-nowrap">CUSTOMER</span>
              <div className="flex-1 max-w-md">
                <ReactSelect
                  options={customerData.map((p) => ({
                    label: p.customerName,
                    value: p._id,
                  }))}
                  placeholder="Select Customer..."
                  onChange={(opt) => setValue("customerId", opt?.value)}
                  value={customerData
                    .filter((p) => p._id === watch("customerId"))
                    .map((p) => ({ label: p.customerName, value: p._id }))}
                  isClearable
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base) => ({
                      ...base,
                      borderColor: 'transparent',
                      borderRadius: '0.5rem',
                      minHeight: '40px',
                      fontSize: '0.875rem',
                      backgroundColor: 'white',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: 'transparent'
                      }
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: '#9ca3af',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: '#1f2937',
                      fontWeight: '500'
                    })
                  }}
                />
              </div>
            </div>

            {/* Rate Type Selection */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white whitespace-nowrap">RATE TYPE</span>
              <select
                className="px-3 py-2 bg-white text-gray-800 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 font-medium"
                value={productRateType}
                onChange={(e) => setProductRateType(e.target.value)}
              >
                <option value="Wholesale">WHOLESALE</option>
                <option value="Retail">RETAIL</option>
                <option value="SP">SPECIAL</option>
                <option value="Cost">COST RATE</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      {/* MAIN FORM */}

      <div className="flex gap-1.5 h-[80vh] w-[98%] mx-auto justify-between
      items-start">
        {/* Prodects Section */}
        <div className="card data-entery h-[100%]  w-[75%] p-1 bg-white rounded-lg shadow-lg">

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0 p-1 bg-gray-50">
            {/* PRODUCT ENTRY */}
            <div className="flex items-center gap-2 bg-white shadow-md p-2 rounded-md data-entery-header">
              <ReactSelect
                options={products.map((p) => ({
                  label: `${p.productCode} | ${p.productName} | ${p.productArt} | ${p.productBrand} | ${p.productCat} | ${p.productPacking} | ${p.productUOM} `,
                  value: p._id,
                }))}
                placeholder="Select Product"
                className="w-[80%] text-sm"
                onChange={(opt) => setValue("productId", opt?.value)}
                value={products
                  .filter((p) => p._id === watch("productId"))
                  .map((p) => ({ label: `${p.productCode} | ${p.productName}`, value: p._id }))}
                isClearable
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
              <input
                type="number"
                placeholder="Qty"
                {...register("productQty")}
                className={`border p-1 w-[10%] rounded bg-white ${isQtyInvalid ? 'border-red-500' : ''}`}
              />
              <input type="number"
                placeholder="Rate"
                {...register("productRate")}
                className="border p-1 w-[10%] rounded bg-white"
              />
              <button
                type="button"
                onClick={addProductToInvoice}
                disabled={isQtyInvalid}
                className={`bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ${isQtyInvalid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Add
              </button>
              <div className="flex justify-center bg-white pr-1 rounded-sm">
                <label >Hold</label>
                <input
                  type="checkbox"
                  style={{ width: "20px" }} />
              </div>
            </div>

            {/* TABLE */}
            <div className="flex flex-col justify-between h-[70vh]">
              <div className="bg-white p-1 shadow-md rounded-md overflow-auto h-[100%]">
                <table className="text-xm w-full border-collapse border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border w-[3%]">#</th>
                      <th className="border w-[40%] text-left">Product</th>
                      <th className="border w-[10%] text-center">Sale Qty</th>
                      <th className="border w-[10%] text-center">IN Hand</th>
                      <th className="border w-[10%] text-center">
                        Balance</th>
                      <th className="border w-[10%] text-center">Rate</th>
                      <th className="border w-[10%] text-right">Amount</th>
                      <th className="border w-[10%] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ padding: "0.5rem" }}>
                    {selectedProduct.length > 0 ? (
                      selectedProduct.map((item, i) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border text-center">{i + 1}</td>
                          <td className="border text-left ">{item.productName}</td>
                          <td className="border text-center ">{item.qty}</td>
                          <td className="border text-center ">{item.availQty}</td>
                          <td className="border text-center ">{item.availQty - item.qty}</td>

                          <td className="border text-center ">{formatCurrency(item.rate)}</td>
                          <td className="border text-right ">{formatCurrency(item.amount)}</td>
                          <td className="border text-center ">
                            <button type="button" className="tableButton" onClick={() => removeItem(item.id)}>
                              <FaRegTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-gray-500 p-3">
                          No products added yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* RECEIVED + SUMMARY */}
              <div className="bg-white rounded-md p-4 w-full flex flex-row-reverse gap-2 justify-end items-end">
                <button>Submit</button>
                {/* Received Amount Input */}
                <div className="w-[50%]">
                  <label className="block text-xm font-semibold mb-1">💰 Received Amount</label>
                  <input
                    type="number"
                    {...register("receivedAmount", { required: true })}
                    style={{ width: "100%" }}
                    className=" p-3 border-blue-400 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter received amount..."
                  />
                </div>

                {/* Summary Box */}
                <div className="w-[50%] bg-gray-50 p-3 rounded-md border border-gray-300">
                  <h3 className="font-extrabold text-sm mb-2 text-gray-700">Invoice Summary</h3>
                  <div className="flex justify-between text-xm mb-1">
                    <span>Total Products:</span>
                    <strong>{totalProducts}</strong>
                  </div>
                  <div className="flex justify-between text-xm mb-1">
                    <span>Total Invoice:</span>
                    <strong>Rs {formatCurrency(invoiceTotal)}</strong>
                  </div>
                  <div className="flex justify-between text-xm mb-1">
                    <span>Received:</span>
                    <strong>Rs {formatCurrency(watch('receivedAmount'))}</strong>
                  </div>
                  <div className="flex justify-between text-sm mt-2 border-t pt-2">
                    <span>💼 Balance Due:</span>
                    <strong className="text-red-600">Rs {formatCurrency(balanceDue)}</strong>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>

        {/* Right Sidebar */}
        <SaleRightSideSummary productRateType={productRateType} />
      </div>

      {findInvoiceModalOpen && <FindInvoiceModal />}
    </div>

  );
}
