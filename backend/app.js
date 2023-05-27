import express from 'express'
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import { firebaseApp, firebaseConfig } from './firebase.js';

const app = express()
const db = getFirestore(firebaseApp);
const port = 3000

app.get('/', async (req, res) => {
  // try {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1815
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})