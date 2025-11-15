import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../util/fetchAPI";
import ReactSelect from "react-select";
import { FaMagnifyingGlass, FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import useGetAllSuppliers from "../../hooks/useGetAllSuppliers";
import useGetAllProductsForSales from "../../hooks/useGetAllProductsForSales";

export default function Purchase() {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      supplierId: "",
      purchaseInvDate: new Date().toISOString().split("T")[0],
      purchaseInvNo: "",
    },
  });

  const { supplierData } = useGetAllSuppliers();
  const { productsForSales: products } = useGetAllProductsForSales();

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isQtyInvalid, setIsQtyInvalid] = useState(false);

  const productQty = watch("productQty") || 0;
  const selectedProductId = watch("productId");

  const addProductToInvoice = () => {
    const productId = watch("productId");
    const qty = parseFloat(watch("productQty") || 0);
    const rate = parseFloat(watch("productRate") || 0);

    if (!productId || qty <= 0 || rate <= 0) {
      alert("Please select product & valid qty/rate");
      return;
    }

    const product = products.find((p) => p._id === productId);

    const item = {
      id: Date.now(),
      productId: product._id,
      productName: product.productName,
      qty,
      rate,
      amount: qty * rate,
      productPurchaseAc: product.productPurchaseAc,
      productInventoryAc: product.productInventoryAc,
    };

    setSelectedProduct((prev) => [...prev, item]);
    setValue("productId", "");
    setValue("productQty", "");
    setValue("productRate", "");
  };

  const removeItem = (id) => {
    setSelectedProduct((prev) => prev.filter((e) => e.id !== id));
  };

  const calculateTotals = () => {
    const total = selectedProduct.reduce((s, e) => s + e.amount, 0);
    const paid = watch("paidAmount") || 0;

    return {
      total,
      balance: total - paid,
    };
  };

  const { total, balance } = calculateTotals();

  const onSubmit = async (formData) => {
    const purchaseProducts = selectedProduct.map((p) => ({
      productId: p.productId,
      productQty: p.qty,
      productRate: p.rate,
      productAmount: p.amount,
      productPurchaseAc: p.productPurchaseAc,
      productInventoryAc: p.productInventoryAc,
    }));

    const data = {
      purchaseInvNo: formData.purchaseInvNo,
      purchaseInvDate: formData.purchaseInvDate,
      supplierId: formData.supplierId,
      products: purchaseProducts,
      invoiceAmount: total,
      paidAmount: formData.paidAmount,
      balanceDue: balance,
    };
    console.log(data)
    await request("/purchase/createPurchaseInvoice", "POST", {
      "Content-Type": "application/json",
    }, {...data});

    alert("Purchase Invoice Created Successfully");
  };

  return (
    <div className="w-full h-full p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2 bg-teal-700 text-white flex justify-between rounded">
          <div className="flex gap-4 items-center">
            <span>INVOICE #</span>
            <input {...register("purchaseInvNo")} className="bg-white text-black px-3 py-1 rounded" />
          </div>

          <div className="flex gap-3 items-center">
            <input type="date" {...register("purchaseInvDate")} className="px-3 py-1 rounded text-black" />
            <button className="px-3 py-1 bg-white text-teal-700 rounded flex items-center gap-2">
              <FiPrinter /> PRINT
            </button>
          </div>
        </div>

        <div className="bg-teal-500 mt-2 p-3 rounded text-white flex gap-4 items-center">
          <span>SUPPLIER</span>
          <ReactSelect
            options={supplierData.map((s) => ({ value: s._id, label: s.supplierName }))}
            onChange={(opt) => setValue("supplierId", opt?.value)}
            className="w-64"
          />
        </div>

        {/* Product Entry */}
        <div className="mt-3 p-2 bg-white rounded shadow flex gap-3 items-center">
          <ReactSelect
            options={products.map((p) => ({ value: p._id, label: p.productName }))}
            onChange={(opt) => setValue("productId", opt?.value)}
            className="w-[50%]"
          />

          <input type="number" {...register("productQty")} placeholder="Qty" className="border p-1 w-20" />
          <input type="number" {...register("productRate")} placeholder="Rate" className="border p-1 w-20" />

          <button type="button" onClick={addProductToInvoice} className="bg-teal-600 px-3 py-1 text-white rounded">
            Add
          </button>
        </div>

        {/* Product Table */}
        <table className="w-full mt-2 bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedProduct.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.productName}</td>
                <td className="text-center">{p.qty}</td>
                <td className="text-center">{p.rate}</td>
                <td className="text-right">{p.amount}</td>
                <td className="text-center">
                  <button onClick={() => removeItem(p.id)}>
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="mt-4 bg-gray-100 p-3 rounded flex gap-5">
          <div className="w-[50%]">
            <label>Paid Amount</label>
            <input
              type="number"
              {...register("paidAmount")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="w-[50%] bg-white p-3 rounded shadow">
            <div>Total: {total}</div>
            <div>Paid: {watch("paidAmount")}</div>
            <div className="text-red-600">Balance: {balance}</div>
          </div>

          <button className="bg-teal-600 text-white px-5 py-2 rounded h-fit">Submit</button>
        </div>
      </form>
    </div>
  );
}
