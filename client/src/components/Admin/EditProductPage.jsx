import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productSlice";
import axios from "axios";
import { useEffect } from "react";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      setProductData((prevData)=>({
        ...prevData,
        images:[...prevData.images, {url:data.imageUrl, altText:""}]
      }))
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    dispatch(updateProduct({id, productData}))
    navigate("/admin/products")
  };


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error:{error}</p>
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-8">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Count In Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value
                  .split(",")
                  .map((size) => size.trim())
                  .filter(Boolean),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2
               focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="XS, S, M, L"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value
                  .split(",")
                  .map((color) => color.trim())
                  .filter(Boolean),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2
               focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Red, Blue, Black"
          />
        </div>

        {/* SKU & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Category & Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Collection</label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Material & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={productData.material}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Images Preview */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-800 mb-3">
            Product Images
          </label>

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 
                  hover:border-gray-400 transition cursor-pointer"
          >
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:bg-gray-900 file:text-white
                 hover:file:bg-gray-800 cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload one or multiple images (JPG, PNG)
            </p>
          </div>

          {/* Image Preview Grid */}
          {productData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
              {productData.images.map((img, index) => (
                <div
                  key={index}
                  className="relative group border rounded-lg overflow-hidden"
                >
                  <img
                    src={img.url}
                    alt="product"
                    className="w-full h-32 object-cover"
                  />

                  {/* Optional overlay (future delete button) */}
                  {/* <div
                    className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                       group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    <span className="text-white text-xs">Preview</span>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-6 py-2 border rounded-md hover:cursor-pointer hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:cursor-pointer hover:bg-gray-800"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
