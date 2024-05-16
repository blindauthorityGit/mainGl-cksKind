import { getFirestore, doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../config/firebase"; // Adjust this import according to your firebase config file path

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { reservationId } = req.query;

        try {
            const reservationRef = doc(
                db,
                process.env.NEXT_DEV == "true" ? "dev_cafe" : "reservierung_cafe",
                reservationId
            );
            await deleteDoc(reservationRef);

            res.redirect(`/cancel-confirmation?reservationId=${reservationId}`);
        } catch (error) {
            console.error("Error canceling reservation:", error);
            res.status(500).json({ error: "Failed to cancel the reservation" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
