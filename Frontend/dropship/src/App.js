import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import FileUpload from "./components/FileUpload"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useState,useEffect } from "react";
function App() {
  document.body.style = 'background: lightblue;';

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
    onLoad1();

  }, []);
  async function onLoad1(st) {
    console.log(st)
    try {
      await  fetch('http://localhost:5000/api/uauth/', {
        method: 'GET',
      }).then(response => response.json())
      .then(data=>{
        if(data){
          console.log(data)

          userHasAuthenticated(st);
        }
        else{
          console.log(data)
          userHasAuthenticated(st);
        }
      }
      
      )
      .catch(error => console.log(error))
      
    } catch (e) {
      alert(e);
    }
  }
  async function onLoad(st) {
    console.log(st)
    userHasAuthenticated(st);


  }
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLoad={onLoad} />} >
          </Route>
          {/* <Route path="/upload" element={ <FileUpload ></FileUpload>}>
          </Route>     
          <Route path="/dashboard" element={<Listing/>}>
          </Route> */}
          <Route path="/home" element={<Home appProps={isAuthenticated} key={isAuthenticated}/>} >
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
