import { FiX } from "react-icons/fi";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cartdrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg 
      transform transition-transform duration-300 ease-in-out
      flex flex-col z-50
      w-full sm:w-3/4 md:w-1/2 lg:w-md
      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Your Cart</h2>
        <button onClick={toggleCartDrawer}>
          <FiX className="h-5 w-5 text-gray-600 hover:text-gray-800 transition" />
        </button>
      </div>

      {/* Cart Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is Empty.</p>
        )}
      </div>

      {/* Checkout Footer */}
      <div className="border-t p-4">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full  text-white py-3 rounded-lg
                     bg-black hover:bg-gray-300  transition
                     font-medium text-sm"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cartdrawer;
