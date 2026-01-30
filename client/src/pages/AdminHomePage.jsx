import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Admin Dashboard
      </h1>

      {productsLoading || ordersLoading ? (
        <p>Loading...</p>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching orders: {ordersError}</p>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Revenue */}
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Revenue
              </h2>
              <p className="text-3xl font-semibold text-gray-900">
                ${totalSales.toFixed(2)}
              </p>
            </div>

            {/* Orders */}
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Total Orders
              </h2>
              <p className="text-3xl font-semibold text-gray-900">
                {totalOrders}
              </p>
              <Link
                to="/admin/orders"
                className="inline-block mt-3 text-sm text-blue-600 hover:underline"
              >
                Manage Orders →
              </Link>
            </div>

            {/* Products */}
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Total Products
              </h2>
              <p className="text-3xl font-semibold text-gray-900">
                {products.length}
              </p>
              <Link
                to="/admin/products"
                className="inline-block mt-3 text-sm text-blue-600 hover:underline"
              >
                Manage Products →
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Recent Orders */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Orders
        </h2>

        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Total Price</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        #{order._id}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {order.user?.name || "Guest"}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-6 text-center text-gray-500"
                    >
                      No recent orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
