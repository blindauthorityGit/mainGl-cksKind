// pages/api/reserve.js
import nodemailer from "nodemailer";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            console.log(req.body);
            // Save to Firestore
            const reservationRef = await addDoc(collection(db, "reservierung_cafe"), req.body);
            console.log("Reservation ID: ", reservationRef.id);

            // Set up Nodemailer

            const transporter = nodemailer.createTransport({
                host: process.env.NEXT_DEV == "true" ? "smtp.world4you.com" : "smtp.strato.de",
                port: 587,
                secure: false,
                auth: {
                    user:
                        process.env.NEXT_DEV == "true"
                            ? process.env.NEXT_MAIL_CAFE_DEV
                            : process.env.NEXT_MAIL_CAFE_LIVE,
                    pass: process.env.NEXT_DEV == "true" ? process.env.NEXT_MAIL_PW_DEV : process.env.NEXT_MAIL_PW_LIVE,
                },
                // socketTimeout: 60000,
            });

            // Email content for the user
            const userMailOptions = {
                from: "office@atelierbuchner.at",
                to: req.body.email,
                subject: "Reservierungs Bestätigung",
                text: "Your reservation details...",
                html: "<b>Your reservation details...</b>",
            };

            // Email content for the owners
            const ownerMailOptions = {
                from: '"office@atelierbuchner.at',
                to: "johabuch@gmail.com",
                subject: "New Reservation",
                text: `New reservation made by ${req.body.name}`,
                html: `<b>New reservation made by ${req.body.name}</b>`,
            };

            // Send emails
            await transporter.sendMail(userMailOptions);
            await transporter.sendMail(ownerMailOptions);

            res.status(200).json({ message: "Reservation and emails sent successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Error processing your request" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
