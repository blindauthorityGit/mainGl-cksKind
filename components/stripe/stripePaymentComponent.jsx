// // components/StripePaymentComponent.js
// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// const StripePaymentComponent = () => {
//     const [clientSecret, setClientSecret] = useState("");

//     useEffect(() => {
//         // Fetch the client secret from your API endpoint
//         fetch("/api/checkout_sessions", { method: "POST" })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Client Secret Received:", data.clientSecret);
//                 setClientSecret(data.clientSecret);
//             });
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // Add your payment submission logic here
//     };

//     return (
//         <div>
//             {clientSecret && (
//                 <Elements stripe={stripePromise} options={{ clientSecret }}>
//                     <form onSubmit={handleSubmit}>
//                         <CardElement />
//                         <button type="submit">Pay</button>
//                     </form>
//                 </Elements>
//             )}
//         </div>
//     );
// };

// export default StripePaymentComponent;

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripePaymentComponent({ title, price, description }) {
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState(""); // State to hold any error message

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, price: price, description: description }), // $50.00
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.clientSecret) {
                    console.log("Client Secret Received:", data.clientSecret);
                    setClientSecret(data.clientSecret);
                } else {
                    throw new Error("No client secret received");
                }
            })
            .catch((err) => {
                console.error("Error fetching client secret:", err);
                setError("Failed to initiate payment process. Please try again.");
            });
    }, []);

    return (
        <div id="checkout">
            {clientSecret ? (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            ) : error ? (
                <div>Error: {error}</div> // Display error message
            ) : (
                "Loading..."
            )}
        </div>
    );
}
