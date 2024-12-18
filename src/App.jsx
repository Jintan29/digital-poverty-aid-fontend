import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

import NewNav from "./components/NewNav";
import { About } from "./pages/About";
import { Form } from "./pages/Form";
import Register from "./pages/Authentication/Register";
import { Login } from "./pages/Authentication/Login";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";




function App() {
  const idToken = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(()=>{
    if(idToken){
      handleCurrentUser(idToken)
    }
  },[idToken])


  const handleCurrentUser = async(idToken)=>{
    try {
      await axios.get(config.api_path+'/user/currrentUser',config.headers())
      .then(res=>{
        console.log(res);
        dispatch(
          login({
            name: res.data.username,
            role: res.data.role,
            status: res.data.status,
            token:idToken
          })
        )
      }).catch(err=>{throw err})
    }catch(e){
      Swal.fire({
        icon:'error',
        text:e,
        title:'error'
      })
    }
  }
  
  return (
    <>
      <BrowserRouter>
        <NewNav />
        <div className="App">
          {/* ดึงหน้า Page มาใช้งาน */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form" element={<Form />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
