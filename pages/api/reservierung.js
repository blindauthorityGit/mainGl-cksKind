import nodemailer from "nodemailer";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Save to Firestore
            const reservationRef = await addDoc(
                collection(db, process.env.NEXT_DEV == "true" ? "dev_cafe" : "reservierung_cafe"),
                req.body
            );

            // Base URL + Links
            const baseUrl = process.env.NEXT_DEV == "true" ? "http://localhost:3000" : "https://www.mainglueckskind.de";

            // Optional: Google-Review-Link (per ENV setzen)
            const googleReviewUrl = process.env.NEXT_GOOGLE_REVIEW_URL || baseUrl;

            // Vorname aus dem Namen ziehen (Fallback "Gast")
            const firstName = (req.body.name || "").trim().split(" ")[0] || "Gast";

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
                from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "cafe@mainglueckskind.de",
                to: req.body.email,
                subject: "Deine Buchung bei MAIN GLÜCKSKIND 💛",
                text: `Hallo liebe/r ${firstName},

schön, dass du bald bei uns bist! 🤗

Falls ihr es doch nicht schafft, storniere bitte einfach über den Link in dieser Mail und wenn ihr nur ein bisschen später kommt, kein Stress, wir halten euren Platz frei.

${cancellationLink}

💡 Tipp: Du suchst einen Kurs für dein Kind (0–5 Jahre)?
Sprich uns im Café an oder schau auf unserer Website vorbei, wir haben tolle Angebote für Familien! ${baseUrl}

Nach eurem Besuch freuen wir uns riesig über eine Google-Bewertung. Für jede 10. Bewertung spenden wir 5 € an ein Herzensprojekt. 💖
${googleReviewUrl ? `\nJetzt bewerten: ${googleReviewUrl}\n` : ""}

Bis bald,
dein MAIN GLÜCKSKIND-Team`,
                html: `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#222;">
      <p>Hallo liebe/r ${firstName},</p>

      <p>schön, dass du bald bei uns bist! 🤗</p>

      <p>Falls ihr es doch nicht schafft, storniere bitte einfach über den Link in dieser Mail und wenn ihr nur ein bisschen später kommt, kein Stress, wir halten euren Platz frei.</p>

      <p style="margin:16px 0;">
        <a href="${cancellationLink}" style="display:inline-block;background:#57456a;color:#fff;text-decoration:none;padding:10px 16px;border-radius:9999px;">Reservierung stornieren</a>
      </p>

      <p>💡 <strong>Tipp:</strong> Du suchst einen Kurs für dein Kind (0–5 Jahre)?<br />
      Sprich uns im Café an oder schau auf unserer Website vorbei, wir haben tolle Angebote für Familien!
      ${baseUrl ? ` <a href="${baseUrl}" style="color:#57456a;">Website</a>` : ""}</p>

      <p>Nach eurem Besuch freuen wir uns riesig über eine Google-Bewertung. Für jede 10. Bewertung spenden wir 5 € an ein Herzensprojekt. 💖</p>
      ${
          googleReviewUrl
              ? `<p><a href="${googleReviewUrl}" style="display:inline-block;background:#BF567C;color:#fff;text-decoration:none;padding:10px 16px;border-radius:9999px;">Jetzt bewerten</a></p>`
              : ""
      }

      <p>Bis bald,<br/>dein MAIN GLÜCKSKIND-Team</p>
    </div>
  `,
            };

            // Email content for the owners
            const ownerMailOptions = {
                from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "cafe@mainglueckskind.de",
                to: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "cafe@mainglueckskind.de",
                // cc: "office@atelierbuchner.at",
                subject: `Reservierung von ${req.body.name} am ${new Date(req.body.date).toLocaleDateString(
                    "de-DE"
                )} um ${req.body.timeSlot}`,
                text: `Neue Reservierung von ${req.body.name}\nDatum: ${new Date(req.body.date).toLocaleDateString(
                    "de-DE"
                )}\nZeit: ${req.body.timeSlot}\nEmail: ${req.body.email}\nTelefon: ${req.body.telefon}`,
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
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Erwachsene:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
                                req.body.guests
                            }</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Kinder:</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${req.body.kids}</td>
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
