// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useEffect, useState } from "react";
import {signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./Login";
import { BrowserRouter as Router, Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import Home from './Home'
import Rides from './Rides'
import Driver from "./Driver";
import CreateRide from './CreateRide';
import Profile from './Profile';
import Navbar from "../components/Navbar"
import { list } from "@chakra-ui/react";
import UpcomingRides from "./UpcomingRides";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBXKNbip86Utdj3oqoMo7ZtIMjjQffbUI",
  authDomain: "bruber-b655f.firebaseapp.com",
  projectId: "bruber-b655f",
  storageBucket: "bruber-b655f.appspot.com",
  messagingSenderId: "954731036862",
  appId: "1:954731036862:web:2260aa785228d5e4d1deef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    onAuthStateChanged(auth, user => {
        if(user){
            setAuthUser(user);
            console.log(user)
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({'uid': user.uid, 'firstName': user.displayName, 'lastName': user.displayName, 'email': user.email, 'phoneNumber': user.phoneNumber})
            };

            fetch("http://localhost:3000/create_user", requestOptions)
                .then(data => {
                })
                .catch(error => {
                    console.log("Error: " + error);
                })
        } else {
            setAuthUser(null);
        }
            })

    return (
        <div>
            <h1>{authUser ? (    <Router>
      <Routes>
        <Route exact path="/" element={<Home authUser={authUser} />}/>
        <Route exact path="/login" element={<LoginPage authUser={authUser} />}/>
        <Route exact path="/navbar" element={<Navbar authUser={authUser}/>}/>
        <Route exact path="/rides" element={<Rides authUser={authUser}/>}/>
        <Route path="/driver" element={<Driver authUser={authUser}/>} />
        <Route exact path="/create_ride" element={<CreateRide authUser={authUser}/>}/>
        <Route exact path="/profile" element={<Profile authUser={authUser}/>}/>
        <Route exact path="/upcoming_rides" element={<UpcomingRides authUser={authUser}/>}/>
      </Routes>
    </Router>) : <LoginPage/>}</h1>
        </div>
    )
}

export const userSignOut = () => {
    signOut(auth).then(
        () => {
            console.log("signed out!")
        }
    ).catch(
        (error) => {
            console.log("error" + error)
        }
    )
}

export default AuthDetails;