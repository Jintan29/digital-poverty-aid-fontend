import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { PageNotFound } from "../pages/PageNotFound";
import { useSelector } from "react-redux";
import AdminLayoutJ from "../components/AdminLayout/AdminLayoutJ/";

const AdminLayout = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [admin, setAdmin] = useState(false);
  const token = localStorage.getItem("token");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (token && (user.role === "admin" || user.role === "superAdmin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return admin ? (
    <>
      <AdminNav toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* <AdminLayoutJ/> */}
      <div className="bg-gray-100 min-h-screen p-4">
        <Outlet />
      </div>
    </>
  ) : (
    <PageNotFound />
  );
};

export default AdminLayout;
