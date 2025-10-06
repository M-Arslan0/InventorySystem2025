import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

//Hooks
import useGetAllAreas from "../hooks/useGetAllAreas";

export default function AreaModal({ onClose }) {
  const { areaData, isLoading, error, fetchArea } = useGetAllAreas()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


  const onSubmit = async (payload) => {
    try {
      const { data, status } = await request("/misc/createArea", "POST", {
        "Content-Type": "application/json"
      }, { ...payload });
      if (status === 201) {
        fetchArea()
        reset()
      }
    } catch (error) {
      console.error("Error creating area:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "30%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New Area</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex p-5">

            <div className="w-[100%] mt-1 cards">
              <div className="card-t bg-lt-yellow">
                <div className="card-header">
                  <div>
                    <div className="card-title">Area</div>
                  </div>
                  <div className="card-icon-sm bg-green">
                    <i className="fa-solid fa-phone-volume"></i>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w[50%]">
                  <div>
                    <label className="block" htmlFor="areaCode">Area Code</label>
                    <input type="text" id="areaCode" {...register("areaCode")} className="bg-white" />
                  </div>

                  <div>
                    <label className="block" htmlFor="areaName">Area Name</label>
                    <input type="text" id="areaName" {...register("areaName")} className="bg-white" />
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
        <div className="p-2 m-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="td-center py-2 px-3 border">Code</th>
                <th className="td-center py-2 px-3 border">Name</th>
                <th className="td-center py-2 px-3 border">Status</th>
                <th className="td-center py-2 px-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {areaData.length > 0 ? (
                areaData.map((area, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="td-left py-2 px-3">
                      {area.areaCode}
                    </td>
                    <td className="td-left py-2 px-3">
                      {area.areaName}
                    </td>
                    <td className="td-center py-2 px-3">
                      <span
                        className={`px-2 py-1 text-md font-semibold ${area.isActive ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {area.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="td-left py-2 px-3">
                      Edit | Delete
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-3 text-gray-500">
                    No areas found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
