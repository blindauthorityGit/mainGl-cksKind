import nodemailer from "nodemailer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { saveToFirestore, uploadFile, moveToPermanentStorage, saveConfirmationToken } from "../../config/firebase";

async function subscribeToNewsletter(email) {
    const token = uuidv4();

    await saveConfirmationToken(email, token);

    const confirmationLink = `${
        process.env.NEXT_DEV === "true" ? process.env.NEXT_DEV_URL : process.env.NEXT_LIVE_URL
    }/confirm?token=${token}`;

    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.strato.de",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,

            pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_MAIL_PW_LIVE,
        },
    });

    const mailOptions = {
        from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
        to: email,
        subject: "Bitte bestätige dein Abonnement",
        html: `
            <p>Hallo,</p>
            <p>Vielen Dank für deine Anmeldung zu unserem Newsletter. Bitte bestätige dein Abonnement, indem du auf den untenstehenden Link klickst:</p>
            <a href="${confirmationLink}">Abonnement bestätigen</a>
            <br>
            <p>Viele Grüße,</p>
            <p><strong>MainGlückskind</strong></p>
        `,
    };

    await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Save to Firestore
            // const { fileUrls } = req.body;

            // if (fileUrls && fileUrls.length > 0) {
            //     const permanentUrls = await moveToPermanentStorage(fileUrls);
            //
            //     // Optionally add permanent URLs to Firestore or send in the email
            // }

            // uploadFiles()
            if (req.body.email) {
                await subscribeToNewsletter(req.body.email);
            }

            // Send emails
            // await transporter.sendMail(userMailOptions);
            // await transporter.sendMail(adminMailOptions);

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

{
    /* <ul>
${req.body.files
    .map(
        (file) => `
    <li>${file.path} - ${(file.size / 1024 / 1024).toFixed(2)} MB</li>
`
    )
    .join("")}
</ul> */
}
