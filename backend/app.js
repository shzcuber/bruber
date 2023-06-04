import express from 'express'
import cors from 'cors'
import { collection, doc, addDoc, getFirestore } from "firebase/firestore"; 
import { firebaseApp, firebaseConfig } from './firebase.js';

const app = express()
const db = getFirestore(firebaseApp);
const port = 3000
app.use(express.json())

app.use(cors())

// Executes when we get a get request to / url
app.get('/', async (req, res) => {
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
  res.send('Hello World!')
})

app.post('/create_ride', async (req, res) => {
  // fetch
  try {
    // console.log("res ", res.json())
    console.log(req.body)
    const driverReference = doc(db, "users", req.body.driver);
    const fromReference = doc(db, "locations", req.body.from);
    const toReference = doc(db, "locations", req.body.to);
    
    const docRef = await addDoc(collection(db, "rides"), {
      rideId: 1,  // May delete?
      from: fromReference,  // reference to location
      to: toReference,
      driver: driverReference,
      passengers: [],  // list of references
      leaveTime: req.body.datetime,
      capacity: req.body.capacity
    });
    console.log("Ride written with ID: ", docRef.id);
    res.send(JSON.stringify({"status":"success"}));
  } catch (e) {
    console.error("Error adding document: ", e);
    res.send({"status": "error"});
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})