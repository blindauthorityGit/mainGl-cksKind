import nodemailer from "nodemailer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your Firebase config file path

export default async function handler(req, res) {
    console.log("Received Request:", req.body);

    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const collectionName = process.env.NEXT_DEV === "true" ? "dev_pekip" : "anmeldung_kurse";

        // Save data to Firestore
        await addDoc(collection(db, collectionName), {
            parentName: req.body.parentName,
            babyNameBirthdate: req.body.babyNameBirthdate,
            email: req.body.email,
            phone: req.body.phone,
            preferredDays: req.body.preferredDays || "Nicht angegeben", // Optional field
            agreement: req.body.agreement, // Checkbox must be checked
            createdAt: serverTimestamp(),
        });

        // Setup Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.strato.de",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
                pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_MAIL_PW_LIVE,
            },
        });

        // Email Templates
        const pekipText = `Liebe/r ${req.body.parentName},

vielen Dank für Deine Vormerkung für einen PEKiP-Kurs.

Sobald wir in die Planung für weitere Kurse gehen und Dir einen Platz anbieten können, melden wir uns wieder bei Dir.

Bis dahin wünschen wir Dir alles Gute!

Deine PEKiP Gruppenleitungen`;

        const pekipHtml = `
<p>Liebe/r ${req.body.parentName},</p>
<p>vielen Dank für Deine Vormerkung für einen PEKiP-Kurs.</p>
<p>Sobald wir in die Planung für weitere Kurse gehen und Dir einen Platz anbieten können, melden wir uns wieder bei Dir.</p>
<p>Bis dahin wünschen wir Dir alles Gute!</p>
<p>Deine PEKiP Gruppenleitungen</p>`;

        // User Confirmation Email
        const userMailOptions = {
            from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
            to: req.body.email,
            subject: "Bestätigung Deiner PEKiP-Vormerkung",
            text: pekipText,
            html: pekipHtml,
        };

        // Admin Notification Email
        const adminMailOptions = {
            from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
            to: process.env.NEXT_DEV === "true" ? "office@atelierbuchner.at" : "info@mainglueckskind.de",
            cc: process.env.NEXT_DEV === "true" ? "johabuch@gmail.com" : "info@mainglueckskind.de",
            subject: `Neue PEKiP Vormerkung von ${req.body.parentName}`,
            html: `
                <p><strong>Name der Eltern:</strong> ${req.body.parentName}</p>
                <p><strong>Name & Geburtsdatum des Babys:</strong> ${req.body.babyNameBirthdate}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Telefon:</strong> ${req.body.phone}</p>
                <p><strong>Wunsch-Tage und Zeiten:</strong> ${req.body.preferredDays || "Nicht angegeben"}</p>
              `,
        };

        // Send Emails
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        res.status(200).json({ message: "Anmeldung erfolgreich gespeichert und bestätigt" });
    } catch (error) {
        console.error("Error processing PEKiP Anmeldung:", error);
        res.status(500).json({ error: "Fehler bei der Verarbeitung Ihrer Anfrage" });
    }
}
