import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    deleteDoc,
    updateDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE,
    authDomain: "mainglueckskind-a4d01.firebaseapp.com",
    projectId: "mainglueckskind-a4d01",
    storageBucket: "mainglueckskind-a4d01.appspot.com",
    messagingSenderId: "736888938250",
    appId: "1:736888938250:web:2b8c5a0a38220106d264f3",
    measurementId: "G-47QJ8EXBB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

export const fetchFirestoreData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export const saveConfirmationToken = async (email, token) => {
    try {
        const collectionRef = collection(
            db,
            JSON.parse(process.env.NEXT_DEV) ? "dev_newsletter_tokens" : "live_newsletter_tokens"
        );
        const docData = {
            email: email,
            token: token,
            createdAt: new Date(), // Store the current date to handle token expiration if needed
        };
        await addDoc(collectionRef, docData);
        console.log(`Confirmation token saved for email: ${email}`);
    } catch (error) {
        console.error("Error saving confirmation token:", error);
        throw new Error("Failed to save confirmation token");
    }
};

export const verifyTokenAndGetEmail = async (token) => {
    try {
        console.log("Verifying token:", token);
        const collectionRef = collection(
            db,
            JSON.parse(process.env.NEXT_DEV) ? "dev_newsletter_tokens" : "live_newsletter_tokens"
        );
        const q = query(collectionRef, where("token", "==", token));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const email = doc.data().email;
            await deleteDoc(doc.ref); // Remove token after verification
            console.log("Token verified, email retrieved:", email);
            return email;
        } else {
            console.error("Invalid or expired token");
            return null;
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Failed to verify token");
    }
};

export const updateSubscriptionStatus = async (email) => {
    try {
        const collectionRef = collection(
            db,
            JSON.parse(process.env.NEXT_DEV) ? "dev_newsletter_subscriptions" : "live_newsletter_subscriptions"
        );
        const q = query(collectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, { status: "subscribed" });
            console.log(`Subscription status updated for email: ${email}`);
        } else {
            await addDoc(collectionRef, { email: email, status: "subscribed" });
            console.log(`Subscription status added for new email: ${email}`);
        }
    } catch (error) {
        console.error("Error updating subscription status:", error);
        throw new Error("Failed to update subscription status");
    }
};
