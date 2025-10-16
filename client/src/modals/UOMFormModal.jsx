import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";
import useGetAllUOM from "../hooks/useGetAllUOM";
import { FaRuler, FaRotateRight } from "react-icons/fa6";

export default function UOMFormModal({ onClose }) {
  const { uomData, isLoading, isError, fetchUOMs } = useGetAllUOM();
  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (payload) => {
    try {
      const response = await request(
        "/misc/createUOM",
        "POST",
        { "Content-Type": "application/json" },
        { ...payload }
      );

      if (response.status === 201) {
        alert("UOM added successfully");
        reset();
        fetchUOMs();
      } else {
        alert(response.data?.message || "Failed to add UOM");
      }
    } catch (err) {
      console.error("Error adding UOM:", err);
      alert(err?.message || "An error occurred while adding the UOM");
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "40%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Product UOM (Unit of Measurement)</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="cards space-y-4">
              <div className="card p-4 border rounded shadow-sm">
                <div className="card-header flex justify-between items-center mb-2">
                  <div className="card-title font-bold">ADD UOM (Unit of Measurement)</div>
                  <div className="card-icon-sm bg-pink text-white p-2 rounded">
                    <FaRuler />
                  </div>
                </div>

                <p className="text-sm mb-2">
                  <label className="font-semibold">UOM Name</label> and 2–3 letter UOM code
                </p>

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="UOM Name"
                    className=" p-1 flex-1"
                    {...register("uomName", { required: "UOM Name is required" })}
                  />
                  <input
                    type="text"
                    placeholder="UOM Code"
                    className="p-1 text-center"
                    style={{ width: "30%" }}
                    {...register("uomCode", {
                      required: "UOM Code is required",
                      maxLength: { value: 3, message: "Code max 3 chars" },
                    })}
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit">
                    Add
                  </button>
                  <button type="reset">
                    Clear
                  </button>
                  <button type="button" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>

              {/* UOM Table */}
              <div className="card p-4 border rounded shadow-sm min-h-[50vh]">
                {/* Search + Refresh */}
                <div className="flex w-full
								 justify-center gap-2 items-center mb-2">
                  <div className="flex w-[90%] items-center">
                    <input
                      type="search"
                      placeholder="Search UOM..."
                      className=" p-1"
                      style={{ width: "100%" }}
                    />
                    <button type="button" style={{ width: "10%", padding: "9px" }} className="flex justify-center bg-[#004d4d]"
                      onClick={fetchUOMs}>
                      <FaRotateRight className="text-white" />
                    </button>
                  </div>
                </div>

                <table className="w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-1">UOM Name</th>
                      <th className="text-center p-1">UOM Code</th>
                      <th className="text-center p-1">Status</th>
                      <th className="text-center p-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uomData.map((data) => (
                      <tr key={data._id}>
                        <td className="p-1">{data.uomName}</td>
                        <td className="text-center p-1">{data.uomCode}</td>
                        <td className="text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${data.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                              }`}
                          >
                            {data.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="flex gap-2 text-center p-1">
                          <span className="cursor-pointer text-blue-500">Edit</span>
                          |
                          <span className="cursor-pointer text-blue-500">Delete</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
