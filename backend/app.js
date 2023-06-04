import express from 'express'
import cors from 'cors'
import { collection, doc, getDoc, addDoc, getFirestore } from "firebase/firestore"; 
import { firebaseApp, firebaseConfig } from './firebase.js';
import bodyParser from 'body-parser';

const app = express()
const db = getFirestore(firebaseApp);
const port = 3000

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.status(201).send("ur mom");
})
app.use(cors())

app.get('/user/:id', async (req, res) => {
  const docRef = doc(db, "users", req.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    res.status(200).send(JSON.stringify(docSnap.data()));
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    res.status(400).send("No such page");
  }
})

// Executes when we get a get request to / url
app.post('/create_user', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const docRef = await addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      email: email
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // console.error("Error adding document: ", e);
    res.status(400).send("Bad Request");
  }
  res.status(201).send("TEST");
})

app.post('/create_ride', async (req, res) => {
  // fetch
  try {
    const testReference = doc(db, "locations", "test");
    // const userReference = doc(db, "user")
    const docRef = await addDoc(collection(db, "rides"), {
      rideId: 1,  // May delete?
      from: "test",  // reference to location
      to: testReference,
      driver: "test",
      passengers: "test", // list of references
      leaveTime: 1,
      capacity: 1
    });
    console.log("Ride written with ID: ", docRef.id);
    console.log("req ", req.title)
    res.send(JSON.stringify({status:"success"}));
  } catch (e) {
    console.error("Error adding document: ", e);
    res.send({"status": "error"});
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})