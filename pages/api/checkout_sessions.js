// pages/api/checkout_sessions.js
// pages/api/checkout_sessions.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { title, price, description } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                ui_mode: "embedded",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: title,
                                description: description,
                            },
                            unit_amount: price * 100,
                        },
                        quantity: 1,
                    },
                ],

                mode: "payment",
                return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,

                // success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                // cancel_url: `${req.headers.origin}/cancel`,
            });

            // Log the entire session object to see all its properties

            if (session.client_secret) {
                res.send({ clientSecret: session.client_secret });
            } else {
                throw new Error("Client secret not found in Stripe session");
            }
        } catch (err) {
            console.error("Error creating Stripe session:", err);
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

// const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//         {
//             price_data: {
//                 currency: "eur",
//                 product_data: {
//                     name: title,
//                 },
//                 unit_amount: price * 100,
//             },
//             quantity: 1,
//         },
//     ],
//     mode: "payment",
//     // return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
//     success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${req.headers.origin}/cancel`,
// });
