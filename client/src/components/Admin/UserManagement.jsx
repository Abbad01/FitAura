import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  updateUser,
  fetchUsers,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  // Protect admin route
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch users on page load
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addUser(formData)).then(() => {
      dispatch(fetchUsers());
    });

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole })).then(() => {
      dispatch(fetchUsers());
    });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are u sure, u want to delete this user?")) {
      dispatch(deleteUser(userId)).then(() => {
        dispatch(fetchUsers());
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        User Management
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Add New User Form */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Add New User
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-sm
                focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-sm
                focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-sm
                focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white
                focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white text-sm
              rounded-md hover:bg-gray-800 hover:cursor-pointer"
          >
            Create User
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{u.email}</td>

                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="px-3 py-1.5 border rounded-md text-sm bg-white
                        focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="px-4 py-1.5 text-sm font-medium rounded-md
                        bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
