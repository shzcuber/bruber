import express from "express";
import { collection, doc, addDoc, getFirestore } from "firebase/firestore";
import { firebaseApp, firebaseConfig } from "./firebase.js";

const app = express();
const db = getFirestore(firebaseApp);
const port = 3000;

// Executes when we get a get request to / url
app.get("/", async (req, res) => {
  // try {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1816
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  res.send("Hello World!");
});

app.post("/create_ride", async (req, res) => {
  // fetch
  try {
    const testReference = doc(db, "locations", "test");
    const docRef = await addDoc(collection(db, "rides"), {
      rideId: 1, // May delete?
      from: "test", // reference to location
      to: testReference,
      driver: "test",
      passengers: "test", // list of references
      leaveTime: 1,
      capacity: 1,
    });
    console.log("Ride written with ID: ", docRef.id);
    res.send(JSON.stringify({ status: "success" }));
  } catch (e) {
    console.error("Error adding document: ", e);
    res.send({ status: "error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
