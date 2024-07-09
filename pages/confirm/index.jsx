// pages/confirm.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import MainContainer from "../../components/layout/mainContainer";

export default function Confirm() {
    const router = useRouter();
    const { token } = router.query;
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        if (token) {
            confirmSubscription(token);
        }
    }, [token]);

    const confirmSubscription = async (token) => {
        try {
            const response = await axios.get(`/api/confirm?token=${token}`);
            if (response.status === 200) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <MainContainer width="container mx-auto px-8 py-36 md:py-56 lg:py-36 xl:py-64 ">
            <div className="confirmation-page col-span-12 ">
                {status === "loading" && <p>Confirming your subscription...</p>}
                {status === "success" && <p>Vielen Dank für dein Abo!</p>}
                {status === "error" && <p>Failed to confirm subscription. Please try again or contact support.</p>}
            </div>
        </MainContainer>
    );
}
