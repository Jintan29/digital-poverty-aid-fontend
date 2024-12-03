import { useState } from "react";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import "./App.css";
import { Home } from "./pages/Home";

import NewNav from "./components/NewNav";
import { About } from "./pages/About";
import { Form } from "./pages/Form";
import  Household  from "./pages/Houshold"


// import { NewNav } from "./components/NewNav";


function App() {
  

  return (
    <>
      {/* ส่วนนี้จะแสดงผลทุกหน้า */}
      <NewNav />

      <BrowserRouter>
      <div className="App">
        {/* ดึงหน้า Page มาใช้งาน */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/household' element={<Household/>}/>
        </Routes>

      </div>
      
      </BrowserRouter>


    </>
  );
}

export default App;
