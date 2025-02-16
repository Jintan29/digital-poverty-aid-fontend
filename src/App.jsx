import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import { About } from "./pages/About";
import { Form } from "./pages/Form";
import Register from "./pages/Authentication/Register";
import { Login } from "./pages/Authentication/Login";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/userSlice";
import { Map } from "./pages/Map";
import { PageNotFound } from "./pages/PageNotFound";
import { AdminRoute } from "./route/AdminRoute";
import HomepageAdmin from "./pages/Admin/HomepageAdmin";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import MemberHousehold from "./pages/Admin/Findmember/MemberHousehold";
import ManageUser from "./pages/Admin/ManageUser/ManageUser";
import ApproveUser from "./pages/Admin/ManageUser/ApproveUser";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import TrackMember from "./pages/Admin/Tracking/TrackMember";
import TrackHousehold from "./pages/Admin/Tracking/TrackHousehold";
import TrackingMemberId from "./pages/Admin/Tracking/TrackingMemberId";
import MixedChart from "./pages/MixedChart";
import Householdtracking from "./pages/Admin/Tracking/Householdtracking";
import Capital from "./pages/Overviewcapital/Capital";
import GisHousehold from "./pages/Admin/GISHouseHold/GisHousehold";
import AddApiToken from "./pages/AddApiToken";
import LineRegister from "./pages/Line/LineRegister";
import LineLogin from "./pages/Line/LineLogin";
import FindAssistance from "./pages/Admin/FindAssistance/FindAssistance"
import FormAddress from "./pages/FormAddress";
import HelpLog from "./pages/Admin/HelpLog/HelpLog";
import Usagestatistics from "./pages/Admin/UsageStatistics/Usagestatistics";









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
        config.api_path + "/auth/current-user",
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
            <Route path="testt" element={<MixedChart />} />
            
            


            {/* Auth */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-pass" element={<ForgotPassword />} />
            <Route
              path="reset-password/:id/:token"
              element={<ResetPassword />}
            />

            <Route path="reset-password/:id/:token" element={<ResetPassword />} />

            <Route path="map" element={<Map />} />
            <Route path="testAddsress" element={<FormAddress />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* สำหรับ LINE ไม่ต้องการ Navbar   */}
          <Route path="/line" element={<LineRegister />} />
          <Route path="/line-login" element={<LineLogin />} />
          


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
              path="find-members"
              element={
                <AdminRoute>
                  <MemberHousehold />
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
              path="track-member"
              element={
                <AdminRoute>
                  <TrackMember />
                </AdminRoute>
              }
            />

              {/* ข้อมูลรายบุคคล */}
            <Route
              path="track-member/:id"
              element={
                <AdminRoute>
                  <TrackingMemberId />
                </AdminRoute>
              }

            />
            <Route
              path="track-household"
              element={
                <AdminRoute>
                  <TrackHousehold />
                </AdminRoute>
              }
            />

            <Route
              path="track-household/:id"
              element={
                <AdminRoute>
                  <Householdtracking />
                </AdminRoute>
              }
            />

            {/* ข้อมูล5ทุน */}
            <Route
              path="capital"
              element={
                <AdminRoute>
                  <Capital />
                </AdminRoute>
              }
            />

            {/* GIS map */}
            <Route
              path="gis-household"
              element={
                <AdminRoute>
                  <GisHousehold />
                </AdminRoute>
              }
            />

            {/* fetch API DSS */}
            <Route path="add-ApiToken"
              element={
                <AdminRoute>
                  <AddApiToken />
                </AdminRoute>}
            />

            {/* นำออกข้อมูล Excel */}
                
            <Route path="helplog"
              element={
                <AdminRoute>
                  <HelpLog />
                </AdminRoute>}
            />

            <Route path="FindAssistance"
              element={
                <AdminRoute>
                  <FindAssistance />
                </AdminRoute>}
            />
            <Route path="usagestatistics"
              element={
                <AdminRoute>
                  <Usagestatistics />
                </AdminRoute>}
            />
            
            <Route path="*" element={<PageNotFound />} />

          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
