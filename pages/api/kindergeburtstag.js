import nodemailer from "nodemailer";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Save to Firestore
            const reservationRef = await addDoc(
                collection(db, process.env.NEXT_DEV == "true" ? "dev_kindergeburtstag" : "kindergeburtstag"),
                {
                    ...req.body,
                    dateCreated: new Date(), // Add this line
                }
            );

            // Set up Nodemailer
            // Generate cancellation link
            const cancellationLink = `${
                process.env.NEXT_DEV == "true" ? "http://localhost:3000" : "https://www.mainglueckskind.de"
            }/api/cancel-reservation?reservationId=${reservationRef.id}`;

            const transporter = nodemailer.createTransport({
                host: process.env.NEXT_DEV == "true" ? "smtp.world4you.com" : "smtp.strato.de",
                // host: process.env.NEXT_DEV == "true" ? "smtp.strato.de" : "smtp.strato.de",
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
                from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "info@mainglueckskind.de",
                to: req.body.email,
                subject: "Kindergeburtstag Anfrage",
                text: `Liebe/r ${req.body.name}, vielen Dank für Deine Anfrage zu einer Feier am ${new Date(
                    req.body.date
                ).toLocaleDateString("de-DE")} um ${req.body.timeSlot}! Wir freuen uns auf dich! Main Glückskind`,
                html: `Liebe/r ${req.body.name}, </br>vielen Dank für Deine Anfrage zu einer Feier am ${new Date(
                    req.body.date
                ).toLocaleDateString("de-DE")} um ${
                    req.body.timeSlot
                }! </br> Wir freuen uns auf dich! <p>Main Glückskind</p>
             `,
            };

            // Email content for the owners
            const ownerMailOptions = {
                from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "info@mainglueckskind.de",
                to: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "info@mainglueckskind.de",
                // cc: "office@atelierbuchner.at",
                subject: `Kindergeburtstag Anfrage von ${req.body.name} am ${new Date(req.body.date).toLocaleDateString(
                    "de-DE"
                )} um ${req.body.timeSlot}`,
                text: `Kindergeburtstag Anfrage von ${req.body.name}\nDatum: ${new Date(
                    req.body.date
                ).toLocaleDateString("de-DE")}\nZeit: ${req.body.timeSlot}\nEmail: ${req.body.email}\nTelefon: ${
                    req.body.telefon
                }`,
                html: `
                    <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID:</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${reservationRef.id}</td>
                </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${req.body.name}</td>
                        </tr>
              
                    
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Datum:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${new Date(
                                req.body.date
                            ).toLocaleDateString("de-DE")}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Zeit:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
                                req.body.timeSlot
                            }</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Email:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
                                req.body.email
                            }</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Telefon:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
                                req.body.telefon
                            }</td>
                        </tr>
              
                        ${
                            req.body.cleaning ? (
                                <tr>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                                        Reinigung:
                                    </td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                                        ${req.body.cleaning}
                                    </td>
                                </tr>
                            ) : null
                        }
                        ${
                            req.body.deko ? (
                                <tr>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Deko:</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                                        ${req.body.deko}
                                    </td>
                                </tr>
                            ) : null
                        }
                    
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Nachricht:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
                                req.body.message
                            }</td>
                        </tr>
                    </table>
                `,
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
