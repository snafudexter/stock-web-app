import { BrowserRouter, Route } from 'react-router-dom';
import Router from './Router'
import * as firebase from 'firebase/app'

import './assets/css/style.css'

var firebaseConfig = {
  apiKey: "AIzaSyDVJNM1uFLGrWQpuFM7zIpdkxuVasPOoB8",
  authDomain: "treee-6e194.firebaseapp.com",
  databaseURL: "https://treee-6e194.firebaseio.com",
  projectId: "treee-6e194",
  storageBucket: "treee-6e194.appspot.com",
  messagingSenderId: "625891354541",
  appId: "1:625891354541:web:6cf62146a42f3edf8d6324"
};

function App() {

  if(!firebase.default.apps.length){
    firebase.default.initializeApp(firebaseConfig);
  }
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
