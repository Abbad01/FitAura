import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status })).then(() => {
      dispatch(fetchAllOrders());
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm text-gray-600">
          {/* Table Head */}
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  {/* Order ID */}
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4">{order.user?.name || "Guest"}</td>

                  {/* Total Price */}
                  <td className="py-4 px-4 font-semibold">
                    ${order.totalPrice}
                  </td>

                  {/* Status Select */}
                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                             text-sm rounded-lg px-3 py-2
                             focus:ring-2 focus:ring-blue-500 
                             focus:border-blue-500"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md
                             text-sm font-medium hover:bg-green-600 transition"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
