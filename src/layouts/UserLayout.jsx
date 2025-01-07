import React from "react";
import UserNav from "../components/UserNav";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <div className="min-h-screen">
        <UserNav />
        <main className="pt-20">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
