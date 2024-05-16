import { useRouter } from "next/router";
import MainContainer from "../components/layout/mainContainer";
//TYPO
import { H2, P } from "../components/typography";

const CancelConfirmation = () => {
    const router = useRouter();
    const { reservationId } = router.query;

    return (
        <MainContainer width="container mx-auto px-4 lg:px-0  mt-24 mb-16 lg:mt-48 lg:mb-36">
            <H2 klasse="col-span-12">Reservierung storniert</H2>
            <P klasse="col-span-12">Deine Reservierung mit der ID {reservationId} wurde erfolgreich storniert.</P>
        </MainContainer>
    );
};

export default CancelConfirmation;
