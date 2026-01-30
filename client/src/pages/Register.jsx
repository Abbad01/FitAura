import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/login.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import { useEffect } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (!user) return;

    if (cart?.products?.length > 0 && guestId) {
      dispatch(mergeCart({ guestId, user })).then(() => {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      });
    } else {
      navigate(isCheckoutRedirect ? "/checkout" : "/");
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          {/* Brand */}
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Rabbit</h2>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">
            Create your account ✨
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Join us and start shopping smarter
          </p>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold
                       hover:bg-gray-900 hover:cursor-pointer transition"
          >
            Create Account
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-black font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src={register}
          alt="Create account"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
