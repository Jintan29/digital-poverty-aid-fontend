import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

import { About } from "./pages/About";
import { Form } from "./pages/Form";


// import { NewNav } from "./components/NewNav";


function App() {
  const idToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate =  useNavigate()
  useEffect(() => {
    if (idToken) {
      handleCurrentUser(idToken);
    }
  }, [idToken]);


  const handleCurrentUser = async (idToken) => {
    try {
       const response = await axios.get(config.api_path + "/user/currrentUser", config.headers())
       console.log(response);
       
       dispatch(
        login({
          name: response.data.username,
          role: response.data.role,
          status: response.data.status,
          token: idToken,
        })
      );
    } catch (error) {
      console.log(error);
      if(error.response.data.message === 'Token expired'){
        Swal.fire({
          title:'หมดอายุการใช้งาน',
          text:'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
          icon:'error',
          showConfirmButton:true,
          confirmButtonText:'เข้าสู่ระบบ',
          confirmButtonColor: '#3085d6'          
        }).then((res)=>{
          if(res.isConfirmed){
            localStorage.removeItem('token')
            navigate('/login')
          }
        })
      }else{
        dispatch(logout())
        Swal.fire({
          icon: "error",
          text: error.response?.data?.message || 'เกิดปัญหาบางอย่าง',
          title: "error",
          showConfirmButton:true
        });
      }
      
    }
  };

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
        </Routes>

        </div>

    </>
  );
}

export default App;
