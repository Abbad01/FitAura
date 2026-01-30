import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    size: {
      type: String,
      default: null,
    },

    color: {
      type: String,
      default: null,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

  },
  {
    _id: false, // important when embedded in another schema
  }
);


const checkoutSchema = new mongoose.Schema(
  {
    /* ================= USER ================= */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ================= ITEMS ================= */
    checkoutItems: {
      type: [checkoutItemSchema],
      required: true,
    },

    /* ================= SHIPPING ================= */
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    /* ================= PAYMENT ================= */
    paymentMethod: {
      type: String,
      required: true, // e.g. PayPal, Stripe, COD
    },

    paymentStatus: {
      type: String,
    //   enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: null, // gateway response, txn id, etc.
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    /* ================= PRICE ================= */
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    /* ================= FINALIZATION ================= */
    isFinalized: {
      type: Boolean,
      default: false,
    },

    finalizedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
)
export default mongoose.model("Checkout", checkoutSchema);
