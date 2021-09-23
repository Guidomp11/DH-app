import app from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCawyMkynjgm1PmZ1wL6E5hKpLTU18b9KQ",
  authDomain: "test-78484.firebaseapp.com",
  projectId: "test-78484",
  storageBucket: "test-78484.appspot.com",
  messagingSenderId: "834071584068",
  appId: "1:834071584068:web:afadf55cc8a18d56028b11"
};

if(!app.apps.length){
  app.initializeApp(firebaseConfig);
}

export const auth = app.auth();

export const storage = app.storage();

export const db = app.firestore();
