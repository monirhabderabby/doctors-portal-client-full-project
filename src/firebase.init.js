import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPvZtAU4AsQGOQ0GaaiXKiSwSa11XT6Ho",
    authDomain: "doctors-portal-full-proj-b751b.firebaseapp.com",
    projectId: "doctors-portal-full-proj-b751b",
    storageBucket: "doctors-portal-full-proj-b751b.appspot.com",
    messagingSenderId: "848584525022",
    appId: "1:848584525022:web:b1274d37e09c459d7b6e4f",
};
// console.log(process.env);

// const firebaseConfig = {
//     apikey: process.env.REACT_APP_api_key,
//     authDoamin: process.env.REACT_APP_auth_domain,
//     projectId: process.env.REACT_APP_project_id,
//     storageBucket: process.env.REACT_APP_storage_bucket,
//     messagingSenderId: process.env.REACT_APP_message_sender_id,
//     appId: process.env.REACT_APP_app_id,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
