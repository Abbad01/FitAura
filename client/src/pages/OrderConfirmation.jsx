import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { useEffect } from "react";



const OrderConfirmation = () => {
 const dispatch = useDispatch();
const navigate = useNavigate();
const { checkout } = useSelector((state) => state.checkout);

// Clear the cart when the order is confirmed
useEffect(() => {
    if (checkout && checkout._id) {
        dispatch(clearCart());
        localStorage.removeItem("cart");
    } else {
        navigate("/my-orders");
    }
}, [checkout, dispatch, navigate]);







  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); //add 10 days to the order date
    return orderDate.toLocaleString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Thank You for Your Order!
      </h1>

      {checkout && (
        <div className="rounded-xl border border-gray-200 shadow-sm p-6 space-y-10">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order ID: <span className="font-medium">{checkout._id}</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            <p className="text-sm text-emerald-700 font-medium">
              Estimated Delivery:{" "}
              {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>

          {/* Ordered Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ordered Items
            </h3>

            <div className="space-y-4">
              {checkout.checkoutItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h4 className="text-md font-medium text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.color} | {item.size}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-md font-medium text-gray-900">
                      ${item.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Payment
              </h4>
              <p className="text-sm text-gray-600">PayPal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Delivery Address
              </h4>
              <p className="text-sm text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-sm text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
