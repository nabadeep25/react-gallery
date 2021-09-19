

import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'


 
const firebaseConfig = {

  apiKey: `${process.env.REACT_APP_FB}`,

  authDomain: `${process.env.REACT_APP_PROJECTID}.firebaseapp.com`,

  projectId: `${process.env.REACT_APP_PROJECTID}`,

  storageBucket: `${process.env.REACT_APP_PROJECTID}.appspot.com`,

  messagingSenderId: "96839655277",

  appId: "1:96839655277:web:1c5e7c38124a013f140464"

};




export const app = initializeApp(firebaseConfig);
export const fb=getFirestore;
export const fbstorage=getStorage;
