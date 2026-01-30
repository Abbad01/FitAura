import { useDispatch, useSelector } from "react-redux";
import MyOrdersPage from "./MyOrdersPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login", { replace: true });
  };

  // 🔥 IMPORTANT: prevent crash
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="grow container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row md:gap-6 gap-6">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              {user.name}
            </h1>

            <p className="text-base text-gray-600 mb-6">{user.email}</p>

            <button
              className="w-full bg-red-500 text-white py-2.5 rounded-md
                         hover:bg-red-600 transition font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white shadow-sm rounded-lg p-6">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
