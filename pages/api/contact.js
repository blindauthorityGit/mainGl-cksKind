const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html, email) => {
    console.log(process.env.NEXT_DEV);
    try {
        // create a transporter object
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV == "true" ? "smtp.world4you.com" : "smtp.world4you.com",
            port: process.env.NEXT_DEV == "true" ? 587 : 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV == "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_W4YUSER,
                pass: process.env.NEXT_DEV == "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_W4YPASSWORD,
            },
        });

        // send the email
        await transporter.sendMail({
            from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "office@atelierbuchner.at",
            to,
            replyTo: email,
            subject,
            html,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email: ", error);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { firstName, name, email, message } = req.body;

    if (!firstName) {
        // construct the html message
        const html = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nachricht:<br/></strong> ${message.replace(/\n/g, "<br>")}</p>
        `;

        // send the email
        await sendEmail("office@atelierbuchner.at", `Email von ${name}`, html, email);

        // return success response
        res.status(200).json(req.body);
    } else {
        // return error response
        res.status(403).json({ error: "First name is required" });
    }
};
