const nodemailer = require("nodemailer");
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path

export default async function handler(req, res) {
    console.log(
        process.env.NEXT_MAIL_CAFE_LIVE,
        process.env.NEXT_MAIL_KONTAKT_LIVE,
        process.env.NEXT_MAIL_GEBURTSTAG_LIVE
    );
    console.log(req.body);
    try {
        // Save to Firestore
        if (req.body.kindergeburtstag) {
            const docRef = await addDoc(collection(db, "kindergeburtstag"), req.body);
            console.log("Document ID: ", docRef.id);
        }

        let emailTo = ""; // Default subject line
        let subjectLine = "Email von " + req.body.name; // Default subject line
        if (req.body.cafe) {
            emailTo = process.env.NEXT_MAIL_CAFE_LIVE;
            subjectLine = "Anfrage Vermietung Cafe von " + req.body.name;
            console.log(emailTo);
        } else if (req.body.raum) {
            emailTo = process.env.NEXT_MAIL_KONTAKT_LIVE;
            subjectLine = "Anfrage Raumvermietung von " + req.body.name;
            console.log(emailTo);
        } else if (req.body.kindergeburtstag) {
            emailTo = process.env.NEXT_MAIL_GEBURTSTAG_LIVE;
            subjectLine = "Anfrage Kindergeburtstag von " + req.body.name;
            console.log(emailTo);
        } else {
            emailTo = process.env.NEXT_MAIL_KONTAKT_LIVE;
            subjectLine = "Email von " + req.body.name;
            console.log(emailTo);
        }

        console.log(emailTo);
        // Set up Nodemailer
        // Set up Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.strato.de",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : emailTo,
                pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_MAIL_PW_LIVE,
            },
        });

        // let subjectLine = "Email von " + req.body.name; // Default subject line

        // Determine the subject line based on the props

        const userMailOptions = {
            from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : emailTo,
            to: req.body.email,
            subject: "Anfrage Bestätigung",
            text: `Liebe/r ${req.body.name}, vielen Dank für Deine Anfrage in unserem Cafe am ${new Date(
                req.body.date
            ).toLocaleDateString("de-DE")} um ${req.body.timeSlot}! Wir freuen uns auf dich! Main Glückskind`,
            html: `
                <p>Liebe/r ${req.body.name},</p>
                <p>vielen Dank für deine Anmeldung zu <strong>${req.body.kurs}</strong> am <strong>${req.body.date}</strong>.</p>
                <p>Unser Trainer wird sich mit dir in Verbindung setzen und dir weitere DetailInfos mitteilen.</p>
                <p>Wir freuen uns auf dich!</p>
                <p>Main Glückskind</p>
            `,
        };

        const adminMailOptions = {
            from: process.env.NEXT_DEV === "true" ? "office@atelierbuchner.at" : emailTo,
            to: process.env.NEXT_DEV === "true" ? "office@atelierbuchner.at" : emailTo,
            cc: "office@atelierbuchner.at", // CC email
            subject: subjectLine,
            // text: `...`, // Your Text email content for admin
            html: `
                        <p><strong>Name:</strong> ${req.body.name}</p>
                        <p><strong>Email:</strong> ${req.body.email}</p>
                        ${req.body.timeSlot ? `<p><strong>Zeitraum:</strong> ${req.body.timeSlot}</p>` : ""}
                        ${
                            req.body.date
                                ? `<p><strong>Datum:</strong> ${new Date(req.body.date).toLocaleDateString(
                                      "de-DE"
                                  )}</p>`
                                : ""
                        }
                        ${req.body.dekoration ? `<p><strong>Dekoration:</strong> ${req.body.dekoration}</p>` : ""}
                        ${
                            req.body.reinigung ? `<p><strong>Reinigung:</strong> ${req.body.reinigung}</p>` : ""
                        }                
                        <p><strong>Nachricht:</strong><br/> ${req.body.message.replace(/\n/g, "<br>")}</p>
                    `,
        };

        // Send emails
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        res.status(200).json({ message: "Anmeldung erfolgreich gespeichert und bestätigt" });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email: ", error);
    }
}
