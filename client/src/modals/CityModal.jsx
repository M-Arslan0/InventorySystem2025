import { useForm } from "react-hook-form";
import { request } from "../util/fetchAPI";

//Hooks
import useGetAllCities from "../hooks/useGetAllCities";

export default function CityModal({ onClose }) {
  const { cityData, isLoading, error, fetchCities } = useGetAllCities();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payload) => {
    try {
      const { data, status } = await request(
        "/misc/createCity",
        "POST",
        {
          "Content-Type": "application/json",
        },
        { ...payload }
      );
      if (status === 201) {
        fetchCities(); // refresh list
        reset();
      }
    } catch (error) {
      console.error("Error creating city:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content bg-white border-2 border-[#006666]"
        style={{ maxWidth: "30%", backgroundColor: "white", margin: "0", padding: "0" }}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-center bg-[#006666] rounded-tl-[6px] rounded-tr-[6px] px-4 py-2 text-white">
          <span className="text-sm text-white uppercase font-bold">Add New City</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex p-5">
            <div className="w-[100%] mt-1 cards">
              <div className="card-t bg-lt-yellow">
                <div className="card-header">
                  <div>
                    <div className="card-title">City Details</div>
                  </div>
                  <div className="card-icon-sm bg-green">
                    <i className="fa-solid fa-city"></i>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w[50%]">
                  <div>
                    <label className="block" htmlFor="cityCode">
                      City Code
                    </label>
                    <input
                      type="text"
                      id="cityCode"
                      {...register("cityCode", { required: true })}
                      className="bg-white"
                    />
                    {errors.cityCode && (
                      <p className="text-red-500 text-xs">City code is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block" htmlFor="cityName">
                      City Name
                    </label>
                    <input
                      type="text"
                      id="cityName"
                      {...register("cityName", { required: true })}
                      className="bg-white"
                    />
                    {errors.cityName && (
                      <p className="text-red-500 text-xs">City name is required</p>
                    )}
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

        {/* City List */}
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
              {cityData?.length > 0 ? (
                cityData.map((city, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="td-left py-2 px-3">{city.cityCode}</td>
                    <td className="td-left py-2 px-3">{city.cityName}</td>
                    <td className="td-center py-2 px-3">
                      <span
                        className={`px-2 py-1 text-md font-semibold ${
                          city.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {city.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="td-left py-2 px-3 text-blue-600 cursor-pointer">
                      Edit | Delete
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3 text-gray-500">
                    No cities found
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
