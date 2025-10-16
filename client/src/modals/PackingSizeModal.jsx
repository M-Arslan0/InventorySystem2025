import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";
import useGetAllPackingSize from "../hooks/useGetAllPackingSize";
import { FaBox, FaRotateRight } from "react-icons/fa6";

export default function PackingSizeFormModal({ onClose }) {
  const { packingSizeData, fetchPackingSizes } = useGetAllPackingSize();
  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (payload) => {
    try {
      const response = await request(
        "/misc/createPackingSize",
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );

      if (response.status === 201) {
        alert("Packing Size added successfully");
        reset();
        fetchPackingSizes();
      } else {
        alert(response.data?.message || "Failed to add packing size");
      }
    } catch (err) {
      console.error("Error adding packing size:", err);
      alert(err?.message || "An error occurred while adding the packing size");
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "40%", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">
            Packing Size
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            {/* Add Packing Size Form */}
            <div className="border rounded p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">ADD PACKING SIZE</div>
                <div className="bg-pink text-white p-2 rounded">
                  <FaBox />
                </div>
              </div>

              <p className="text-sm mb-2">
                <label className="font-semibold">Packing Name</label> and 2–3 letter code
              </p>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Packing Name"
                  className="border p-1 flex-1"
                  {...register("packingSizeName", { required: "Packing Name is required" })}
                />
                <input
                  type="text"
                  placeholder="Code"
                  className="border p-1 text-center"
                  style={{ width: "30%" }}
                  {...register("packingSizeCode", {
                    required: "Code is required",
                    maxLength: { value: 3, message: "Code max 3 chars" },
                  })}
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-[#004d4d] text-white px-3 py-1 rounded">
                  Add
                </button>
                <button type="reset" onClick={() => reset()} className="border px-3 py-1 rounded">
                  Clear
                </button>
                <button type="button" onClick={onClose} className="border px-3 py-1 rounded">
                  Close
                </button>
              </div>
            </div>

            {/* Packing Size Table */}
            <div className="border rounded p-4 shadow-sm min-h-[50vh]">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="search"
                  placeholder="Search Packing Size..."
                  className="border p-1 w-[85%]"
                />
                <button
                  type="button"
                  onClick={fetchPackingSizes}
                  className="bg-[#004d4d] text-white p-2 rounded"
                >
                  <FaRotateRight />
                </button>
              </div>

              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-1">Packing Name</th>
                    <th className="text-center p-1">Packing Code</th>
                    <th className="text-center p-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {packingSizeData.map((data) => (
                    <tr key={data._id}>
                      <td className="p-1">{data.packingSizeName}</td>
                      <td className="text-center p-1">{data.packingSizeCode}</td>
                      <td className="text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            data.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {data.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
