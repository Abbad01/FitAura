import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    toggleSidebar()
    navigate("/");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-gray-800 text-white"
         : "text-gray-300 hover:bg-gray-800 hover:text-white"
     }`;
  return (
    <div className="w-64 min-h-screen border-r px-4 py-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/admin" className="text-2xl font-semibold text-white">
          Rabbit
        </Link>
        <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/admin/users"
          className={navItemClass}
          onClick={toggleSidebar}
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={navItemClass}
          onClick={toggleSidebar}
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={navItemClass}
          onClick={toggleSidebar}
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/" className={navItemClass} onClick={toggleSidebar}>
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 
                     bg-red-500 hover:bg-red-600 text-white
                     py-2.5 rounded-lg text-sm font-medium transition hover:cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
