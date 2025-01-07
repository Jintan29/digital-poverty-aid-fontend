import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageNotFound } from "../pages/PageNotFound";

export const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // ตรวจสอบทั้ง token และ role
    const idToken = localStorage.getItem("token");
    if (idToken && (user.role === "admin" || user.role === "superAdmin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  return admin ? children : <PageNotFound />;
};
