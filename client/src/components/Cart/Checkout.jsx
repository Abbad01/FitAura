import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { useEffect } from "react";
import axios from "axios"

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  //Ensure cart is not loaded before proceeding

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // set checkout Id if checkout was successful
      }
    }
    
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      
        await handleFinalizeCheckout(checkoutId);
      
    } catch (error) {
      console.error(error);
    }
   
  };


  const handleFinalizeCheckout = async (checkoutId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    navigate("/order-confirmation");
  } catch (error) {
    console.error("Checkout finalization failed:", error);
  }
};


  if (loading) return <p>Loading Cart...</p>
  if (error) return <p>Errror:{error}</p>
  if (!cart || !cart.products || cart.products.length===0){
    return <p> Your cart is empty.</p>
  } 
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form - Takes 2/3 on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 uppercase tracking-wide">
              Shipping Details
            </h2>

            <form onSubmit={handleCreateCheckout}>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Contact Information
              </h3>

              {/* Row 1: Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              {/* Row 3: City & Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Country & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                {!checkoutId ? (
                  <button
                    type="submit"
                    className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-gray-800 transition hover:cursor-pointer duration-300"
                  >
                    Continue to Payment
                  </button>
                ) : (
                  <div>
                    <h3 className="text-lg mb-4">
                      {" "}
                      <PaypalButton
                        amount={cart.totalPrice}
                        onSuccess={handlePaymentSuccess}
                        onError={(err) => alert("Payment Failed. Try again")}
                      />
                    </h3>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary - Takes 1/3 on large screens */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
            {/* Title */}
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            {/* Product List */}
            <div className="border-t pt-4 mb-4 space-y-4">
              {cart?.products?.map((product, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between py-2 border-b last:border-b-0"
                >
                  {/* Left: Image + Details */}
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded"
                    />

                    <div>
                      <h3 className="text-md font-medium">{product.name}</h3>
                      <p className="text-gray-500 text-sm">
                        Size: {product.size}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Color: {product.color}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <p className="text-md font-semibold">
                    ${product.price?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${cart?.totalPrice?.toLocaleString()}</p>
              </div>

              <div className="flex justify-between text-gray-600">
                <p>Shipping</p>
                <p className="text-green-600 font-medium">Free</p>
              </div>

              <div className="flex justify-between font-semibold border-t pt-4 mt-4">
                <p>Total</p>
                <p>${cart?.totalPrice?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
