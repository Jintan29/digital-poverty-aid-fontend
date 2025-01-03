import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

import { About } from "./pages/About";
import { Form } from "./pages/Form";
import Register from "./pages/Authentication/Register";
import { Login } from "./pages/Authentication/Login";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/userSlice";
import { Map } from "./pages/Map"; // ใช้ default import
import { PageNotFound } from "./pages/PageNotFound";
import { TestAPI } from "./pages/TestAPI";
import { AdminRoute } from "./route/AdminRoute";
import HomepageAdmin from "./pages/Admin/HomepageAdmin";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import JJ1 from "./pages/Admin/JJ1";
import Household from "./pages/Houshold";
import ManageUser from "./pages/Admin/ManageUser/ManageUser";
import ApproveUser from "./pages/Admin/ManageUser/ApproveUser";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";


function App() {
  const idToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (idToken) {
      handleCurrentUser(idToken);
    }
  }, [idToken]);

  const handleCurrentUser = async (idToken) => {
    try {
      const response = await axios.get(
        config.api_path + "/user/currrentUser",
        config.headers()
      );
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
      if (error.response.data.message === "Token expired") {
        Swal.fire({
          title: "หมดอายุการใช้งาน",
          text: "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "เข้าสู่ระบบ",
          confirmButtonColor: "#3085d6",
        }).then((res) => {
          if (res.isConfirmed) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
      } else {
        dispatch(logout());
        Swal.fire({
          icon: "error",
          text: error.response?.data?.message || "เกิดปัญหาบางอย่าง",
          title: "error",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <>
      <div className="App">
        <Routes>
          {/* Layout for user */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Map />} />
            <Route path="about" element={<About />} />
            <Route path="form" element={<Form />} />
            
            {/* Auth */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-pass" element={<ForgotPassword />} />
            <Route path="reset-password/:id/:token" element={<ResetPassword />} />
            

            <Route path="map" element={<Map />} />
            <Route path="test" element={<TestAPI />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/*Layout for Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <AdminRoute>
                  <HomepageAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="find-household"
              element={
                <AdminRoute>
                  <Household />
                </AdminRoute>
              }
            />

            <Route
              path="manage-user"
              element={
                <AdminRoute>
                  <ManageUser />
                </AdminRoute>
              }
            />

            <Route
              path="approve-user"
              element={
                <AdminRoute>
                  <ApproveUser />
                </AdminRoute>
              }
            />

            <Route
              path="jj"
              element={
                <AdminRoute>
                  <JJ1 />
                </AdminRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
            {/* เพิ่มหน้าอื่น */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
