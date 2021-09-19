import logo from './logo.svg';
import './App.css';
import {  useState,useEffect } from 'react';

import {fb} from './firebase'

import { collection, onSnapshot } from 'firebase/firestore';
import {  Route, Switch } from 'react-router-dom';
import Collection from './Collection';
import Home from './Home';
import { useDispatch } from 'react-redux';
import { setAlbum } from './action/action';
const db=fb();
function App() {
  const dispatch=useDispatch();
 // const [albums, setAlbums] = useState([ ])

  useEffect(() => {
   const a= onSnapshot(collection(db,'collection'),(snapshot)=>{
     
       //setAlbums(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
       //console.log("val",)
       const data=snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
         dispatch(setAlbum(data))
     })
    
   return a;
  }, [])

  return (
    <div className="App">
   
     <Switch>
        <Route exact path="/" render={()=><Home   />} />
      
        
        <Route path='/:album' component={Collection}/>
      
     </Switch>
    </div>
  );
}

export default App;
