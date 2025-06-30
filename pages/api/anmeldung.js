import nodemailer from "nodemailer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path
import axios from "axios";

async function subscribeToNewsletter(email, name, phone) {
    const mailchimpApiKey = process.env.NEXT_MAILCHIMP_API;
    const mailchimpServerPrefix = process.env.NEXT_SERVER_PREFIX;
    const mailchimpListId = process.env.NEXT_LIST_ID;

    if (!mailchimpApiKey || !mailchimpServerPrefix || !mailchimpListId) {
        throw new Error("Mailchimp environment variables are not defined.");
    }
    const data = {
        email_address: email,
        status: "subscribed",
        // Uncomment and complete merge_fields if you want to use them
        merge_fields: {
            FNAME: name.split(" ")[0],
            LNAME: name.split(" ")[1],
            PHONE: phone,
        },
    };

    try {
        const response = await axios.post(
            `https://${process.env.NEXT_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.NEXT_LIST_ID}/members/`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_MAILCHIMP_API}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const errorData = error.response.data;
            // Mailchimp error code for already existing subscriber is 'Member Exists'
            if (errorData.title === "Member Exists") {
                return { status: "already_subscribed", detail: errorData.detail };
            } else {
                console.error("Mailchimp Error:", errorData.detail);
                throw new Error("Failed to subscribe to newsletter: " + errorData.detail);
            }
        } else {
            throw new Error("Failed to connect to Mailchimp.");
        }
    }
}

export default async function handler(req, res) {
    console.log("confirmationText:", req.body.events.confirmationText);

    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // 1) Newsletter (Mailchimp)
        if (req.body.newsletter) {
            await subscribeToNewsletter(req.body.email, req.body.name, req.body.phone);
        }

        // 2) In Firestore speichern
        const collectionName = process.env.NEXT_DEV === "true" ? "dev_anmeldungen" : "anmeldung_kurse";
        await addDoc(collection(db, collectionName), { ...req.body, createdAt: serverTimestamp() });

        // 3) Nodemailer-Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.strato.de",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
                pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_MAIL_PW_LIVE,
            },
        });

        // 4) PEKiP-Templates (unverändert)
        const pekipText = `Liebe/t ${req.body.name},
vielen Dank für Dein Interesse an einem PEKiP Kurs.

…`;
        const pekipHtml = `
<p>Liebe/t ${req.body.name},</p>
<p>vielen Dank für Dein Interesse an einem PEKiP Kurs.</p>
…`;

        // 5) non-PEKiP Default-Templates
        const defaultNonPekipText = `Liebe/r ${req.body.name},
Vielen Dank für Deine Anmeldung zu „${req.body.kurs}${req.body.date ? `, am „${req.body.date}“` : "“"}.

Die Kursleitung/Anbieterin wird sich mit Dir in Verbindung setzen und Dir weitere Detailinfos mitteilen.

Wir freuen uns auf Dich,

MAIN GLÜCKSKIND`;

        const defaultNonPekipHtml = `
<p>Liebe/r ${req.body.name},</p>
<p>Vielen Dank für Deine Anmeldung zu <strong>${req.body.kurs}</strong>${
            req.body.date ? `, am <strong>${req.body.date}</strong>` : ""
        }.</p>
<p>Die Kursleitung/Anbieterin wird sich mit Dir in Verbindung setzen und Dir weitere Detailinfos mitteilen.</p>
<p>Wir freuen uns auf Dich,</p>
<p>MAIN GLÜCKSKIND</p>`;

        // 6) Fallback auf confirmationText
        // Plain-Text
        const userText = req.body.confirmationText?.trim() ? req.body.confirmationText : defaultNonPekipText;

        // Konvertiere Zeilenumbrüche in <p>…</p> für HTML
        const userHtml = req.body.events.confirmationText?.trim()
            ? `<p>${req.body.events.confirmationText.split(/\r?\n/).filter(Boolean).join("</p><p>")}</p>`
            : defaultNonPekipHtml;

        // 7) Mail-Optionen für den User
        const userMailOptions = {
            from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
            to: req.body.email,
            subject: "Anmelde Bestätigung",
            text: req.body.isPekip ? pekipText : userText,
            html: req.body.isPekip ? pekipHtml : userHtml,
        };

        // 8) CC-Logik
        const ccEmail = process.env.NEXT_DEV === "true" ? "johabuch@gmail.com" : "info@mainglueckskind.de";

        // 9) Admin-Mail
        const adminMailOptions = {
            from: userMailOptions.from,
            to:
                process.env.NEXT_DEV === "true"
                    ? "office@atelierbuchner.at"
                    : req.body.trainerEmail || "info@mainglueckskind.de",
            cc: ccEmail,
            subject: `Buchung von ${req.body.name} für ${req.body.kurs} am ${req.body.date}`,
            html: `
        ${req.body.produkt ? `<p><strong>Produkt:</strong> ${req.body.produkt}</p>` : ""}
        <p><strong>Kurs:</strong> ${req.body.kurs}</p>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Telefon:</strong> ${req.body.phone}</p>
        ${req.body.birthDate ? `<p><strong>Geburtsdatum:</strong> ${req.body.birthDate}</p>` : ""}
        ${req.body.siblings ? `<p><strong>Geschwister:</strong> ${req.body.siblings}</p>` : ""}
        ${req.body.twins ? `<p><strong>Zwillinge:</strong> ${req.body.twins}</p>` : ""}
        <p><strong>Termin:</strong> ${req.body.date}</p>
        <p><strong>Nachricht:</strong><br/> ${
            req.body.message ? req.body.message.replace(/\n/g, "<br>") : "keine Nachricht angegeben"
        }</p>
      `,
        };

        // 10) Mails senden
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        return res.status(200).json({ message: "Anmeldung erfolgreich gespeichert und bestätigt" });
    } catch (error) {
        console.error("Error in handler:", error);
        return res.status(500).json({ error: "Fehler bei der Verarbeitung Ihrer Anfrage" });
    }
}
