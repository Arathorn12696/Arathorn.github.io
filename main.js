import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, FacebookAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzK5vAPCGBe-eAyC-DDJrdSm1aMMVZh70",
    authDomain: "content-28013.firebaseapp.com",
    projectId: "content-28013",
    storageBucket: "content-28013.appspot.com",
    messagingSenderId: "519137190518",
    appId: "1:519137190518:web:e8a8e4db798146b4f23557"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const googleLogin = document.getElementById("google-login-btn");
    if (googleLogin) {
        googleLogin.addEventListener("click", () => {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    const user = result.user;
                    sessionStorage.setItem('userDisplayName', user.displayName || 'No Name');
                    sessionStorage.setItem('userEmail', user.email || 'No Email');
                    sessionStorage.setItem('userPhotoURL', user.photoURL || 'default-profile.png');
                    window.location.href = "location.html";
                })
                .catch((error) => {
                    console.error('Login Error:', error);
                });
        });
    }
    const facebookLogin = document.getElementById("facebook-login-btn");
    if (facebookLogin){
    facebookLogin.addEventListener("click", function(event){
    //event.preventDefault();
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        sessionStorage.setItem('userDisplayName', user.displayName || 'No Name');
        sessionStorage.setItem('userEmail', user.email || 'No Email');
        sessionStorage.setItem('userPhotoURL', user.photoURL || 'default-profile.png');
        console.log(sessionStorage.getItem('userPhotoURL'));
        window.location.href = "location.html";
    })
    
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        alert(errorMessage)
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
    });
        })
    }



    onAuthStateChanged(auth, (user) => {
        if (user) {
            const usernameElem = document.getElementById('username');
            const emailElem = document.getElementById('email');
            const userPhotoElem = document.getElementById('userPhoto');
            const signOutBtn = document.getElementById('sign-out-btn')

            if (usernameElem && emailElem && userPhotoElem && signOutBtn) {
                usernameElem.textContent = `Hello, ${user.displayName || 'No Name'}`;
                emailElem.textContent = `Email: ${user.email || 'No Email'}`;
                userPhotoElem.src = user.photoURL || 'default-profile.png';
                document.getElementById('userInfo').style.display = 'block';
                document.getElementById('getLocation').style.display = 'block';
                signOutBtn.style.display = 'block';

                signOutBtn.addEventListener('click', () => {
                    signOut(auth).then(() => {
                        sessionStorage.clear();
                        window.location.href = "index.html";
                    }).catch((error) => {
                        console.error('Sign Out Error:', error);
                    });
                });
                
            } else {
                console.error('User info elements not found.');
            }
        } else {
            document.getElementById('userInfo').style.display = 'none';
            document.getElementById('getLocation').style.display = 'none';
        }
    });





//Geolocation
const getLocationBtn = document.getElementById('getLocation');
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
    }
});

function successCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    document.getElementById('address').textContent = `Latitude: ${lat}, Longitude: ${lng}`;
    initMap(lat, lng);
}

function errorCallback(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function initMap(lat, lng) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 15
    });

    new google.maps.Marker({
        position: { lat, lng },
        map: map
    });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById('address').textContent = results[0].formatted_address;
            } else {
                document.getElementById('address').textContent = 'No results found';
            }
        } else {
            document.getElementById('address').textContent = `Geocoder failed due to: ${status}`;
        }
    });
}
