import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are u sure u ant to delete the product?")) {
      dispatch(deleteProduct(productId)).then(() => {
        dispatch(fetchAdminProducts());
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-600">
          {/* Table Head */}
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Product Name */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">${product.price}</td>

                  {/* SKU */}
                  <td className="px-6 py-4">{product.sku}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right space-x-2">
                    {/* Edit */}
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="inline-block px-3 py-1.5 text-sm rounded-md
                                 bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-block px-3 py-1.5 text-sm rounded-md
                                 bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
