import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";


import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNav = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };

  return (
    <div>
      
      <Disclosure as="nav" className="bg-white fixed top-0 z-20 w-full shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20  items-center justify-between">
          
          {/* ซ้าย: ปุ่มเปิด/ปิด Sidebar */}
          <div className="flex items-center  ">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-slate-500 p-2 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              <Icon icon="heroicons-outline:menu-alt-2" className="w-6 h-6" />
            </button>
          </div>

          {/* ขวา: ข้อมูลผู้ใช้ */}
          <div className="flex items-center space-x-4">
            {user && Object.keys(user).length > 0 ? (
              <Menu as="div" className="relative">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">
                    {user?.role && user?.status
                      ? `${user.role} : ${user.status}`
                      : ""}
                  </span>

                  <MenuButton className="flex items-center justify-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                    <div className="flex items-center justify-center bg-rose-500 rounded-full w-10 h-10">
                      <Icon
                        icon="material-symbols:manage-accounts-rounded"
                        className="text-white"
                        width="28"
                        height="28"
                      />
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Dashboard
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block w-full text-left px-4 py-2 text-sm text-red-500"
                        )}
                      >
                        ออกจากระบบ
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                type="button"
                className="mt-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <Link to="/login">เข้าสู่ระบบ</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
    </div>
  );
};

export default AdminNav;
