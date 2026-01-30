import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  /* ---------------- NO ORDER FOUND ---------------- */
  if (!orderDetails) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">No Order Found</h2>
        <p className="text-gray-500 mt-2">
          The order you’re looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

      {/* Order Summary */}
      <div className="border rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h3 className="font-medium text-gray-900">
              Order ID: {orderDetails._id}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <span
              className={`${
                orderDetails.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } px-3 py-1 text-xs rounded-full`}
            >
              {orderDetails.isPaid ? "Paid" : "Unpaid"}
            </span>
            <span
              className={`${
                orderDetails.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              } px-3 py-1 text-xs rounded-full`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="font-medium mb-2">Payment Info</h4>
            <p className="text-sm text-gray-600">
              Payment Method: {orderDetails.paymentMethod}
            </p>
            <p className="text-sm text-gray-600">
              Status: {orderDetails.isPaid ? "Paid" : "Pending"}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Shipping Info</h4>
            <p className="text-sm text-gray-600">
              Shipping Method: {orderDetails.shippingMethod}
            </p>
            <p className="text-sm text-gray-600">
              Address: {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {orderDetails.orderItems.map((item) => (
              <tr
                key={item.productId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-gray-800"
                  >
                    {item.name}
                  </Link>
                </td>

                <td className="px-4 py-3">${item.price}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3 text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Link */}
      <div className="mt-6">
        <Link
          to="/my-orders"
          className="text-sm text-blue-600 hover:underline hover:cursor-pointer"
        >
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
