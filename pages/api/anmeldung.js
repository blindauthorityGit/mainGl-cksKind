import nodemailer from "nodemailer";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path
import axios from "axios";

async function subscribeToNewsletter(email, name, phone) {
    const mailchimpApiKey = process.env.NEXT_MAILCHIMP_API;
    const mailchimpServerPrefix = process.env.NEXT_SERVER_PREFIX;
    const mailchimpListId = process.env.NEXT_LIST_ID;

    console.log(mailchimpApiKey, mailchimpServerPrefix, mailchimpListId);

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
    // Correct way to access the environment variable

    if (req.method === "POST") {
        try {
            if (req.body.newsletter) {
                await subscribeToNewsletter(req.body.email, req.body.name, req.body.phone);
            }
            // Save to Firestore only if NEXT_DEV is not true
            if (process.env.NEXT_DEV !== "true") {
                const docRef = await addDoc(collection(db, "anmeldung_kurse"), req.body);
            } else {
            }

            // Set up Nodemailer
            const transporter = nodemailer.createTransport({
                host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.strato.de",
                port: 587,
                secure: false,
                auth: {
                    user:
                        process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
                    pass:
                        process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_MAIL_PW_LIVE,
                },
            });

            // Define email templates
            const pekipText = `Liebe/t ${req.body.name},
vielen Dank für Dein Interesse an einem PEKiP Kurs.

Ist Dein Baby noch nicht auf der Welt:

Durch diese Anfrage wirst Du automatisch auf der Interessentenliste eingetragen. In der Regel beginnt die Planung für die Kurse ca. 3-4 Wochen vor Beginn.

Wir machen die Altersspanne der neuen Kurse immer auch von der Nachfrage abhängig. Daher können wir jetzt noch nicht sagen, an welchem Tag und zu welcher Uhrzeit, der für Dich passende Kurs stattfinden wird.

Ist Dein Baby schon auf der Welt und älter als 8 Wochen? Alle aktuellen Kurse sind voll belegt. Du kommst mit dieser Anfrage automatisch auf die Warteliste für einen „Nachrückerplatz“ falls sich Kapazitäten ergeben.

Sobald wir in die Planung für weitere Kurse gehen und Dir einen Platz anbieten können, melden wir uns wieder bei Dir.

Bis dahin wünschen wir alles Gute und hoffen ihr könnt diese unglaubliche und aufregende Zeit richtig genießen.

Alles liebe!

Deine PEKiP Gruppenleitungen`;

            const pekipHtml = `
<p>Liebe/t ${req.body.name},</p>
<p>vielen Dank für Dein Interesse an einem PEKiP Kurs.</p>
<p><strong>Ist Dein Baby noch nicht auf der Welt:</strong></p>
<p>Durch diese Anfrage wirst Du automatisch auf der Interessentenliste eingetragen. In der Regel beginnt die Planung für die Kurse ca. 3-4 Wochen vor Beginn.</p>
<p>Wir machen die Altersspanne der neuen Kurse immer auch von der Nachfrage abhängig. Daher können wir jetzt noch nicht sagen, an welchem Tag und zu welcher Uhrzeit, der für Dich passende Kurs stattfinden wird.</p>
<p><strong>Ist Dein Baby schon auf der Welt und älter als 8 Wochen?</strong> </p>
<p>Alle aktuellen Kurse sind voll belegt. Du kommst mit dieser Anfrage automatisch auf die Warteliste für einen „Nachrückerplatz“ falls sich Kapazitäten ergeben.</p>
<p>Sobald wir in die Planung für weitere Kurse gehen und Dir einen Platz anbieten können, melden wir uns wieder bei Dir.</p>
<p>Bis dahin wünschen wir alles Gute und hoffen ihr könnt diese unglaubliche und aufregende Zeit richtig genießen.</p>
<p>Alles liebe!</p>
<p>Deine PEKiP Gruppenleitungen</p>`;

            const nonPekipText = `Liebe/r ${req.body.name},
Vielen Dank für Deine Anmeldung zu „${req.body.kurs}${req.body.date ? `, am „${req.body.date}“` : "“"}.

Die Kursleitung/Anbieterin wird sich mit Dir in Verbindung setzen und Dir weitere Detailinfos mitteilen.

Wir freuen uns auf Dich,

MAIN GLÜCKSKIND`;

            const nonPekipHtml = `
<p>Liebe/r ${req.body.name},</p>
<p>Vielen Dank für Deine Anmeldung zu <strong>${req.body.kurs}</strong>${
                req.body.date ? `, am <strong>${req.body.date}</strong>` : ""
            }.</p>
<p>Die Kursleitung/Anbieterin wird sich mit Dir in Verbindung setzen und Dir weitere Detailinfos mitteilen.</p>
<p>Wir freuen uns auf Dich,</p>
<p>MAIN GLÜCKSKIND</p>`;

            const userMailOptions = {
                from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
                // from: "info@mainglueckskind.de",
                to: req.body.email,
                subject: "Anmelde Bestätigung",
                text: req.body.isPekip ? pekipText : nonPekipText,
                html: req.body.isPekip ? pekipHtml : nonPekipHtml,
            };

            const adminMailOptions = {
                from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
                to:
                    process.env.NEXT_DEV === "true"
                        ? "office@atelierbuchner.at"
                        : req.body.trainerEmail
                        ? req.body.trainerEmail
                        : "info@mainglueckskind.de", // Replace with your admin email
                // cc: "info@mainglueckskind.de", // CC email
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
                    }</p>`,
            };

            // Send emails
            await transporter.sendMail(userMailOptions);
            await transporter.sendMail(adminMailOptions);

            res.status(200).json({ message: "Anmeldung erfolgreich gespeichert und bestätigt" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Fehler bei der Verarbeitung Ihrer Anfrage" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
