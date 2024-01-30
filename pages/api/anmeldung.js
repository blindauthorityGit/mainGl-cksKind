const nodemailer = require("nodemailer");

// Function to send an email
const sendEmail = async (to, subject, html, replyTo, ccEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.world4you.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_W4YUSER,
                pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_W4YPASSWORD,
            },
        });

        await transporter.sendMail({
            from: "office@atelierbuchner.at",
            to,
            cc: ccEmail, // Add CC here
            replyTo,
            subject,
            html,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email: ", error);
    }
};

// API endpoint handler
export default async (req, res) => {
    const { name, email, phone, message, date, kurs } = req.body;

    const ccEmail = "office@atelierbuchner.at"; // Replace with the actual CC email address

    // Email content for the user
    const userMailOptions = {
        from: "office@atelierbuchner.at",
        to: email,
        subject: "Anmelde Bestätigung",
        text: `Liebe/r ${name}, vielen Dank für Deine Reservierung in unserem Cafe am ${new Date(
            req.body.date
        ).toLocaleDateString("de-DE")} um ${req.body.timeSlot}! Wir freuen uns auf dich! Main Glückskind`,
        html: `
                <p>Liebe/r ${name},</p>
                <p>vielen Dank für deine Anmeldung zu <strong>${kurs}</strong> am <strong>${date}</strong>.</p>
                <p>Unser Trainer wird sich mit dir in Verbindung setzen und dir weitere DetailInfos mitteilen.</p>
                <p>Wir freuen uns auf dich!</p>
                <p>Main Glückskind</p>
            `,
    };

    // Construct the email subject and body
    const subject = `Buchung von ${name} für ${kurs} am ${date}`;
    const html = `
        <p><strong>Kurs:</strong> ${kurs}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Termin:</strong> ${date}</p>
        <p><strong>Nachricht:</strong><br/> ${message.replace(/\n/g, "<br>")}</p>
    `;

    await sendEmail("johabuch@gmail.com", subject, html, email, ccEmail);
    await sendEmail(email, userMailOptions.subject, userMailOptions.html, "johabuch@gmail.com");

    res.status(200).json({ message: "Anfrage erfolgreich gesendet" });
};
