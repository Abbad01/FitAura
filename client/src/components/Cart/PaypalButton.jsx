import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onSuccess, onError }) => {
  const paypalAmount = Number(amount).toFixed(2);
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          console.log("PAYPAL AMOUNT 👉", paypalAmount);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: paypalAmount,
                  currency_code: "USD", //  CHANGE TO INR
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          onSuccess(details);
        }}
        onCancel={(data) => {
          console.log("PAYPAL CANCELLED", data);
        }}
        onError={(err) => {
          console.error("PAYPAL ERROR", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
