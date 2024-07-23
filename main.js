// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDzK5vAPCGBe-eAyC-DDJrdSm1aMMVZh70",
authDomain: "content-28013.firebaseapp.com",
projectId: "content-28013",
storageBucket: "content-28013.appspot.com",
messagingSenderId: "519137190518",
appId: "1:519137190518:web:844e1ec75884c3d7f23557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user)
        //window.location.href = "../Test/location.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    
})


