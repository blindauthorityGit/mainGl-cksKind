// pages/api/jobs/send-thankyou.js
import nodemailer from "nodemailer";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../config/firebase";

const COLL = process.env.NEXT_DEV === "true" ? "dev_cafe" : "reservierung_cafe";
const MAX_BATCH = 200; // Sicherheitslimit

// Hilfen: robustes Date-Handling (Timestamp, ISO-String, Date)
const toDate = (v) => {
    try {
        if (!v) return null;
        if (v.toDate) return v.toDate(); // Firestore Timestamp
        if (typeof v === "string") return new Date(v);
        if (v instanceof Date) return v;
    } catch (_) {}
    return null;
};

// Schlüssel YYYY-MM-DD in Europe/Vienna
const toKeyVienna = (d) => {
    if (!d) return "";
    const fmt = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Vienna",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return fmt.format(d); // => 2025-09-25
};

const yesterdayViennaKey = () => {
    const nowVienna = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Vienna" }));
    // "Gestern" in Wien
    nowVienna.setDate(nowVienna.getDate() - 1);
    return toKeyVienna(nowVienna);
};

export default async function handler(req, res) {
    try {
        // Optional: Nur Cron zulassen (Vercel sendet diesen Header)
        if (process.env.NODE_ENV === "production" && !req.headers["x-vercel-cron"]) {
            return res.status(403).json({ error: "forbidden" });
        }

        const targetKey = yesterdayViennaKey();

        // Transporter wie bei dir
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV == "true" ? "smtp.world4you.com" : "smtp.strato.de",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV == "true" ? process.env.NEXT_MAIL_CAFE_DEV : process.env.NEXT_MAIL_CAFE_LIVE,
                pass: process.env.NEXT_DEV == "true" ? process.env.NEXT_MAIL_PW_DEV : process.env.NEXT_MAIL_PW_LIVE,
            },
        });

        const snap = await getDocs(collection(db, COLL));
        let sent = 0;

        const baseUrl = process.env.NEXT_DEV == "true" ? "http://localhost:3000" : "https://www.mainglueckskind.de";
        const googleReviewUrl = process.env.NEXT_GOOGLE_REVIEW_URL || "";

        for (const docSnap of snap.docs) {
            if (sent >= MAX_BATCH) break;

            const r = docSnap.data();
            // Skip, wenn schon verschickt oder storniert
            if (r?.thankyouSentAt || r?.cancelled === true) continue;

            const d = toDate(r?.date);
            if (!d) continue;

            // Vergleich auf "Gestern (Wien)" unabhängig vom Uhrzeit-Typ
            if (toKeyVienna(d) !== targetKey) continue;

            const firstName = (r?.name || "").trim().split(" ")[0] || "Gast";
            const subject = "Schön, dass du bei uns warst! Dein nächster Kaffee geht auf uns";
            const dateStr = d.toLocaleDateString("de-DE");
            const timeStr = r?.timeSlot || ""; // rein informativ

            const text = `Hallo liebe/r ${firstName},

wie schön, dass du bei uns im MAIN GLÜCKSKIND warst!
Wir hoffen, du hattest eine entspannte Zeit und hast dich bei uns wohlgefühlt.

Als kleines Dankeschön laden wir dich auf deinen nächsten Kaffee ein. Einfach beim nächsten Besuch Bescheid sagen.

Wir würden uns riesig freuen, wenn du dir einen Moment Zeit nimmst, um uns auf Google zu bewerten. Für jede zehnte Bewertung spenden wir 5 € an ein gemeinnütziges Projekt für Familien.
${googleReviewUrl ? `Jetzt bewerten: ${googleReviewUrl}\n` : ""}

Bis bald,
dein MAIN GLÜCKSKIND-Team`;

            const html = `
<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#222;">
  <p>Hallo liebe/r ${firstName},</p>
  <p>wie schön, dass du bei uns im MAIN GLÜCKSKIND warst!</p>
  <p>Wir hoffen, du hattest eine entspannte Zeit und hast dich bei uns wohlgefühlt.</p>
  <p><strong>Als kleines Dankeschön</strong> laden wir dich auf deinen nächsten Kaffee ein. Einfach beim nächsten Besuch Bescheid sagen.</p>
  <p>Wir würden uns riesig freuen, wenn du dir einen Moment Zeit nimmst, um uns auf Google zu bewerten. Für jede zehnte Bewertung spenden wir 5 € an ein gemeinnütziges Projekt für Familien. 💖</p>
  ${
      googleReviewUrl
          ? `<p><a href="${googleReviewUrl}" style="display:inline-block;background:#BF567C;color:#fff;text-decoration:none;padding:10px 16px;border-radius:9999px;">Jetzt bewerten</a></p>`
          : ""
  }
  <p>Bis bald,<br/>dein MAIN GLÜCKSKIND-Team</p>
  <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
  <p style="font-size:13px;color:#666;">${dateStr}${timeStr ? ` · ${timeStr} Uhr` : ""}</p>
</div>`;

            try {
                await transporter.sendMail({
                    from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "cafe@mainglueckskind.de",
                    to: r?.email,
                    subject,
                    text,
                    html,
                });

                await updateDoc(doc(db, COLL, docSnap.id), { thankyouSentAt: new Date() });
                sent++;
            } catch (err) {
                console.error("Send thankyou failed for", docSnap.id, err);
                // bewusst kein throw – wir schicken die restlichen weiter
            }
        }

        return res.status(200).json({ ok: true, sent, targetKey });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "internal_error" });
    }
}
