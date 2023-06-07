// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useEffect, useState } from "react";
import {signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./Login";
import Onboarding from "./Onboarding";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './Home'
import Rides from './Rides'
import Driver from "./Driver";
import CreateRide from './CreateRide';
import Profile from './Profile';
import About from './About';
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
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);


    const refreshUserData = (uid) => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
      
          fetch(`{process.env.REACT_APP_BACKEND}/user/${uid}`, requestOptions)
            .then((res) => res.json()) // Convert json to js object
            .then((data) => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setPhoneNumber(data.phoneNumber);
            })
            .catch((error) => console.log("Error: " + error));
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                refreshUserData(user.uid)
                console.log(user)
            } else {
                setAuthUser(null);
            }
        });
    }, [])


    return (
        <div>
            <h1>{authUser && authUser.emailVerified ? (
                firstName && lastName && phoneNumber ? (
                <Router>
                <Routes>
                    <Route exact path="/" element={<Home authUser={authUser} />}/>
                    <Route exact path="/login" element={<LoginPage authUser={authUser} />}/>
                    <Route exact path="/onboarding" element={<Onboarding authUser={authUser} />}/>
                    <Route exact path="/navbar" element={<Navbar authUser={authUser}/>}/>
                    <Route exact path="/rides" element={<Rides authUser={authUser}/>}/>
                    <Route path="/driver" element={<Driver authUser={authUser}/>} />
                    <Route exact path="/create_ride" element={<CreateRide authUser={authUser}/>}/>
                    <Route exact path="/profile" element={<Profile authUser={authUser}/>}/>
                    <Route exact path="/upcoming_rides" element={<UpcomingRides authUser={authUser}/>}/>
                    <Route exact path="/about" element={<About authUser={authUser}/>}/>
                </Routes>
                </Router>
                ) : (
                    <Router>
                        <Onboarding authUser={authUser} />
                    </Router>
                )
            ) : (
            <Router>
            <Routes>
                <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
                <Route exact path="/about" element={<About authUser={authUser}/>}/>
                <Route path="*" element={<LoginPage authUser={authUser} />}/>
            </Routes>
            </Router>
            )}</h1>
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