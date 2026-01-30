import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "../Cards/ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  // Fetch product & similar products
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // Set default main image when product loads
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color", { duration: 1000 });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      // .unwrap()
      .then(() => {
        toast.success("Product added to the cart", { duration: 1000 });
      })
      .catch(() => {
        toast.error("Failed to add product", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading && !productId) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!selectedProduct) return null;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails (Desktop) */}
            <div className="hidden md:flex flex-col space-y-4 mr-5">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-2" : ""
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              {mainImage && (
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg mb-4"
                />
              )}
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                    mainImage === image.url ? "border-2" : ""
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>

              {selectedProduct.originalPrice && (
                <p className="text-lg text-gray-500 mb-1 line-through">
                  ${selectedProduct.originalPrice}
                </p>
              )}

              <p className="text-xl text-gray-900 mb-2">
                ${selectedProduct.price}
              </p>

              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              {/* Colors */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2 font-medium">Color</p>
                <div className="flex gap-2">
                  {selectedProduct.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? "border-2" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2 font-medium">Size</p>
                <div className="flex gap-2">
                  {selectedProduct.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2 font-medium">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                  >
                    −
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-3 px-6 rounded w-full mb-8 transition ${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>

              {/* Product Details */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-2">Brand</td>
                      <td className="py-2">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Material</td>
                      <td className="py-2">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div>
            <h2 className="text-2xl text-center font-medium mb-4 pt-10">
              You may Also Like
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
