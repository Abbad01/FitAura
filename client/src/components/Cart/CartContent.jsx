import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      })
    );
  };

  return (
    <div className="divide-y">
      {cart.products.map((product) => (
        <div
          key={`${product.productId}-${product.size}-${product.color}`}
          className="flex items-start gap-4 py-4"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-24 object-cover rounded-md border"
          />

          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Size: {product.size} · Color: {product.color}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="px-2 py-1"
                >
                  −
                </button>

                <span className="px-3 text-sm">{product.quantity}</span>

                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="px-2 py-1"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium">${product.price}</span>

                <button
                  onClick={() =>
                    handleRemoveFromCart(
                      product.productId,
                      product.size,
                      product.color
                    )
                  }
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
