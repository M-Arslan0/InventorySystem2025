import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchFormModal from "../../modals/SearchModal";

//icons
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { BsPersonBadgeFill } from "react-icons/bs";
import { PiPasswordFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";

export default function Header() {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [showModel, setShowModel] = useState(false)
  /*   const dispatch = useDispatch();
    const navigate = useNavigate(); */

  const handleLogout = async () => {
    /*   const isLogout = await request("/auth/logout", "POST", {})
      if(!isLogout) return;
      dispatch(logout());
      navigate("/login"); */
  };

  const menuItems = [
    { name: "DASHBOARD", path: "/" },
    { name: "CUSTOMER", path: "/CustomerList" },
    { name: "SALE", path: "/SaleForm" },
    { name: "INVENTORY", path: "/InventoryList" },
    { name: "PURCHASE", path: "/PurchaseForm" },
    { name: "VENDOR", path: "/VendorList" },
    { name: "ACCOUNT", path: "/AccountList" },
  ];

  return (
    <div className="top-menu flex justify-between items-center py-1 bg-gray-100 shadow-md">
      {/* Company */}
      <div className="w-[20%]">
        <h2 className="text-lg font-bold">Company Name Here</h2>
      </div>

      {/* Navigation */}
      <div className="w-[70%] flex gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navlink ${isActive ? "navlinkActive" : ""}`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* Search Button */}
        <button
          className="navlink"
          onClick={() => setSearchModalOpen(true)}
        >
          SEARCH
        </button>
      </div>

      {/* User */}
      <div className="w-[10%] flex justify-end relative group text-sm text-gray-700 pr-8">
        <span onClick={() => setShowModel((prev) => !prev)} className='cursor-pointer'><CgProfile className='text-2xl text-white' /></span>

        {showModel && (
          <div className='absolute z-50 m-3 p-3 right-0 w-60 h-42 bg-white shadow-xl rounded-lg text-black cursor-pointer'>
            <IoMdClose className='absolute right-1 m-1 text-xl text-red-700' onClick={() => setShowModel((prev) => !prev)} />
            <ul className='flex flex-col gap-2 mt-7 text-lg'>

              <li className='flex hover:text-[#006666]'
                onClick={() => {
                  navigate("/MyProfile");
                  setShowModel(false)
                }}><BsPersonBadgeFill className='text-3xl mr-2' /> My Profile </li>

              <li className='flex hover:text-[#006666]'
                onClick={() => {
                  navigate("/changePwd");
                  setShowModel(false)
                }}><PiPasswordFill className='text-3xl mr-2' /> Change Password </li>

              <li className='flex bg-red-100 text-red-700 rounded-md p-2 hover:pl-3 transition-all duration-300'
                onClick={() => { handleLogout(); setShowModel(false) }}><IoLogOut className='text-3xl mr-2' /> Logout </li>
            </ul>
          </div>
        )}
      </div>



      {/* Modal */}
      {isSearchModalOpen && (
        <SearchFormModal onClose={() => setSearchModalOpen(false)} />
      )}
    </div>
  );
}
