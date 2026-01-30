import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const MyOrdersPage = () => {
  // const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {orders, loading, error}=useSelector((state)=> state.orders)
  
  useEffect(()=>{
    dispatch(fetchUserOrders())
  },[dispatch])

  const handleRowClick = (orderId) => {
    //each row represents certain orders
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>
  if(error) return <p>Error:{error}</p>
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 ">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
        My Orders
      </h2>

      <div className="relative shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full text-left text-sm text-gray-600">
          {/* Table Head */}
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="hover:bg-gray-50 transition hover:cursor-pointer"
                >
                  {/* Image */}
                  <td className="py-3 px-4">
                    <img
                      src={order.orderItems[0]?.image}
                      alt="Product"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
                    />
                  </td>

                  {/* Order ID */}
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>

                  {/* Created Date */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>

                  {/* Shipping Address */}
                  <td className="py-3 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>

                  {/* Items Count */}
                  <td className="py-3 px-4">{order.orderItems.length}</td>

                  {/* Price */}
                  <td className="py-3 px-4 font-medium text-gray-900">
                    ${order.totalPrice}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
